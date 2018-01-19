import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { withTracker } from 'meteor/react-meteor-data';

import { BUTERIN, KOEPPELMANN } from '../../lib/variables';

import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage';

class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="container">
                <Navbar />
                <LandingPage />
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        test: 'prop'
    };
})(App);