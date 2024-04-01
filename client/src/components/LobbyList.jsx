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

  const updatePlayersList = (lobbyId, players) => {
    setPlayerList(prev => ({
      ...prev,
      [lobbyId]: players,
    }));
  };

  // HOOKS
  useEffect(() => {
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

      socket.on('lobbyCreated', (newLobby) => {
        setLobbyList((prevLobbies) => [...prevLobbies, newLobby]);
        console.log("lobbies: ", lobbyList);
      });

      socket.on('lobbyUpdated', ({ lobbyId, players }) => {
        updatePlayersList(lobbyId, players);
      });
      return () => {
        socket.off('lobbyCreated');
        socket.off('lobbyUpdated');
      };
  }, [playerList]);

  useEffect(() => {
    // SOCKET EVENT HANDLERS
    const handleLobbyUpdates = ({ lobbyId, players }) => {
      console.log(`lobbyUpdated for lobby ${lobbyId}; players=`, players);
      setPlayerList(prev => ({
        ...prev,
        [lobbyId]: players,
      }));
    };

    const handlePlayerJoined = ({ lobbyId, player }) => {
      console.log(`Player ${player.name} joined lobby ${lobbyId}`);
      setPlayerList(prev => ({
        ...prev,
        [lobbyId]: [...(prev[lobbyId] || []), player],
      }));
    };

    const handlePlayerLeft = ({ lobbyId, playerId }) => {
      console.log(`Player with ID ${playerId} left lobby ${lobbyId}`);
      setPlayerList(prev => ({
        ...prev,
        [lobbyId]: prev[lobbyId].filter(p => p.id !== playerId),
      }));
    };

    // SOCKET EVENT LISTENERS
    socket.on('lobbyUpdated', handleLobbyUpdates);
    socket.on('playerJoinedLobby', handlePlayerJoined);
    socket.on('playerLeftLobby', handlePlayerLeft);

    // CLEAN UP
    return () => {
      socket.off('lobbyUpdated', handleLobbyUpdates);
      socket.off('playerJoinedLobby', handlePlayerJoined);
      socket.off('playerLeftLobby', handlePlayerLeft);
    };
  }, [playerList]);

  return (
    <>
      <h2>Active Game Lobbies</h2>
      {lobbyList.map((lobby, index) => (
        <LobbyListItem
          key={index}
          lobby={lobby}
          player={player}
          playerList={playerList[lobby.id] || []}
          updatePlayersList={updatePlayersList}
          socket={socket}
        />
      ))}
    </>
  )
};
