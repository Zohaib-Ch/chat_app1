import styles from './AuthLayout.module.css';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
