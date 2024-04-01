// LOCAL IMPORTS
import lobbies from '../dataStore.js';
import { io } from '../index.js';

// CONTROLLER FUNCTION
export const startGame = (req, res) => {
  try {
    const { lobbyName } = req.body;
    const lobbyId = req.params.id;

    if (lobbies[lobbyId]) {

      delete lobbies[lobbyId];

      io.to(lobbyId).emit('gameStarted', { message: `The game in the ${lobbyName} lobby started, and the lobby was deleted.` });

      res.status(200).json({ success: true, message: `You started a game in the ${lobbyName} lobby, and the lobby was deleted.` });

    } else {
      res.status(404).json({ error: 'Lobby not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while starting the game' });
  }
};
