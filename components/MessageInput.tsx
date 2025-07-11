import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import DARK_COLORS from '../theme/colors';

export default function MessageInput({
  messageInput,
  setMessageInput,
  handleSend,
  loading,
  sendLoading,
}: {
  messageInput: string;
  setMessageInput: (v: string) => void;
  handleSend: () => void;
  loading: boolean;
  sendLoading: boolean;
}) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        placeholderTextColor={DARK_COLORS.subtext}
        value={messageInput}
        onChangeText={text => {
          setMessageInput(text);
        }}
        onSubmitEditing={handleSend}
        editable={!loading && !sendLoading}
        returnKeyType="send"
        blurOnSubmit={false}
        autoFocus={true}
        multiline={false}
        keyboardAppearance="dark"
        keyboardType="default"
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          (sendLoading || loading) && styles.sendButtonDisabled,
        ]}
        onPress={handleSend}
        disabled={loading || sendLoading}
        activeOpacity={0.8}
      >
        {sendLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.sendButtonText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: DARK_COLORS.inputBorder,
    backgroundColor: DARK_COLORS.inputBg,
    color: DARK_COLORS.text,
    borderRadius: 10,
    padding: 12,
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: DARK_COLORS.accent,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#7da7fa',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
