// LIBRARY IMPORTS
import { useState } from 'react'

// LOCAL IMPORTS
import puberryLogo from './assets/puberry.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://puberry.org" target="_blank">
          <img src={puberryLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Puberry Game Lobby</h1>
      <div className="card">
        <form>
          <label for="lobbyName">Create a New Lobby</label>
          <input type="text" id="lobbyName" name="lobbyName"></input>
          <input type="submit" value="Create"></input>
        </form>
      </div>
    </>
  )
}

export default App
