import { useState, useEffect, useRef } from 'react';
import { chatService } from '../../services/chatService';
import MessageItem from './MessageItem';
import Loading from '../Common/Loading';
import { useSocket } from '../../context/SocketContext';
import socketService from '../../services/socketService';
import styles from './MessageList.module.css';
import toast from 'react-hot-toast';

const MessageList = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const { socket } = useSocket();

    useEffect(() => {
        if (chatId) {
            loadMessages();
        }
    }, [chatId]);

    useEffect(() => {
        if (socket) {
            const handleNewMessage = (message) => {
                if (message.chat === chatId) {
                    setMessages(prev => [...prev, message]);
                    scrollToBottom();
                }
            };

            socketService.on('newMessage', handleNewMessage);

            return () => {
                socketService.off('newMessage', handleNewMessage);
            };
        }
    }, [socket, chatId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const loadMessages = async () => {
        try {
            setLoading(true);
            const data = await chatService.getMessages(chatId);
            setMessages(data.messages || []);
        } catch (error) {
            toast.error('Failed to load messages');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            {messages.length === 0 ? (
                <div className={styles.empty}>
                    <p>No messages yet. Start the conversation!</p>
                </div>
            ) : (
                <div className={styles.messageList}>
                    {messages.map(message => (
                        <MessageItem key={message._id} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
};

export default MessageList;
