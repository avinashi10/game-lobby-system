// LIBRARY IMPORTS
import express from 'express';

const router = express.Router();

// LOCAL IMPORTS
import { createLobby, getAllLobbies, getLobbyPlayers, joinLobby, leaveLobby } from './controllers.js';

// ROUTES
router.post('/lobbies', createLobby);
router.get('/lobbies', getAllLobbies);
router.get('/lobbies/:id/players', getLobbyPlayers);
router.put('/lobbies/:id/join', joinLobby);
router.put('/lobbies/:id/leave', leaveLobby);

export default router;
