export const API_BASE_URL = 'http://localhost:5000';
export const SOCKET_URL = 'ws://localhost:5000';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register'
    },
    CHATS: {
        GET_ALL: '/api/chats/',
        CREATE: '/api/chats/create',
        GET_MESSAGES: (chatId) => `/api/chats/${chatId}/messages`
    },
    USERS: {
        GET_ALL: '/api/users/',
        GET_ME: '/api/users/me'
    },
    HEALTH: '/api/health'
};

export const TOKEN_KEY = 'chat_app_token';
export const USER_KEY = 'chat_app_user';

export const MESSAGE_LIMIT = 50;
