import styles from './Avatar.module.css';

const Avatar = ({ username, size = 'md', online = false }) => {
    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className={`${styles.avatar} ${styles[size]}`}>
            <div className={styles.initials}>{getInitials(username)}</div>
            {online && <div className={styles.onlineIndicator}></div>}
        </div>
    );
};

export default Avatar;
