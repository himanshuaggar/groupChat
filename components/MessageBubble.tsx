import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DARK_COLORS from '../theme/colors';

export default function MessageBubble({
  item,
  isMine,
}: {
  item: any;
  isMine: boolean;
}) {
  return (
    <View
      style={[
        styles.message,
        isMine ? styles.messageMine : styles.messageOther,
        isMine ? styles.bubbleRight : styles.bubbleLeft,
      ]}
    >
      <View style={styles.messageHeaderRow}>
        <Text style={styles.messageUser}>{item.username}</Text>
        <Text style={styles.messageMeta}>{item.time}</Text>
      </View>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    marginBottom: 16,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    maxWidth: '80%',
    minWidth: 60,
    alignSelf: 'flex-start',
    shadowColor: DARK_COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  messageMine: {
    backgroundColor: DARK_COLORS.messageMine,
    alignSelf: 'flex-end',
  },
  messageOther: {
    backgroundColor: DARK_COLORS.messageOther,
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
  },
  bubbleLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 18,
    borderTopRightRadius: 18,
  },
  messageHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageUser: {
    fontWeight: 'bold',
    color: DARK_COLORS.accent,
    fontSize: 13,
    marginRight: 8,
  },
  messageMeta: {
    fontSize: 11,
    color: DARK_COLORS.subtext,
    marginBottom: 0,
    fontWeight: '600',
  },
  messageText: {
    fontSize: 16,
    color: DARK_COLORS.text,
    lineHeight: 22,
  },
});
