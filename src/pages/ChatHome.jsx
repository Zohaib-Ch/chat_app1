import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatList from '../components/Chat/ChatList';
import ChatWindow from '../components/Chat/ChatWindow';
import UserList from '../components/Users/UserList';
import styles from './ChatHome.module.css';

const ChatHome = () => {
    const { logout } = useAuth();
    const [activeChat, setActiveChat] = useState(null);
    const [showUsers, setShowUsers] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const handleChatSelect = (chat) => {
        setActiveChat(chat);
        setShowUsers(false);
    };

    const handleShowUsers = () => {
        setShowUsers(true);
    };

    const handleUserSelect = (chat) => {
        setActiveChat(chat);
        setShowUsers(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.logo}>Chat App</h1>
                    <button onClick={handleLogout} className={styles.logoutBtn} title="Logout">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
                {showUsers ? (
                    <UserList
                        onUserSelect={handleUserSelect}
                        onBack={() => setShowUsers(false)}
                    />
                ) : (
                    <ChatList
                        activeChat={activeChat}
                        onChatSelect={handleChatSelect}
                        onShowUsers={handleShowUsers}
                    />
                )}
            </div>
            <div className={styles.main}>
                <ChatWindow chat={activeChat} />
            </div>
        </div>
    );
};

export default ChatHome;
