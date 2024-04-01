// LIBRARY IMPORTS
import { useState, useEffect } from 'react'
import axios from 'axios';
import io from 'socket.io-client';

// LOCAL IMPORTS
import LobbyListItem from './LobbyListItem.jsx';

const socket = io('http://localhost:3000');

export default function LobbyList({ player }) {
  //SET STATES
  const [lobbyList, setLobbyList] = useState([]);
  const [playerList, setPlayerList] = useState({});

  // HOOKS
  useEffect(() => {
    // HTTP REQUEST
    axios.get('http://localhost:3000/lobbies')
      .then(({ data }) => {
        const lobbiesArray = Object.values(data);
        setLobbyList(lobbiesArray);
        const initialPlayersList = lobbiesArray.reduce((acc, lobby) => {
          acc[lobby.id] = lobby.players;
          return acc;
        }, {});
        setPlayerList(initialPlayersList);
      })
      .catch((err) => console.error(err));

    // SOCKET EVENT HANDLER
    const updatePlayersList = (lobbyId, players) => {
      setPlayerList(prev => ({
        ...prev,
        [lobbyId]: players,
      }));
    };

    // SOCKET EVENT LISTENERS
    socket.on('lobbyCreated', (newLobby) => {
      setLobbyList((prevLobbies) => [...prevLobbies, newLobby]);
    });
    socket.on('lobbyUpdated', ({ lobbyId, players }) => {
      updatePlayersList(lobbyId, players);
    });

    // CLEAN UP
    return () => {
      socket.off('lobbyCreated');
      socket.off('lobbyUpdated');
    };
  }, [playerList]);

  useEffect(() => {
    // SOCKET EVENT HANDLERS
    const handlePlayerJoined = ({ message }) => {
      console.log(`playerJoinedLobby CLIENT SOCKET: ${message}`);
      alert(message);
    };

    const handlePlayerLeft = ({ message }) => {
      console.log(`playerLeftLobby CLIENT SOCKET: ${message}`);
      alert(message);
    };

    const handleGameStarted = ({ message }) => {
      console.log(`gameStarted CLIENT SOCKET: ${message}`);
      alert(message);
    };

    // SOCKET EVENT LISTENERS
    socket.on('playerJoinedLobby', handlePlayerJoined);
    socket.on('playerLeftLobby', handlePlayerLeft);
    socket.on('gameStarted', handleGameStarted);

    // CLEAN UP
    return () => {
      socket.off('playerJoinedLobby', handlePlayerJoined);
      socket.off('playerLeftLobby', handlePlayerLeft);
      socket.off('gameStarted', handleGameStarted);
    };
  }, []);

  return (
    <>
      <h2>Active Game Lobbies</h2>
      {lobbyList.map((lobby, index) => (
        <LobbyListItem
          key={index}
          lobby={lobby}
          player={player}
          playerList={playerList[lobby.id] || []}
          socket={socket}
        />
      ))}
    </>
  )
};
