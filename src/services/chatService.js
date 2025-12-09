import api from './api';
import { API_ENDPOINTS, MESSAGE_LIMIT } from '../utils/constants';

export const chatService = {
    async getChats() {
        const response = await api.get(API_ENDPOINTS.CHATS.GET_ALL);
        return response.data;
    },

    async createChat(participantId) {
        const response = await api.post(API_ENDPOINTS.CHATS.CREATE, { participantId });
        return response.data;
    },

    async getMessages(chatId, limit = MESSAGE_LIMIT, skip = 0) {
        const response = await api.get(
            `${API_ENDPOINTS.CHATS.GET_MESSAGES(chatId)}?limit=${limit}&skip=${skip}`
        );
        return response.data;
    }
};
