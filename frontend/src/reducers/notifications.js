import NotificationTypes from '../utils/NotificationTypes';
import {
    HIDE_INFO_NOTIFICATIONS,
    HIDE_NOTIFICATION,
    SHOW_NOTIFICATION,
} from '../actions/notifications';

const notifications = (state = [], action = undefined) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return [...state, {
                ...action.payload,
            }];
        case HIDE_NOTIFICATION:
            return state.filter((notification) => notification.id !== action.payload);
        case HIDE_INFO_NOTIFICATIONS:
            return state.filter((notification) => notification.type !== NotificationTypes.INFO);
        default:
            return state;
    }
};

export default notifications;
