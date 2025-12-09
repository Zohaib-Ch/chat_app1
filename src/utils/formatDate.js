import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatMessageTime = (date) => {
    if (!date) return '';
    const messageDate = new Date(date);
    return format(messageDate, 'HH:mm');
};

export const formatChatTime = (date) => {
    if (!date) return '';
    const chatDate = new Date(date);

    if (isToday(chatDate)) {
        return format(chatDate, 'HH:mm');
    }

    if (isYesterday(chatDate)) {
        return 'Yesterday';
    }

    return format(chatDate, 'MMM d');
};

export const formatRelativeTime = (date) => {
    if (!date) return '';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
};
