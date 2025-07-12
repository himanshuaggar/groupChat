
# Group Chat App (React Native + Node.js + Socket.IO)

A real-time group chat app built with React Native (frontend) and Node.js/Express/Socket.IO (backend).

---

## Features

- Real-time group chat with WebSocket (Socket.IO)
- Modern dark theme
- Last 20 messages are persisted in memory and shown to new users
- Responsive UI for Android/iOS

---

## Prerequisites

- Node.js (v18 or above)
- npm
- React Native CLI & environment ([React Native setup guide](https://reactnative.dev/docs/environment-setup))
- Android Studio or Xcode (for running on device/emulator)
- Both your phone and your laptop/server must be on the same Wi-Fi network for local development

---

## 1. Clone the repository

```sh
git clone https://github.com/himanshuaggar/groupChat.git
cd groupChat
```

---

## 2. Install dependencies

```sh
npm install
```

---

## 3. Configure the WebSocket Server IP

**IMPORTANT:**

- The React Native app must connect to your laptop's local IP address (not `localhost` or `127.0.0.1`) for WebSocket to work on a physical device.
- Find your laptop's IP address (e.g., `192.168.1.6`) using `ipconfig` (Windows) or `ifconfig` (Mac/Linux).
- Open `App.tsx` and set:

```js
const SOCKET_URL = 'http://<YOUR_LAPTOP_IP>:3001';
```

Example:

```js
const SOCKET_URL = 'http://192.168.1.6:3001';
```

---

## 4. Start the Backend Server

```sh
node server.js
```

- The server will run on port 3001 by default.
- You should see `Server listening on port 3001` in your terminal.

---

## 5. Start Metro Bundler (React Native)

```sh
npm start

```

---

## 6. Run the App on your Device/Emulator

### Android

```sh
npm run android

```

### iOS

```sh
npm run ios

```

---

## 7. Usage

- Enter a username to join the chat.
- Send and receive messages in real time.
- New users see the last 20 messages when they join.

---

## Troubleshooting

- **Cannot connect to chat server?**
  - Make sure your phone and laptop are on the same Wi-Fi network.
  - Double-check the IP address in `App.tsx` matches your laptop's IP.
  - Ensure your firewall allows incoming connections on port 3001.
  - Restart both the server and the app if you change the IP.
- **Metro not running?**
  - Run `npm start` or `yarn start` in the project root.

---
