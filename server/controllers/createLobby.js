// LOCAL IMPORTS
import lobbies from '../dataStore.js';
import Lobby from '../Lobby.js';
import { io } from '../index.js';

// CONTROLLER FUNCTION
export const createLobby = (req, res) => {
  try {
    const { lobbyName } = req.body;
    if (!lobbyName) {
      return res.status(400).json({ error: 'Lobby name is required' });
    }
    const id = Date.now().toString();
    const newLobby = new Lobby(id, lobbyName);
    lobbies[id] = newLobby;
    io.emit('lobbyCreated', newLobby);
    res.status(201).json(newLobby);
  } catch (error) {
    // Internal Server Error for any unhandled issues
    res.status(500).json({ error: 'An error occurred while creating the lobby' });
  }
};