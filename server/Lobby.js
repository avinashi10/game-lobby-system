class Lobby {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.players = [];
  }

  addPlayer(playerId, playerName) {
    const isPlayerExists = this.players.some(player => player.id === playerId);
    if (!isPlayerExists) {
      this.players.push({ id: playerId, name: playerName });
    }
  }

  removePlayer(playerId) {
    this.players = this.players.filter(player => player.id !== playerId);
  }
}

export default Lobby;
