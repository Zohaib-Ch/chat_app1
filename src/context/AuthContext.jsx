import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            const token = authService.getToken();
            const savedUser = authService.getUser();

            if (token && savedUser) {
                setUser(savedUser);
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username, password) => {
        const data = await authService.login(username, password);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
    };

    const register = async (username, email, password) => {
        const data = await authService.register(username, email, password);
        setUser(data.user);
        setIsAuthenticated(true);
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
