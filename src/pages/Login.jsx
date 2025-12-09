import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/Auth/AuthLayout';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import ErrorMessage from '../components/Common/ErrorMessage';
import { validatePassword, validateUsername } from '../utils/validators';
import styles from './Login.module.css';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: 'admin',
        password: 'admin'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setApiError('');
    };

    const validate = () => {
        const newErrors = {};

        if (!validateUsername(formData.username)) {
            newErrors.username = 'Username is required';
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        setApiError('');

        try {
            await login(formData.username, formData.password);
            toast.success('Welcome back!');
            navigate('/chat');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            setApiError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue your conversations"
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                {apiError && <ErrorMessage message={apiError} />}

                <Input
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                    required
                />

                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                />

                <Button type="submit" loading={loading} fullWidth>
                    Sign In
                </Button>

                <p className={styles.footer}>
                    Don't have an account?{' '}
                    <Link to="/register" className={styles.link}>
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;
