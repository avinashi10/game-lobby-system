// LOCAL IMPORTS
const { lobbies } = require('./dataStore');
const Lobby = require('./Lobby');

// LOBBY CONTROLLER FUNCTIONS
function createLobby(name) {
  const id = generateUniqueId();
  const newLobby = new Lobby(id, name);
  lobbies[id] = newLobby;
  return newLobby;
}

// EXPORTS
module.exports = {
  createLobby,
};
