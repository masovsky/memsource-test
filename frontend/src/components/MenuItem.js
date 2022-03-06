import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideInfoNotifications } from '../actions/notifications';

MenuItem.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
};

MenuItem.defaultProps = {
    className: null,
};

function MenuItem(props) {
    const {
        children,
        to,
        className,
    } = props;
    const dispatch = useDispatch();
    const onMenuClick = () => {
        dispatch(hideInfoNotifications());
        document.querySelector('.middle-container').scrollTo(0, 0);
    };
    return (
        <NavLink to={to} className={className} onClick={onMenuClick}>
            {children}
        </NavLink>
    );
}

export default MenuItem;
