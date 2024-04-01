# Puberry Game Lobby System

Welcome to the Puberry Game Lobby System! This system manages game lobbies for multiplayer interaction, enabling players to create, join, leave lobbies, and start games automatically when the lobby reaches a 3 players.

## Design Decisions

### Technology Stack
- **Backend**: I paired Node.js with Express, for a scalable efficient backend solution. The event-driven, non-blocking nature of Node.js is ideal for real-time applications like this one.
- **Data**: I used an in-memory data structure with a constructor for lobbies, which offered quick setup and fast, straightforward operations ideal for the system's real-time interaction needs.
- **Frontend**: React's component-based architecture allowed for reusable components with organized code.


### MVC Architecture on the Backend
I structured the backend following the Model-View-Controller (MVC) design pattern,  with a focus on models, controllers, and routes. This setup helped organize the codebase, separating concerns for better maintainability and scalability. Routes define endpoints, controllers handle the logic, and models manage the lobby and player data.

### Functionality over Form
While the original exercise listed specific functions, my implementation focused on achieving the required functionality with similar, sometimes combined, functions. This approach allowed for more flexibility in design and optimization of the system's capabilities.

## How to Interact with the System

### Through the Browser
I developed a simple frontend to ease the testing process and demonstrate the real-time capabilities of the system. It allows interaction directly through the browser, making it accessible and straightforward to use.
- **Creating a Lobby**: Navigate to the lobby creation section, enter your desired lobby details, and submit.
- **Joining/Leaving a Lobby**: Browse available lobbies and choose to join or leave. The system updates in real-time.
- **Starting a Game**: Games start automatically once a lobby reaches three players. For testing, you can manually trigger a game start if needed.

### Using Postman for Backend Interaction
The system provides several endpoints for direct interaction, allowing you to test functionalities like creating or joining a lobby without the frontend.

- **Create Lobby**: `POST /lobbies` with lobby details in the request body.
- **Join Lobby**: `PUT /lobbies/:lobbyId/join` with player details.
- **Leave Lobby**: `PUT /lobbies/:lobbyId/leave` to simulate a player leaving.
- **Delete Lobby**: Automatically handled when the last player leaves or the game starts.

## Setup Instructions

1. **Clone the Repository**: Get the code on your local machine.
2. **Install Dependencies**: Run `npm install` in both the project root (for backend) and the client directory (for frontend).
3. **Start the Server & Client**: Run `npm start` in the project root to launch the app.
4. **Open Browser**: Navigate to the indicated local host port in your browser.

## Conclusion

This Multiplayer Game Lobby System demonstrates a real-time, interactive environment for managing game lobbies, utilizing WebSockets for instant communication between clients and the server. By leveraging React and Node.js, along with an MVC backend architecture, the system offers a robust platform for multiplayer game lobby management.
