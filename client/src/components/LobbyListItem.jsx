// LIBRARY IMPORTS
import { useState } from 'react'

// LOCAL IMPORTS


function LobbyListItem({ name }) {

  return (
    <>
      <h3>{name}</h3>
      <button>Join Lobby</button>
      <button>Leave Lobby</button>
      <button>Start Game</button>
    </>
  )
}

export default LobbyListItem;
