// LOCAL IMPORTS
import lobbies from '../dataStore.js';
import Lobby from '../Lobby.js';
import { io } from '../index.js';

// CONTROLLER FUNCTION
export const leaveLobby = (req, res) => {
  try {
    const { playerId, playerName } = req.body;
    const lobbyId = req.params.id;

    lobbies[lobbyId].removePlayer(playerId);
    io.to(lobbyId).emit('lobbyUpdated', {
      message: `${playerName} has left the '${lobbies[lobbyId].name}' lobby.`,
      players: lobbies[lobbyId].players
    });

    res.json({ success: true, message: `${playerName} removed from lobby '${lobbies[lobbyId].name}'.`, lobby: lobbies[lobbyId] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while leaving the lobby' });
  }
};
