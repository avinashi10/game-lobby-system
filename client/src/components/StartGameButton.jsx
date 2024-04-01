// LIBRARY IMPORTS
import { useEffect } from 'react'
import axios from 'axios';

export default function StartGameButton({ lobby, player, playerList, socket }) {
  //HANDLE EVENTS
  const handleStartGameClick = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/lobbies/${lobby.id}`, { data:
        {lobbyName:lobby.name}
      });
    } catch (error) {
      console.error("Couldn't start game:", error);
      alert("Failed to start the game for lobby");
    }
  }
  return (
    <button
      onClick={handleStartGameClick}
    >
      Start Game
    </button>
  )
};
