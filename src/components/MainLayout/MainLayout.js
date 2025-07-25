
import React from 'react';
import './MainLayout.css';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            {/* <NavMenu /> */}
            <div className="content">
                {children}
            </div>
            <footer>
            </footer>
        </div>
    );
};

export default MainLayout;
