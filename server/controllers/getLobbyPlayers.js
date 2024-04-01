// LOCAL IMPORTS
import lobbies from '../dataStore.js';

// CONTROLLER FUNCTION
export const getLobbyPlayers = (req, res) => {
  try {
    const lobbyId = req.params.id;
    const lobby = lobbies[lobbyId];
    if (!lobby) {
      return res.status(404).json({ error: 'Lobby not found' });
    }
    res.status(200).json({ players: lobby.players });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the lobby players' });
  }
};
