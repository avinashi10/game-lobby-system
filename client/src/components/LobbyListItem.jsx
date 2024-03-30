// LIBRARY IMPORTS
import { useEffect, useState } from 'react'
import axios from 'axios';
import io from 'socket.io-client';

// LOCAL IMPORTS

const socket = io('http://localhost:3000');

export default function LobbyListItem({ lobby, player }) {
  // SET STATES
  const [lobbyPlayers, setLobbyPlayers] = useState([]);

  // HOOKS
  useEffect(() => {
    axios.get(`http://localhost:3000/lobbies/${lobby.id}/players`)
      .then(({ data }) => {
        if (data.players) {
          setLobbyPlayers(data.players);
        }
      })
      .catch((err) => console.error(err));

      socket.on('lobbyUpdated', (data) => {
        if (data.lobbyId === lobby.id) {
          setLobbyPlayers(data.players);
        }
      });

      return () => {
        socket.off('lobbyUpdated');
      };
  }, []);

  //HANDLE EVENTS
  const handleJoinClick = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/lobbies/${lobby.id}/join`, {
        playerId: player.id,
        playerName: player.name,
      });
      setLobbyPlayers(response.data.lobby.players);
      socket.emit('joinRoom', { lobbyId: lobby.id });
      alert(response.data.message);
      console.log(response.data);
    } catch (error) {
      console.error("Couldn't add player to lobby:", error);
      alert("Failed to join the lobby");
    }
  }
  const handleLeaveClick = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/lobbies/${lobby.id}/leave`, {
        playerId: player.id,
        playerName: player.name,
      });
      setLobbyPlayers(response.data.lobby.players);
      socket.emit('leaveRoom', { lobbyId: lobby.id });
      alert(response.data.message);console.log(response.data);
    } catch (error) {
      console.error("Couldn't remove player from lobby:", error);
      alert("Failed to leave the lobby.");
    }
  }
  const handleStartGameClick = (e) => {

  }

  return (
    <>
      <h3>{lobby.name}</h3>
      <button
        onClick={handleJoinClick}
        disabled={lobbyPlayers.length > 0 &&lobbyPlayers.some(p => p.id === player?.id)}
      >
        Join Lobby
      </button>
      <button
        onClick={handleLeaveClick}
        disabled={!lobbyPlayers.some(p => p.id === player?.id)}
      >
        Leave Lobby
      </button>
      <button>Start Game</button>
      <h4>Players in this lobby:</h4>
      <ul>
        {lobbyPlayers.map((player) => (
          <li key={player.id}>{player?.name}</li>
        ))}
      </ul>
    </>
  )
};
