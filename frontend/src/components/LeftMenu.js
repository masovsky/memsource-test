import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuItem from './MenuItem';
import './__styles__/LeftMenu.css';
import logo from '../assets/logo-light.svg';
import { NavLink } from 'react-router-dom';

function LeftMenu() {
    return (
        <div className="left-menu">
            <div className="logo-container">
                <NavLink to="/">
                    <img src={logo} alt="MEMSOURCE" />
                </NavLink>
            </div>
            <MenuItem to="/settings" className="left-menu--item">
                <FontAwesomeIcon icon="cog" className="left-menu--item--icon" />
                <span className="left-menu--item--text">Settings</span>
            </MenuItem>
            <MenuItem to="/projects" className="left-menu--item">
                <FontAwesomeIcon icon="list" className="left-menu--item--icon" />
                <div className="left-menu--item--text">Projects</div>
            </MenuItem>
        </div>
    );
}

export default LeftMenu;
