// LIBRARY IMPORTS
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// LOCAL IMPORTS
import router from './routes.js';

// Convert URL to path for __dirname equivalence in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CREATE EXPRESS SERVER INSTANCE
const app = express();

// CREATE HTTP SERVER
const server = http.createServer(app);

// INITIALIZE SOCKET.IO
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

// USE MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

// USE ROUTER
app.use('', router);

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // Setup WebSocket event listeners here
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
