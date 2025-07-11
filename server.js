const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3001;

let messages = [];

io.on('connection', (socket) => {
  let username = null;

  console.log(`[SOCKET] New connection: ${socket.id}`);
  socket.emit('welcome', { socketId: socket.id });

  socket.on('join', (name, callback) => {
    console.log(`[SOCKET] ${socket.id} join attempt with username: '${name}'`);
    if (!name || typeof name !== 'string' || !name.trim()) {
      if (callback) callback({ error: 'Username cannot be empty.' });
      return;
    }
    username = name.trim();
    console.log(`[SOCKET] ${socket.id} joined as '${username}'`);
    socket.emit('message_history', messages);
    if (callback) callback({ success: true });
  });

  socket.on('send_message', (text, callback) => {
    console.log(`[SOCKET] ${socket.id} (${username}) send_message: '${text}'`);
    if (!username) {
      if (callback) callback({ error: 'You must join with a username first.' });
      return;
    }
    if (!text || typeof text !== 'string' || !text.trim()) {
      if (callback) callback({ error: 'Message cannot be empty.' });
      return;
    }
    const message = {
      username,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    messages.push(message);
    if (messages.length > 20) messages = messages.slice(-20);
    io.emit('new_message', message);
    if (callback) callback({ success: true });
    console.log(`[SOCKET] Broadcasted message from '${username}': '${text.trim()}'`);
  });

  socket.on('disconnect', () => {
    console.log(`[SOCKET] Disconnected: ${socket.id} (${username || 'no username'})`);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});