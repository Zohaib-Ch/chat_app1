import { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Avatar from '../Common/Avatar';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import styles from './ChatWindow.module.css';

const ChatWindow = ({ chat }) => {
    const { user } = useAuth();
    const { onlineUsers } = useSocket();

    if (!chat) {
        return (
            <div className={styles.empty}>
                <div className={styles.emptyContent}>
                    <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3>Select a conversation</h3>
                    <p>Choose from your existing conversations or start a new one</p>
                </div>
            </div>
        );
    }

    const otherUser = chat.participants?.find(p => p._id !== user?._id);
    const isOnline = onlineUsers.includes(otherUser?._id);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <Avatar username={otherUser?.username} size="md" online={isOnline} />
                    <div className={styles.userDetails}>
                        <h3 className={styles.username}>{otherUser?.username || 'Unknown'}</h3>
                        <span className={styles.status}>
                            {isOnline ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>

            <MessageList chatId={chat._id} />
            <MessageInput chatId={chat._id} />
        </div>
    );
};

export default ChatWindow;
