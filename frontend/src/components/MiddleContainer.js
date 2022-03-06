import React from 'react';
import './__styles__/MiddleContainer.css';
import MainContent from './MainContent';
import LeftMenu from './LeftMenu';

function MiddleContainer() {
    return (
        <div className="middle-container">
            <div className="middle-container--box">
                <LeftMenu />
                <MainContent />
            </div>
        </div>
    );
}

export default MiddleContainer;
