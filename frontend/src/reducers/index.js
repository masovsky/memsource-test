import { combineReducers } from 'redux';
import notifications from './notifications';

export default combineReducers({
    notifications,
});

export const getNotifications = (state) => state.notifications;
