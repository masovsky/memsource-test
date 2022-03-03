import React from 'react';
import './_styles_/InfoNotification.css';
import { notificationType } from '../../types';
import Notification from './Notification';

InfoNotification.propTypes = {
    notification: notificationType.isRequired,
};

function InfoNotification(props) {
    const { notification } = props;
    return (
        <Notification outerClass="info-notification" buttonClass="button-primary-text" notification={notification} />
    );
}

export default InfoNotification;
