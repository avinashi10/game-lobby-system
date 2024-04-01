// LOCAL IMPORTS
import lobbies from '../dataStore.js';
import Lobby from '../Lobby.js';
import { io } from '../index.js';

// CONTROLLER FUNCTION
export const joinLobby = (req, res) => {
  try {
    const { lobbyName, playerId, playerName, socketId } = req.body;
    const lobbyId = req.params.id;

    const socket = io.of("/").sockets.get(socketId);

    if (socket) {
      socket.join(lobbyId);
      console.log(`SERVER JOIN 1: Socket ${socket.id} joined lobby ${lobbyName}`);

      lobbies[lobbyId].addPlayer(playerId, playerName);

      if (lobbies[lobbyId].players.length === 3) {
        delete lobbies[lobbyId];

        socket.to(lobbyId).emit('gameStarted', {
          message: `The game in the lobby ${lobbyName} is starting, and the lobby has been deleted`,
        });

        return res.status(200).json({ success: true, message: `You're the third player joining the ${lobbyName} lobby, which has started the game and will delete the lobby.` });
      }

      socket.to(lobbyId).emit('playerJoinedLobby', {
        message: `${playerName} has joined the '${lobbyName}' lobby.`,
      });

      io.to(lobbyId).emit('lobbyUpdated', {
        message: `${playerName} has joined the '${lobbyName}' lobby.`,
        players: lobbies[lobbyId].players
      });

      console.log(`SERVER JOIN 2: Player ${playerName} added to lobby '${lobbyName}'`);

      res.json({ success: true, message: `You've joined the lobby '${lobbyName}'.`, lobby: lobbies[lobbyId] });
    } else {
      console.log(`Socket not found for player ${playerName} with socket ID ${socketId}`);
      res.status(404).json({ error: 'Socket not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while joining the lobby' });
  }
};