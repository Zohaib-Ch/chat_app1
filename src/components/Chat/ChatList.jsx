import { useState, useEffect } from 'react';
import { chatService } from '../../services/chatService';
import ChatItem from './ChatItem';
import styles from './ChatList.module.css';
import toast from 'react-hot-toast';

const ChatList = ({ activeChat, onChatSelect, onShowUsers }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            const data = await chatService.getChats();
            setChats(data.chats || []);
        } catch (error) {
            toast.error('Failed to load chats');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredChats = chats.filter(chat => {
        const otherUser = chat.participants?.find(p => p._id !== chat.currentUserId);
        return otherUser?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Messages</h2>
                <button className={styles.newChatBtn} onClick={onShowUsers} title="New Chat">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            <div className={styles.searchBox}>
                <svg className={styles.searchIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.chatList}>
                {loading ? (
                    <div className={styles.loading}>Loading chats...</div>
                ) : filteredChats.length === 0 ? (
                    <div className={styles.empty}>
                        <p>No chats yet</p>
                        <button onClick={onShowUsers} className={styles.startChatBtn}>
                            Start a conversation
                        </button>
                    </div>
                ) : (
                    filteredChats.map(chat => (
                        <ChatItem
                            key={chat._id}
                            chat={chat}
                            active={activeChat?._id === chat._id}
                            onClick={() => onChatSelect(chat)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatList;
