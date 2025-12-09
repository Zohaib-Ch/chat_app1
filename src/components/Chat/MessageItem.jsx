import { useAuth } from '../../context/AuthContext';
import { formatMessageTime } from '../../utils/formatDate';
import styles from './MessageItem.module.css';

const MessageItem = ({ message }) => {
    const { user } = useAuth();
    const isSent = message.sender === user?._id || message.sender?._id === user?._id;

    return (
        <div className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
            <div className={styles.bubble}>
                <p className={styles.content}>{message.content}</p>
                <span className={styles.time}>{formatMessageTime(message.createdAt)}</span>
            </div>
        </div>
    );
};

export default MessageItem;
