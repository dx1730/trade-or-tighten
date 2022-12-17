import React, { useContext } from "react";
import { Tab } from '@headlessui/react';
import OrderForm from "./OrderForm";
import OrderBook from "./OrderBook";
import SocketContext from '../../contexts/SocketContext';
import { useLocation } from 'react-router-dom';
import Test from './test';

function Actions() {
  return (
    <>
    <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab"
        role="tablist">
        <li class="nav-item" role="presentation">
          <a href="#tabs-home" class="
            nav-link
            block
            font-medium
            text-xs
            leading-tight
            uppercase
            border-x-0 border-t-0 border-b-2 border-transparent
            px-6
            py-3
            my-2
            hover:border-transparent hover:bg-gray-100
            focus:border-transparent
            active
          " id="tabs-home-tab" data-bs-toggle="pill" data-bs-target="#tabs-home" role="tab" aria-controls="tabs-home"
            aria-selected="true">Home</a>
        </li>
        <li class="nav-item" role="presentation">
          <a href="#tabs-profile" class="
            nav-link
            block
            font-medium
            text-xs
            leading-tight
            uppercase
            border-x-0 border-t-0 border-b-2 border-transparent
            px-6
            py-3
            my-2
            hover:border-transparent hover:bg-gray-100
            focus:border-transparent
          " id="tabs-profile-tab" data-bs-toggle="pill" data-bs-target="#tabs-profile" role="tab"
            aria-controls="tabs-profile" aria-selected="false">Profile</a>
        </li>
        <li class="nav-item" role="presentation">
          <a href="#tabs-messages" class="
            nav-link
            block
            font-medium
            text-xs
            leading-tight
            uppercase
            border-x-0 border-t-0 border-b-2 border-transparent
            px-6
            py-3
            my-2
            hover:border-transparent hover:bg-gray-100
            focus:border-transparent
          " id="tabs-messages-tab" data-bs-toggle="pill" data-bs-target="#tabs-messages" role="tab"
            aria-controls="tabs-messages" aria-selected="false">Messages</a>
        </li>
        <li class="nav-item" role="presentation">
          <a href="#tabs-contact" class="
            nav-link
            disabled
            pointer-events-none
            block
            font-medium
            text-xs
            leading-tight
            uppercase
            border-x-0 border-t-0 border-b-2 border-transparent
            px-6
            py-3
            my-2
            hover:border-transparent hover:bg-gray-100
            focus:border-transparent
          " id="tabs-contact-tab" data-bs-toggle="pill" data-bs-target="#tabs-contact" role="tab"
            aria-controls="tabs-contact" aria-selected="false">Contact</a>
        </li>
      </ul>
      </>
  )
}

function Action2() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

function Game() {
  const { socket } = useContext(SocketContext);
  const location = useLocation();

  let username = location.state.username;
  let room = location.state.room;

  return (
    <div className="h-full bg-indigo-100">
      <div className="flex items-center justify-center pt-2 pb-2">
        <h1 className="px-12 text-left text-xl tracking-tight font-semibold text-gray-700 sm:text-xl md:text-2xl lg:text-3xl">
          <span className="inline">Trading on&nbsp;</span>
          <span className="text-indigo-600 inline">the sum of 10 cards</span>
          <span className="text-sm">&nbsp; &nbsp; &nbsp; (room: {room})</span>
        </h1>
      </div>
      {/* <Actions/>
      <Action2/> */}
      <div className="flex">
        <div className="w-1/2 p-2">
          <OrderForm username={username} room={room}/>
        </div>
        <div className="w-1/2 pr-8">
          <OrderBook username={username} room={room}/>
        </div>
      </div>
      <Test/>
    </div>
  );
}

export default Game;