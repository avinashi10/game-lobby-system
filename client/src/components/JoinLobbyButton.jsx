// LIBRARY IMPORTS
import { useEffect } from 'react'
import axios from 'axios';

export default function JoinLobbyButton({ lobby, player, playerList, socket }) {
  //HANDLE EVENTS
  const handleJoinClick = async () => {
    try {
      const socketId = socket.id;

      const response = await axios.put(`http://localhost:3000/lobbies/${lobby.id}/join`, {
        playerId: player.id,
        playerName: player.name,
        socketId: socketId,
      });

      socket.emit('joinRoom', { lobbyId: lobby.id });

      alert(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error("Couldn't add player to lobby:", error);
      alert("Failed to join the lobby");
    }
  }

  return (
    <>
      <button
        onClick={handleJoinClick}
        disabled={playerList && playerList.some(p => p.id === player?.id)}
      >
        Join Lobby
      </button>
    </>
  )
};
