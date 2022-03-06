import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notificationType } from '../../types';
import { hideNotification } from '../../actions/notifications';
import './_styles_/Notification.css';

Notification.propTypes = {
    outerClass: PropTypes.string.isRequired,
    buttonClass: PropTypes.string.isRequired,
    notification: notificationType.isRequired,
};

function Notification(props) {
    const {
        outerClass,
        buttonClass,
        notification,
    } = props;
    const dispatch = useDispatch();
    const onClose = () => dispatch(hideNotification(notification.id));
    return (
        <div className={`notification ${outerClass}`}>
            <span>{notification.text}</span>
            <button type="button" className={`button-small ${buttonClass}`} onClick={onClose}>
                <span aria-label="Close" role="img"><FontAwesomeIcon icon="times" /></span>
            </button>
        </div>
    );
}

export default Notification;
