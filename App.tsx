import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import io from 'socket.io-client';
import UsernameScreen from './components/UsernameScreen';
import ChatHeader from './components/ChatHeader';
import MessageInput from './components/MessageInput';
import MessageList from './components/MessageList';
import DARK_COLORS from './theme/colors';

// IMPORTANT: Replace this IP with your laptop's local network IP address
const SOCKET_URL = 'http://192.168.1.6:3001';

export default function App() {
  const [username, setUsername] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const socketRef = useRef<any>(null);
  const flatListRef = useRef<any>(null);

  useEffect(() => {
    // Clean up socket on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const handleSend = () => {
    if (!messageInput.trim()) {
      setError('Message cannot be empty.');
      return;
    }
    setError('');
    setSendLoading(true);
    socketRef.current?.emit('send_message', messageInput, (res: any) => {
      setSendLoading(false);
      if (res?.error) {
        setError(res.error);
      } else {
        setMessageInput('');
      }
    });
  };

  const handleJoin = () => {
    if (!usernameInput.trim()) {
      setError('Username cannot be empty.');
      return;
    }
    setError('');
    setLoading(true);
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      timeout: 5000,
      reconnection: false,
    });
    let didConnect = false;
    socketRef.current = socket;
    socket.on('connect_error', () => {
      setLoading(false);
      setError(
        'Unable to connect to chat server. Please check your network or server.',
      );
      setUsername('');
      socket.disconnect();
      socketRef.current = null;
    });
    socket.on('connect', () => {
      didConnect = true;
      setUsername(usernameInput.trim());
      setLoading(false);
      socket.emit('join', usernameInput.trim(), (res: any) => {
        if (res?.error) {
          setError(res.error);
          setUsername('');
        }
      });
    });
    socket.on('message_history', (msgs: any[]) => {
      setMessages(msgs);
    });
    socket.on('new_message', (msg: any) => {
      setMessages(prev => [...prev, msg].slice(-20));
    });
    socket.on('disconnect', () => {
      if (!didConnect) return;
    });
  };

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!username) {
    return (
      <SafeAreaView style={styles.container}>
        <UsernameScreen
          usernameInput={usernameInput}
          setUsernameInput={setUsernameInput}
          handleJoin={handleJoin}
          loading={loading}
          error={error}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ChatHeader username={username} />
        <MessageList messages={messages} username={username} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <MessageInput
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSend={handleSend}
          loading={loading}
          sendLoading={sendLoading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DARK_COLORS.background },
  flex: { flex: 1 },
  error: {
    color: DARK_COLORS.error,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
