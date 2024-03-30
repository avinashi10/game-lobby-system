// LIBRARY IMPORTS
import { useState } from 'react'

// LOCAL IMPORTS
import puberryLogo from './assets/puberry.png'
import './App.css'
import CreateLobby from './components/CreateLobby.jsx';
import LobbyList from './components/LobbyList.jsx';
import NewPlayer from './components/NewPlayer.jsx';

export default function App() {
  // SET STATES
  const [player, setPlayer] = useState(null);

  return (
    <>
      <div>
        <a href="https://puberry.org" target="_blank">
          <img src={puberryLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Puberry Game Lobby</h1>
      <NewPlayer setPlayer={setPlayer} />
      <CreateLobby />
      <LobbyList player={player} />
    </>
  )
};
