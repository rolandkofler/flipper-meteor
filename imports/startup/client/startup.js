import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';


import App from '../../ui/App.jsx';

// Import styles
import 'normalize.css/normalize.css';
import '../../ui/styles/main.scss';


Meteor.startup(() => {
    render(<App />, document.getElementById('app'));
});