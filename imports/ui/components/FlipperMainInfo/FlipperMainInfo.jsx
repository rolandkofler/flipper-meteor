import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { withTracker } from 'meteor/react-meteor-data';

import moment from 'moment';

import { roundPc, formatNumbers } from '../../../../lib/round-data';

export default class FlipperMainInfo extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props)
    }
    componentWillUnmount() {
        document.title = 'Flipper | Watchening Ethereum Flippening Happening';
    }
    render() {
        const ehtbtcpercent = Math.round(this.props.latestCryptoVal.ethbtc * 100);
        document.title = `${roundPc(this.props.latestCryptoVal.ethbtc)}% Flipper | Watchening Ethereum Flippening Happening`;

        return (
            <div id="main-content" className="jumbotron col-12">
                <h2><strong>Does it flip?</strong></h2>
                <p>Market capitalization of</p>
                <h2>ETH: <span className="text-right">{formatNumbers(this.props.latestCryptoVal.eth_marcap)}<span className="display_eth_marcap number"> </span> USD</span></h2>
                <h2>BTC: <span className="text-right">{formatNumbers(this.props.latestCryptoVal.btc_marcap)}<span className="display_btc_marcap number"> </span> USD</span></h2>

                <h1 className="ethbtbpercente">ETH/BTC <strong>~<span className="display_ethbtc_pc"> </span>{ehtbtcpercent}%</strong> </h1>
                <p className="text-muted">or more precisely {this.props.latestCryptoVal.ethbtc}</p>
                <p className="text-muted">
                    Maximum value recorded ~{roundPc(this.props.maxRateItem.maximumRate)}% the day of {moment.unix(this.props.maxRateItem.maximumRateTimestamp / 1000).format("YYYY-MM-DD")}
                </p>
                <p><small className="text-muted">Flippen.it, live data source: coinmarketcap.com</small></p>
                <p><small className="text-muted">thanks to u/keaukraine from <a href="http://cryptofees.net">cryptofees.net</a></small></p>
            </div>
        );
    }
}