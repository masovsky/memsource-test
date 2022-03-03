import React from 'react';
import Notifications from './notifications/Notifications';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-light.svg'

function App() {
    return (
        <div>
            <Notifications />
            <NavLink to="/">
                <img src={logo} alt="MEMSOURCE" />
            </NavLink>
        </div>
    )
}

export default App;