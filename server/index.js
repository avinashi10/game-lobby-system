// LIBRARY IMPORTS
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Game Lobby Backend Running');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // Setup your WebSocket event listeners here
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
