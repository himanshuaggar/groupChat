import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DARK_COLORS from '../theme/colors';

export default function ChatHeader({ username }: { username: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Group Chat</Text>
      <Text style={styles.subtitle}>
        Logged in as: <Text style={styles.usernameHighlight}>{username}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: DARK_COLORS.border,
    backgroundColor: DARK_COLORS.card,
    marginBottom: 2,
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
    marginBottom: 2,
    textAlign: 'center',
  },
  usernameHighlight: {
    color: DARK_COLORS.accent,
    fontWeight: 'bold',
  },
  socketId: {
    fontSize: 10,
    color: DARK_COLORS.subtext,
    marginTop: 2,
    textAlign: 'center',
  },
});
