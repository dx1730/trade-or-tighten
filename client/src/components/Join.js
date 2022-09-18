import React, { Component } from 'react';
import io from "socket.io-client";

const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'

export default class Join extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      room: '',
      players: [],
      socket: null
    }
  }

  setName = (name) => {
    this.setState({username : name});
  }

  setRoom = (room) => {
    this.setState({room: room});
  }



  render() {
    return (
      <section class="bg-indigo-100 h-full">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
        <div class="w-3/4 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-8 space-y-6 md:space-y-6">
            <h1 class="text-2xl font-bold leading-tight tracking-tight text-gray-800">
              Join Game
            </h1>
            <div class="space-y-6" action="#">
              <div>
                <label for="username" class="text-left block mb-2 text-sm font-medium text-gray-800">Username</label>
                <input class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" placeholder="Username" required=""/>
              </div>
              <div>
                <label for="room-code" class="text-left block mb-2 text-sm font-medium text-gray-800">Room Code</label>
                <input placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5" required=""/>
              </div>
              <button class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 text-center">Join</button>
              <button class="text-gray-700 text-sm hover:underline hover:text-gray-800">Back</button>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
  }
}