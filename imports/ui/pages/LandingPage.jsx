import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { withTracker } from 'meteor/react-meteor-data';

import FlipperMainInfo from '../components/FlipperMainInfo/FlipperMainInfo';
import FlippingDolphin from '../components/FlippingDolphin/FlippingDolphin';
import BreakEvenMetrics from '../components/BreakEvenMetrics/BreakEvenMetrics';

import CryptoValueHistory from '../../api/history/history';
import MaximumRateStats from '../../api/statistics/maximumRate';

class LandingPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        console.log(this.props.cryptoHistory);
    }

    render() {
        if(!(this.props.maxRateReady && this.props.historyReady && this.props.cryptoHistory.length)) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="alert alert-secondary" role="alert">Waiting for data...</div>
                    <div style={{ animation: 'spin 10s linear infinite', transformOrigin: 'bottom center', width: '30%' }}>
                        <FlippingDolphin />
                    </div>
                </div>
            );
        }
        return (
            <div className="">
                <FlipperMainInfo maxRateItem={this.props.maxRateItem} latestCryptoVal={this.props.cryptoHistory[0]} />
                <div className="row">
                    <FlippingDolphin />
                    <BreakEvenMetrics latestCryptoVal={this.props.cryptoHistory[0]} />
                </div>
            </div>
        )
    }
}

export default withTracker((props) => {
    const historySub = Meteor.subscribe('cryptoHistory');
    const maxRateSub = Meteor.subscribe('maximumRate');
    
    return {
        ...props,
        cryptoHistory: CryptoValueHistory.find({}, { sort: { timestamp: -1 } }).fetch(),
        historyReady: historySub.ready(),
        maxRateItem: MaximumRateStats.findOne() || { maxRate: 0, maximumRateTimestamp: Date.now() },
        maxRateReady: maxRateSub.ready(),
    }
})(LandingPage);