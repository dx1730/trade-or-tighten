import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { SocketProvider } from "./contexts/SocketContext";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Rules from "./components/Rules";
import Create from "./components/Create";
import Join from "./components/Join";
import WhatIsThis from "./components/WhatIsThis";
import Game from "./components/game/Game";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Router>
          <div className="flex flex-col h-screen">
            <Nav/>
            <div className="flex-auto">
              <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/rules" element={<Rules/>} />
              <Route path="/whatisthis" element={<WhatIsThis/>} />
              <Route path="/chat" element={<Chat/>} />
              <Route path="/create" element={<Create/>} />
              <Route path="/join" element={<Join/>} />
              <Route path="/game" element={<Game/>}/>
              <Route path="/leaderboard" />
              <Route path="/history" />
              </Routes>
            </div>
          </div>
        </Router>
      </SocketProvider>
    </div>
  )
}

export default App;
