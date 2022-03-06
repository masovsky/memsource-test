import uuid from 'uuid';
import NotificationTypes from '../utils/NotificationTypes';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const showInfoNotification = (text) => showNotification(text, NotificationTypes.INFO);
export const showErrorNotification = (text) => showNotification(text, NotificationTypes.ERROR);
export const showNotification = (text, type) => {
    const id = uuid.v4();
    return {
        type: SHOW_NOTIFICATION,
        payload: {
            id,
            text,
            type,
        },
    };
};

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
export const hideNotification = (id) => ({
    type: HIDE_NOTIFICATION,
    payload: id,
});

export const HIDE_INFO_NOTIFICATIONS = 'HIDE_INFO_NOTIFICATIONS';
export const hideInfoNotifications = () => ({
    type: HIDE_INFO_NOTIFICATIONS,
});
