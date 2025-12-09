import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/Auth/AuthLayout';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import ErrorMessage from '../components/Common/ErrorMessage';
import { validatePassword, validateUsername, validateEmail } from '../utils/validators';
import styles from './Register.module.css';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
            await register(formData.username, formData.email, formData.password);
            toast.success('Account created successfully!');
            navigate('/chat');
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            setApiError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join us and start chatting"
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                {apiError && <ErrorMessage message={apiError} />}

                <Input
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                    required
                />

                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                />

                <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                />

                <Input
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                />

                <Button type="submit" loading={loading} fullWidth>
                    Sign Up
                </Button>

                <p className={styles.footer}>
                    Already have an account?{' '}
                    <Link to="/login" className={styles.link}>
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Register;
