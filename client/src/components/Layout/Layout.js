import React from 'react';
import PropTypes from 'prop-types';

import HeaderBar from '../HeaderBar';
import './styles.css';

const Layout = ({ children }) => (
    <div className="appContentWrapper">
        <div className="appHeader">
            <HeaderBar />
        </div>
        <div className="appContent">{children}</div>
        {/* And a footer here, but not on the login route... */}
        <p className="footer"> © 2017 Boomtown Corp. All Rights Reserved</p>
    </div>
);

Layout.defaultProps = {
    children: null
};

Layout.propTypes = {
    children: PropTypes.node
};

export default Layout;
