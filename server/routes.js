// LIBRARY IMPORTS
import express from 'express';

const router = express.Router();

// LOCAL IMPORTS
import { createLobby } from './controllers/createLobby.js';
import { getAllLobbies } from './controllers/getAllLobbies.js';
import { getLobbyPlayers } from './controllers/getLobbyPlayers.js';
import { joinLobby } from './controllers/joinLobby.js';
import { leaveLobby } from './controllers/leaveLobby.js';

// ROUTES
router.post('/lobbies', createLobby);
router.get('/lobbies', getAllLobbies);
router.get('/lobbies/:id/players', getLobbyPlayers);
router.put('/lobbies/:id/join', joinLobby);
router.put('/lobbies/:id/leave', leaveLobby);

export default router;
