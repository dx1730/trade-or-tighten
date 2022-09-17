import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chat({ socket, username, room }) {
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
        <div>
            <div className='chat-header'></div>
                <p>Live Chat</p>
            <div className='chat-body'></div>
            <ScrollToBottom className="message-container">
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
            </ScrollToBottom>
            <div className='chat-footer'></div>
                <input 
                    type="text" 
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value)
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                    value={currentMessage}
                />
                <button onClick={sendMessage}>&#9658;</button>
        </div>
    )
}

export default Chat;