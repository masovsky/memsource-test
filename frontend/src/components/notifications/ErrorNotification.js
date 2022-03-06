import React from 'react';
import './_styles_/ErrorNotification.css';
import { notificationType } from '../../types';
import Notification from './Notification';

ErrorNotification.propTypes = {
    notification: notificationType.isRequired,
};

function ErrorNotification(props) {
    const { notification } = props;
    return (
        <Notification outerClass="error-notification" buttonClass="button-white-text" notification={notification} />
    );
}

export default ErrorNotification;
