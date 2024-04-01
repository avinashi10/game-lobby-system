// LIBRARY IMPORTS
import { useEffect } from 'react'
import axios from 'axios';

export default function LeaveLobbyButton({ lobby, player, playerList, socket }) {
  //HANDLE EVENTS
  const handleLeaveClick = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/lobbies/${lobby.id}/leave`, {
        playerId: player.id,
        playerName: player.name,
      });

      socket.emit('leaveRoom', { lobbyId: lobby.id });

      alert(response.data.message);console.log(response.data);
    } catch (error) {
      console.error("Couldn't remove player from lobby:", error);
      alert("Failed to leave the lobby.");
    }
  }
  return (
    <button
      onClick={handleLeaveClick}
      disabled={!playerList || !playerList.some(p => p.id === player?.id)}
    >
      Leave Lobby
    </button>
  )
};
