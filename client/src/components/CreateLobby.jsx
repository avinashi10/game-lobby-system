// LIBRARY IMPORTS
import { useState } from 'react'
import axios from 'axios';

function CreateLobby() {
  //SET STATES
  const [lobbyName, setLobbyName] = useState('');

  // HANDLE EVENTS
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/lobbies', {
        lobbyName: lobbyName,
      });
      setLobbyName('');
    } catch (error) {
      console.error("Couldn't create lobby:", error);
    }
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="lobbyName">Create a New Lobby</label>
          <input
            type="text"
            id="lobbyName"
            name="lobbyName"
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
            required
          ></input>
          <input type="submit" value="Create"></input>
        </form>
      </div>
    </>
  )
}

export default CreateLobby;
