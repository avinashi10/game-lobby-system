// LOCAL IMPORTS
import lobbies from '../dataStore.js';
import Lobby from '../Lobby.js';
import { io } from '../index.js';

// CONTROLLER FUNCTION
export const joinLobby = (req, res) => {
  try {
    const { playerId, playerName, socketId } = req.body;
    const lobbyId = req.params.id;

    const socket = io.of("/").sockets.get(socketId);

    if (socket) {
      socket.join(lobbyId);
      console.log(`SERVER JOIN 1: Socket ${socket.id} joined lobby ${lobbyId}`);

      socket.to(lobbyId).emit('playerJoinedLobby', {
        message: `${playerName} has joined the '${lobbies[lobbyId].name}' lobby.`,
      });

      lobbies[lobbyId].addPlayer(playerId, playerName);

      io.to(lobbyId).emit('lobbyUpdated', {
        message: `${playerName} has joined the '${lobbies[lobbyId].name}' lobby.`,
        players: lobbies[lobbyId].players
      });

      console.log(`SERVER JOIN 2: Player ${playerName} added to lobby '${lobbies[lobbyId].name}'`);

      res.json({ success: true, message: `${playerName} added to lobby '${lobbies[lobbyId].name}'.`, lobby: lobbies[lobbyId] });
    } else {
      console.log(`Socket not found for player ${playerName} with socket ID ${socketId}`);
      res.status(404).json({ error: 'Socket not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while joining the lobby' });
  }
};