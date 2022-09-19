import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Rules from "./components/Rules";
import Create from "./components/Create";
import Join from "./components/Join";
import WhatIsThis from "./components/WhatIsThis";

function App() {
  return (
    <div className="App">
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
            <Route path="/game" />
            <Route path="/leaderboard" />
            <Route path="/history" />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App;
