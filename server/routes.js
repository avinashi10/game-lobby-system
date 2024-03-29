// LIBRARY IMPORTS
import express from 'express';

const router = express.Router();

// LOCAL IMPORTS
import { createLobby, getAllLobbies } from './controllers.js';

// ROUTES
router.post('/lobbies', createLobby);
router.get('/lobbies', getAllLobbies);

export default router;
