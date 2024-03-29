// LOCAL IMPORTS
import lobbies from './dataStore.js';
import Lobby from './Lobby.js';

// CONTROLLER FUNCTIONS
export const createLobby = (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Lobby name is required' });
    }
    const id = Date.now().toString();
    const newLobby = new Lobby(id, name);
    lobbies[id] = newLobby;
    res.status(201).json(newLobby);
  } catch (error) {
    // Internal Server Error for any unhandled issues
    res.status(500).json({ error: 'An error occurred while creating the lobby' });
  }
};

export const getAllLobbies = (req, res) => {
  try{
    res.status(201).json(lobbies);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while getting the lobbies' });
  }
};
