import styles from './Button.module.css';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    loading = false,
    disabled = false,
    fullWidth = false
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`}
        >
            {loading ? <span className={styles.spinner}></span> : children}
        </button>
    );
};

export default Button;
