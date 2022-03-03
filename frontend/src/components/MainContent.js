import React from 'react';
import './__styles__/MainContent.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import Projects from './Projects'
import Settings from './Settings'

function MainContent() {
    return (
        <div className="main-content">
            <Switch>
                <Redirect from="/" to="/projects" exact />
                <Route
                    path="/projects"
                    component={Projects}
                />
                <Route
                    path="/settings"
                    component={Settings}
                />
            </Switch>
        </div>
    );
}

export default MainContent;
