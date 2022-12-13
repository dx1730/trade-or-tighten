import React from "react";
import { Tab } from '@headlessui/react';

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
  return (
    <div className="h-full bg-indigo-100">
      <h1 className="px-12 text-left text-xl tracking-tight font-semibold text-gray-700 sm:text-2xl md:text-3xl lg:text-4xl">
        <span className="inline">Trading on&nbsp;</span>
        <span className="text-indigo-600 inline">the sum of 10 cards</span>
      </h1>
      <Actions/>
      <Action2/>
    </div>
  );
}

export default Game;