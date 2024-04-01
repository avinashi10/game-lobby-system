// LOCAL IMPORTS
import lobbies from '../dataStore.js';
import Lobby from '../Lobby.js';
import { io } from '../index.js';

// CONTROLLER FUNCTION
export const leaveLobby = (req, res) => {
  try {
    const { lobbyName, playerId, playerName, socketId } = req.body;
    const lobbyId = req.params.id;

    const socket = io.of("/").sockets.get(socketId);

    if (socket) {
      socket.leave(lobbyId);
      console.log(`SERVER LEAVE 1: Socket ${socket.id} left lobby ${lobbyId}`);

      socket.to(lobbyId).emit('playerLeftLobby', {
        message: `${playerName} has left the '${lobbies[lobbyId].name}' lobby.`,
      });

      lobbies[lobbyId].removePlayer(playerId);

      if (lobbies[lobbyId].players.length === 0) {
        delete lobbies[lobbyId];

        return res.status(200).json({ success: true, message: `You've left the '${lobbyName}' lobby and there are no players left. The lobby will be deleted.` });
      } else {
        io.to(lobbyId).emit('lobbyUpdated', {
          message: `${playerName} has left the '${lobbyName}' lobby.`,
          players: lobbies[lobbyId].players
        });

        console.log(`SERVER LEAVE 2: Player ${playerName} removed from lobby '${lobbyName}'`);

        res.status(200).json({ success: true, message: `You've left the lobby '${lobbyName}'.`, lobby: lobbies[lobbyId] });
      }
    } else {
      console.log(`Socket not found for player ${playerName} with socket ID ${socketId}`);
      res.status(404).json({ error: 'Socket not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while leaving the lobby' });
  }
};
