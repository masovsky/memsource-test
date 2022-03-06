import PropTypes from 'prop-types';

const {
    shape,
    arrayOf,
    string,
} = PropTypes;

export const notificationType = shape({
    id: string,
    type: string,
    text: string,
});

export const notificationsType = arrayOf(notificationType);
