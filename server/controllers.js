// LOCAL IMPORTS
import lobbies from './dataStore.js';
import Lobby from './Lobby.js';
import { io } from './index.js';

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
    io.emit('lobbyCreated', newLobby);
    res.status(201).json(newLobby);
  } catch (error) {
    // Internal Server Error for any unhandled issues
    res.status(500).json({ error: 'An error occurred while creating the lobby' });
  }
};

export const getAllLobbies = (req, res) => {
  try {
    res.status(200).json(lobbies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the lobbies' });
  }
};

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

export const joinLobby = (req, res) => {
  try {
    const { playerId, playerName } = req.body;
    const lobbyId = req.params.id;

    lobbies[lobbyId].addPlayer(playerId, playerName);
    io.to(lobbyId).emit('lobbyUpdated', {
      message: `${playerName} has joined the '${lobbies[lobbyId].name}' lobby.`,
      players: lobbies[lobbyId].players
    });

    res.json({ success: true, message: `${playerName} added to lobby '${lobbies[lobbyId].name}'.`, lobby: lobbies[lobbyId] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while joining the lobby' });
  }
};

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
