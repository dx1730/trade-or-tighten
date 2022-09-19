import React, { useEffect, useState, useContext } from 'react';
import SocketContext from '../contexts/SocketContext';
import { useLocation } from 'react-router-dom';

function Chat() {
    const { socket } = useContext(SocketContext);
    const location = useLocation();
    let username = location.state.username;
    let room = location.state.room;

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const date = new Date(Date.now());
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: date.getHours() + ":" + (date.getMinutes()<10 ? '0' : '') + date.getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket])

    return (
        <div className="bg-indigo-100 min-h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-900"> Live Chat </h1>
                <p className="text-gray-900"> (Room: {room}) </p>
            </div>
            <div className="mx-auto w-2/3 mt-2 text-left">
                {messageList.map((messageContent) => {
                    return (
                        <div className='message' id={username === messageContent.author ? "you" : "other"} >
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.author} ({messageContent.time}): {messageContent.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex w-2/3 items-center mx-auto my-4">
                <input 
                    type="text" 
                    placeholder="Hey..."
                    className="block py-2 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1"
                    onChange={(event) => {
                        setCurrentMessage(event.target.value)
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                    value={currentMessage}
                />
                <button 
                    className="mt-3 w-full px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                    onClick={sendMessage}
                >&#9658;
                </button>
            </div>
        </div>
    )
}

export default Chat;