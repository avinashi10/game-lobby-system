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

  // HOOKS
  useEffect(() => {
    axios.get('http://localhost:3000/lobbies')
      .then(({ data }) => {
        const lobbiesArray = Object.values(data);
        setLobbyList(lobbiesArray);
      })
      .catch((err) => console.error(err));
      socket.on('lobbyCreated', (newLobby) => {
        setLobbyList((prevLobbies) => [...prevLobbies, newLobby]);
        console.log("lobbies: ", lobbyList);
      });
      return () => socket.off('lobbyCreated');
  }, []);

  return (
    <>
      <h2>Active Game Lobbies</h2>
      {lobbyList.map((lobby, index) => <LobbyListItem key={index} lobby={lobby} player={player} />)}
    </>
  )
};
