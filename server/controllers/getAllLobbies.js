// LOCAL IMPORTS
import lobbies from '../dataStore.js';
import Lobby from '../Lobby.js';
import { io } from '../index.js';

// CONTROLLER FUNCTION
export const getAllLobbies = (req, res) => {
  try {
    res.status(200).json(lobbies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the lobbies' });
  }
};
