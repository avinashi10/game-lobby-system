// LIBRARY IMPORTS
import { useEffect } from 'react'
import axios from 'axios';

export default function LeaveLobbyButton({ lobby, player, playerList, socket }) {
  //HANDLE EVENTS
  const handleLeaveClick = async () => {
    try {
      const socketId = socket.id;

      const response = await axios.put(`http://localhost:3000/lobbies/${lobby.id}/leave`, {
        playerId: player.id,
        playerName: player.name,
        socketId: socketId,
      });

      alert(response.data.message);
      console.log("LEAVE HTTP RESPONSE: ", response.data);
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
