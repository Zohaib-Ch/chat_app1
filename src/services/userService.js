import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

export const userService = {
    async getUsers() {
        const response = await api.get(API_ENDPOINTS.USERS.GET_ALL);
        return response.data;
    },

    async getCurrentUser() {
        const response = await api.get(API_ENDPOINTS.USERS.GET_ME);
        return response.data;
    }
};
