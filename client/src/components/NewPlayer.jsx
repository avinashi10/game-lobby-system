// LIBRARY IMPORTS
import { useState } from 'react'

function NewPlayer({ setPlayer }) {
  // SET STATES
  const [isPlayer, setIsPlayer] = useState(false);
  const [playerName, setPlayerName] = useState('');

  // HANDLE EVENTS
  const handleSubmit = (e) => {
    e.preventDefault();
    const playerId = Date.now().toString();
    setPlayer({ id: playerId, name: playerName });
    setIsPlayer(true);
  }

  return (
    <div className="card">
      {isPlayer ?
      <h3>Welcome, {playerName}</h3> :
      <form onSubmit={handleSubmit}>
        <label htmlFor="playerName">Enter Player Name</label>
        <input
          type="text"
          id="playerName"
          name="playerName"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        ></input>
        <input type="submit" value="Submit"></input>
      </form>}
    </div>
  )
}

export default NewPlayer;
