import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DARK_COLORS from '../theme/colors';

export default function UsernameScreen({
  usernameInput,
  setUsernameInput,
  handleJoin,
  loading,
  error,
}: {
  usernameInput: string;
  setUsernameInput: (v: string) => void;
  handleJoin: () => void;
  loading: boolean;
  error: string;
}) {
  return (
    <View style={styles.centered}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Group Chat</Text>
        <Text style={styles.subtitle}>Enter your username to join</Text>
        <TextInput
          style={styles.inputUsername}
          placeholder="Username"
          placeholderTextColor={DARK_COLORS.subtext}
          value={usernameInput}
          onChangeText={setUsernameInput}
          onSubmitEditing={handleJoin}
          autoFocus
          editable={!loading}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.joinButton}
          onPress={handleJoin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.joinButtonText}>Join Chat</Text>
          )}
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: DARK_COLORS.card,
    borderRadius: 18,
    padding: 28,
    shadowColor: DARK_COLORS.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: DARK_COLORS.text,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: DARK_COLORS.subtext,
    marginBottom: 18,
    textAlign: 'center',
  },
  inputUsername: {
    borderWidth: 1,
    borderColor: DARK_COLORS.inputBorder,
    backgroundColor: DARK_COLORS.inputBg,
    color: DARK_COLORS.text,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    width: '100%',
    fontSize: 17,
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: DARK_COLORS.accent,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 8,
    width: '100%',
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  error: {
    color: DARK_COLORS.error,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
