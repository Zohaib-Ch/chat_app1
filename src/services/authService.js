import api from './api';
import { API_ENDPOINTS, TOKEN_KEY, USER_KEY } from '../utils/constants';

export const authService = {
    async login(username, password) {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { username, password });
        if (response.data.token) {
            localStorage.setItem(TOKEN_KEY, response.data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async register(username, email, password) {
        const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { username, email, password });
        if (response.data.token) {
            localStorage.setItem(TOKEN_KEY, response.data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    getUser() {
        const user = localStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated() {
        return !!this.getToken();
    }
};
