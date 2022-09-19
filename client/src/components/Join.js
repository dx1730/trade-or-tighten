import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocketContext from '../contexts/SocketContext';

function Error({ errorMessage }) {
  return (
    <div className="text-left text-sm mt-2 font-light text-red" disabled={true}>
      &#9888; Error: {errorMessage}
    </div>
  )
}

function Join() {
  const { socket } = useContext(SocketContext);

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();
  
  const attemptJoin = () => {
    if (username === "") {
      setError(true);
      setErrorMessage("Please enter a username.");
      return
    }

    if (room === "") {
      setError(true);
      setErrorMessage("Please enter a room code.");
      return
    }

    socket.emit("join", room)
    navigate("/chat", {state: {room: room, username: username}});
  }

  return (
    <section className="bg-indigo-100 h-full">
      <div className="pt-4 mx-auto max-w-7xl px-8 sm:pt-16 text-center flex-initial md:pt-16 xl:pt-48">
        <div className="mx-auto w-3/4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-800">
              Join Game
            </h1>
            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="username" className="text-left block mb-2 text-sm font-medium text-gray-800">Username</label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" 
                  placeholder="Username" 
                  value={username}
                  onChange={(event) => {setUsername(event.target.value)}}
                  onKeyPress={(event) => {event.key === "Enter" && attemptJoin();}}
                />
              </div>
              <div>
                <label htmlFor="room" className="text-left block mb-2 text-sm font-medium text-gray-800">Room Code</label>
                <input 
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" 
                  value={room}
                  onChange={(event) => {setRoom(event.target.value)}}
                  onKeyPress={(event) => {event.key === "Enter" && attemptJoin();}}
                />
              </div>
            </div>
            { error ? <Error errorMessage={errorMessage}/> : null }
            <button
              className="w-full mt-6 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus-outline-none focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 text-center"
              onClick={attemptJoin}
              >
              Join
            </button>
            <div className="mt-5">
              <Link to="/">
                <button 
                  className="text-gray-700 text-sm hover:underline hover:text-gray-800"
                  >
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Join;