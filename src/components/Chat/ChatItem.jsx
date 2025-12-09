import Avatar from '../Common/Avatar';
import { formatChatTime } from '../../utils/formatDate';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import styles from './ChatItem.module.css';

const ChatItem = ({ chat, active, onClick }) => {
    const { onlineUsers } = useSocket();
    const { user } = useAuth();

    const otherUser = chat.participants?.find(p => p._id !== user?._id);
    const isOnline = onlineUsers.includes(otherUser?._id);
    const lastMessage = chat.lastMessage;

    return (
        <div
            className={`${styles.item} ${active ? styles.active : ''}`}
            onClick={onClick}
        >
            <Avatar username={otherUser?.username} size="md" online={isOnline} />

            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.username}>{otherUser?.username || 'Unknown'}</span>
                    {lastMessage && (
                        <span className={styles.time}>{formatChatTime(lastMessage.createdAt)}</span>
                    )}
                </div>

                {lastMessage && (
                    <p className={styles.lastMessage}>{lastMessage.content}</p>
                )}
            </div>
        </div>
    );
};

export default ChatItem;
