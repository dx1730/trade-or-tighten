import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render () {
    return (
      <div className="bg-indigo-100 h-full">
        <main className="pt-16 mx-auto max-w-7xl px-4 sm:pt-32 text-center">
          <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block xl:inline">Trade or</span>{" "}
            <span className="block text-indigo-600 xl:inline">Tighten</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Practice making markets against friends in real time.
          </p>
          <div className="mt-8 sm:max-w-2xl sm:mx-auto sm:text-center sm:flex">
            <div className="w-1/2 m-auto sm:ml-32 sm:mr-3">
              <Link to="/create">
                <button
                className="block w-full px-5 py-3 rounded-md border border-transparent text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                >
                Create Game
                </button>
              </Link>
            </div>
            <div className="w-1/2 m-auto sm:mr-32 sm:ml-3">
              <Link to="/join">
                <button
                className="block w-full px-5 py-3 rounded-md border border-transparent text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm mt-3 sm:mt-0"
                >
                Join Game
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <span className="text-sm text-gray-500 hover:underline hover:text-gray-600">
              <Link to="/rules">How do you play this game?</Link>
            </span>
          </div>
          <p className="text-sm text-blue-500 underline ml-2">
            Privacy Policy
          </p>
        </main>
        <p className="absolute bottom-8 w-full text-center text-sm text-gray-500">
          Made by <a className="underline hover:text-indigo-600" href="https://github.com/dx1730/trade-or-tighten" target="_blank" rel="noopener noreferrer">David Xue</a>
        </p>
      </div>
    )
  }
}