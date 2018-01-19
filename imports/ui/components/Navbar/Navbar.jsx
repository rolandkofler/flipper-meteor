import React, { Component } from 'react';
import PropTypes from 'proptypes';

const Navbar = props => (
    <div className="header clearfix">
        <nav className="navbar justify-content-end">
          <ul className="nav nav-pills">
            <li className="nav-item" role="presentation"><a className="nav-link" href="https://reddit.com/u/malefizer" target="_blank">u/malefizer</a></li>
          </ul>
        </nav>
        <h3>
          <small className="text-muted">Watchening the Flippening Happening</small>
          </h3>
    </div>
);

export default Navbar;