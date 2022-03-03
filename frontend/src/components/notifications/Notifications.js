import React from 'react';
import { useSelector } from 'react-redux';
import './_styles_/Notifications.css';
import InfoNotification from './InfoNotification';
import ErrorNotification from './ErrorNotification';
import NotificationTypes from '../../utils/NotificationTypes';
import { getNotifications } from '../../reducers';

function Notifications() {
    const notifications = useSelector(getNotifications);
    return (
        <div className="notifications">
            {notifications.length > 0 && notifications.map((notification) => {
                let result = null;
                if (notification.type === NotificationTypes.INFO) {
                    result = <InfoNotification key={notification.id} notification={notification} />;
                } else if (notification.type === NotificationTypes.ERROR) {
                    result = <ErrorNotification key={notification.id} notification={notification} />;
                }
                return result;
            })}
        </div>
    );
}

export default Notifications;
