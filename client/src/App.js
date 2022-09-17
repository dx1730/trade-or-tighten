import "./App.css";
import Nav from "./components/Nav";
import Join from "./components/Join";
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
        <Route path="/" element={<Join socket={socket} room={room} setRoom={setRoom} />}/>
        <Route path="/rules" element={<Rules/>} />
        <Route path="/chat" element={<Chat socket={socket} room={room} />} />
      </Routes>
    </Router>
  )

  // return (
  //   <div className='bg-indigo-100 min-h-screen'>
  //     <Nav />
  //     {!joined ? (
  //       <Join socket={socket} setJoined={setJoined} room={room} setRoom={setRoom} />
  //     ) : (
  //       <Chat socket={socket} room={room} />
  //     )}
  //     <footer></footer>
  //   </div>
  // );
}

export default App;
