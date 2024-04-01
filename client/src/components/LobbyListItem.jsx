// LIBRARY IMPORTS
import { useEffect, useState } from 'react'
import axios from 'axios';

// LOCAL IMPORTS
import JoinLobbyButton from './JoinLobbyButton.jsx';
import LeaveLobbyButton from './LeaveLobbyButton.jsx';
import StartGameButton from './StartGameButton.jsx';


export default function LobbyListItem({ lobby, player, playerList, socket }) {
  return (
    <>
      <h3>{lobby.name}</h3>
      <JoinLobbyButton
        lobby={lobby}
        player={player}
        playerList={playerList}
        socket={socket}
      />
      <LeaveLobbyButton
        lobby={lobby}
        player={player}
        playerList={playerList}
        socket={socket}
      />
      <StartGameButton
        lobby={lobby}
        player={player}
        playerList={playerList}
        socket={socket}
      />
      <h4>Players in this lobby:</h4>
      <ul>
        {playerList?.map((player) => (
          <li key={player.id}>{player?.name}</li>
        ))}
      </ul>
    </>
  )
};
