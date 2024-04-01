# Puberry Game Lobby System

Welcome to the Puberry Game Lobby System! This system manages game lobbies for multiplayer interaction, enabling players to create, join, leave lobbies, and start games automatically when the lobby reaches 3 players.

## Design Decisions

### Technology Stack
- **Backend**: I paired Node.js with Express, for a scalable efficient backend solution. The event-driven, non-blocking nature of Node.js is ideal for real-time applications like this one.
- **Data**: I used an in-memory data structure with a constructor for lobbies, which offered quick setup and fast, straightforward operations ideal for the system's real-time interaction needs.
- **Frontend**: React's component-based architecture allowed for reusable components with organized code.


### MVC Architecture on the Backend
I structured the backend following the Model-View-Controller (MVC) design pattern,  with a focus on models, controllers, and routes. This setup helped organize the codebase, separating concerns for better maintainability and scalability. Routes define endpoints, controllers handle the logic, and models manage the lobby and player data.

### Functionality over Form
While the original exercise listed specific functions, my implementation focused on achieving the required functionality with similar, sometimes combined, functions. This approach allowed for more flexibility in design and optimization of the system's capabilities.

## Setup Instructions

1. **Clone the Repository**: `git clone https://github.com/avinashi10/game-lobby-system.git`
2. **Install Dependencies**: Run `npm install` in both the project root (for backend) and the client directory (for frontend).
3. **Start the Server & Client**: Run `npm start` in the project root to launch the app.
4. **Open Browser**: Navigate to the indicated local host port in your browser.
## How to Interact with the System

### Through the Browser
I developed a frontend to simplify the testing process and demonstrate the real-time capabilities of the system. It allows interaction directly through the browser, making it accessible and straightforward to use. 
**To simulate multiple players, load the frontend on several (3+) browser windows.**
- **Creating a Lobby**:
  - Enter your desired lobby name in the 'create a new lobby' form and submit.
  - Verify that the 'Active Game Lobbies' list updates in all windows.
- **Joining/Leaving a Lobby**:
  - Enter your desired player name in the 'Enter Player Name' form and submit.
  - Browse available lobbies and choose to join or leave.
  - Verify that the players list updates accordingly for all players and that the notification of player change appears only for players in the relevant lobby.
- **Starting a Game**:
  - Click the 'Start Game' button on a lobby. Verify that all players in relevant lobby are notified, and that the lobby is deleted from the list in all windows.
  - Have a third player join a lobby. Verify that all players in relevant lobby are notified, and that the lobby is deleted from the lobbies list in all windows.
- **Deleting a Lobby**:
  - Remove all players from a lobby. Once last player is removed, verify that that the lobby is deleted from the lobbies list in all windows.

### Using Postman for Backend Interaction

To interact with the system's backend, you can use Postman to test the following API endpoints. Ensure you check the port on which your server is running to construct the full URL for each route (e.g., `http://localhost:3000/lobbies`). Below are the available routes and the expected request body details:

- - **Create Lobby**: 
  - `POST /lobbies` 
  - Body: `{ "lobbyName": "Your Lobby Name"}`

- **List All Lobbies**: 
  - `GET /lobbies`

- **Get Players in a Lobby**: 
  - `GET /lobbies/:id/players`
  - Note: Replace `:id` with the actual lobby ID.

- **Start Game / Delete Lobby**: 
  - `DELETE /lobbies/:id`
  - Body: `{ "lobbyName": "Your Lobby Name"}`
  
Please ensure that your request bodies match the specified formats and that you replace any placeholder values with actual data relevant to your testing scenario.

- **Note on Testing `join` and `leave` Routes**:
  - When using Postman to test the `join` and `leave` lobby routes, note that these endpoints expect a `socketId` in the request body, which is typically obtained from an active WebSocket connection in the frontend application. As Postman doesn't maintain WebSocket connections, directly testing these endpoints with accurate `socketId` values might not be feasible. For comprehensive testing of these functionalities, consider using the frontend interface which has active WebSocket connections.

## Conclusion

This system demonstrates a real-time, interactive environment for managing game lobbies and using WebSockets for instant communication between clients and the server. By leveraging React and Node.js, along with an MVC backend architecture, the system offers a robust platform for multiplayer game lobby management.
