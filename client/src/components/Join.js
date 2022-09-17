import React from 'react';
import { useNavigate } from 'react-router-dom';

function Join({ socket, setJoined, room, setRoom }) {
  let navigate = useNavigate();

  const joinRoom = () => {
      if (room !== "") {
        socket.emit("join", room);
        navigate("/chat");
      }
  }

  return (
    <div className='bg-indigo-100 min-h-screen'>
      <main className="pt-16 mx-auto max-w-7xl px-4 sm:pt-32" >
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-7xl">
            <span className="block xl:inline">Trade or </span>{" "}
            <span className="block text-indigo-600 xl:inline">Tighten</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Practice making markets against friends in real time.
          </p>
          <div className="mt-8 sm:max-w-2xl sm:mx-auto sm:text-center">
            <p className="text-base font-medium text-gray-900">
              Join / Create a Room
            </p>
            <div className="mt-3 sm:flex">
              <input
                type="text"
                className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1"
                placeholder="Enter a room name"
                onChange={(event) => {
                    setRoom(event.target.value)
                }}
                onKeyPress={(event) => {
                    event.key === "Enter" && joinRoom();
                }}
              />
              <button
                className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                onClick={joinRoom}
              >
                Join Room
              </button>
            </div>
            <p className="font-medium text-blue-500 underline ml-2 mt-8">
              Privacy Policy
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Join;