// LIBRARY IMPORTS
import { useState, useEffect } from 'react'
import axios from 'axios';

// LOCAL IMPORTS
import LobbyListItem from './LobbyListItem.jsx';

function LobbyList() {
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
  }, []);
  const tempLobbies = [{name:'Estrogen Oasis'}, {name:'Hormone Haven'}, {name:'Adrenal Adventure'}, {name:'Body Basics Bay'}, {name:'Menstruation Maze'}, {name:'Puberty Park'}, {name:'Transformation Trail'} ]
  return (
    <>
      <h2>Active Game Lobbies</h2>
      {lobbyList.map((lobby, index) => <LobbyListItem key={index} name={lobby.name} />)}
    </>
  )
}

export default LobbyList;
