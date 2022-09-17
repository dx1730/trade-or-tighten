import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat.js';

const PORT = process.env.PORT || 8000;
const socket = io();

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div>
        <h3>Join A Chat</h3>
        <input 
          type="text" 
          placeholder="Name" 
          onChange={(event) => {
            setUsername(event.target.value)
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && joinRoom();
          }}
        />
        <input 
          type="text" 
          placeholder="Room ID"
          onChange={(event) => {
            setRoom(event.target.value)
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && joinRoom();
          }}
        />
        <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
      <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
  );
} 

export default App;
