import { createContext, useContext, useEffect, useState } from 'react';
import socketService from '../services/socketService';
import { useAuth } from './AuthContext';
import { authService } from '../services/authService';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            const token = authService.getToken();
            const socketInstance = socketService.connect(token);
            setSocket(socketInstance);

            socketInstance.on('userOnline', (userId) => {
                setOnlineUsers(prev => [...new Set([...prev, userId])]);
            });

            socketInstance.on('userOffline', (userId) => {
                setOnlineUsers(prev => prev.filter(id => id !== userId));
            });

            return () => {
                socketService.disconnect();
                setSocket(null);
            };
        }
    }, [isAuthenticated]);

    const sendMessage = (chatId, content) => {
        if (socket) {
            socketService.emit('sendMessage', { chatId, content });
        }
    };

    const value = {
        socket,
        onlineUsers,
        sendMessage
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }
    return context;
};
