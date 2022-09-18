import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Rules from "./components/Rules";
import io from "socket.io-client";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const socket = io("http://localhost:8000");

function App() {
  const [room, setRoom] = useState("");

  return (
    <Router>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home socket={socket} room={room} setRoom={setRoom} />}/>
        <Route path="/rules" element={<Rules/>} />
        <Route path="/chat" element={<Chat socket={socket} room={room} />} />
      </Routes>
    </Router>
  )
}

export default App;
