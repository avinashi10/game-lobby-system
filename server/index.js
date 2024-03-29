// LIBRARY IMPORTS
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// LOCAL IMPORTS
import router from './routes.js';

// CREATE EXPRESS SERVER INSTANCE
const app = express();

// CREATE HTTP SERVER
const server = http.createServer(app);

// INITIALIZE SOCKET.IO
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  }
});

// USE MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));

// USE ROUTER
app.use('', router);

io.on('connection', (socket) => {
  console.log('a user connected');
  // Setup WebSocket event listeners here
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
