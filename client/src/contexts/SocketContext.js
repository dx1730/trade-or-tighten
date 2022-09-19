import { createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'
const socket = io('http://localhost:8000');

export function SocketProvider({children}) {
    return (
        <SocketContext.Provider value={{ socket: socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;