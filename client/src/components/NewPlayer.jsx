// LIBRARY IMPORTS
import { useState } from 'react'

// LOCAL IMPORTS

function NewPlayer() {

  return (
    <div className="card">
      <form>
        <label htmlFor="playerName">Enter Player Name</label>
        <input type="text" id="playerName" name="playerName"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  )
}

export default NewPlayer;
