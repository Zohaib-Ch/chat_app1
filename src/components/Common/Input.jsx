import styles from './Input.module.css';

const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    label,
    name,
    required = false
}) => {
    return (
        <div className={styles.inputGroup}>
            {label && (
                <label className={styles.label}>
                    {label} {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${styles.input} ${error ? styles.error : ''}`}
                required={required}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Input;
