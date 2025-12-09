import { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import styles from './MessageInput.module.css';

const MessageInput = ({ chatId }) => {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const { sendMessage } = useSocket();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim() || sending) return;

        setSending(true);
        try {
            sendMessage(chatId, message.trim());
            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.input}
                    disabled={sending}
                />
            </div>

            <button
                type="submit"
                className={styles.sendBtn}
                disabled={!message.trim() || sending}
            >
                {sending ? (
                    <div className={styles.spinner}></div>
                ) : (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                )}
            </button>
        </form>
    );
};

export default MessageInput;
