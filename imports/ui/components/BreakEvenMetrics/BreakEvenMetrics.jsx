import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { withTracker } from 'meteor/react-meteor-data';

import { roundPc, round2, formatNumbers } from '../../../../lib/round-data';
import { KOEPPELMANN, BUTERIN } from '../../../../lib/variables';


export default class BreakEvenMetrics extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const ehtbtc_24vol = roundPc(this.props.latestCryptoVal.eth_24h_volume_usd / this.props.latestCryptoVal.btc_24h_volume_usd);
        const avg_marcap = (this.props.latestCryptoVal.btc_marcap + this.props.latestCryptoVal.eth_marcap) / 2;
        return (
            <div id="breakeven-container" className="col-sm">
                <div className="card">
                    <div className="card-header"><h4>Break Even Metrics</h4></div>
                    <ul id="breakeven" className="list-group list-group-flush">
                        <li className="list-group-item ">
                            <h4>
                                <strong>{ehtbtc_24vol}%</strong> ETH/BTC 24h Volume
                            </h4>
                            <p className="small text-muted">
                                Ratio of USD trading volumes vol24h(ETH) / vol24h(BTC) = {`${this.props.latestCryptoVal.eth_24h_volume_usd} / ${this.props.latestCryptoVal.btc_24h_volume_usd}`}
                            </p>
                        </li>
                        <li className="list-group-item ">
                            <h4>{round2(this.props.latestCryptoVal.ethbtc_price)} &#8658; <strong>{round2(this.props.latestCryptoVal.btc_supply/this.props.latestCryptoVal.eth_supply)} ETH/BTC</strong></h4>
                            <p className="small text-muted">
                                <strong>If the price of one Eth reaches the price of {roundPc(this.props.latestCryptoVal.btc_supply/this.props.latestCryptoVal.eth_supply)}% of one Bitcoin it flippened</strong> (suggested by <a href="https://www.reddit.com/user/rath4t">u/rath4t</a>). Breakeven price(ETH/BTC) ≝ supply(BTC) / supply(ETH)
                            </p>
                        </li>
                        <li className="list-group-item ">
                            <h4>ETH <strong>{this.props.latestCryptoVal.eth_price}</strong> &#8658; <strong>{Math.round(this.props.latestCryptoVal.eth_breakevenprice)} USD</strong></h4>
                            <p className="small text-muted">
                                to reach Bitcoin marketcap. breakeven(ETH) ≝ marcap(BTC) / supply(ETH) = {`${formatNumbers(this.props.latestCryptoVal.btc_marcap)} / ${formatNumbers(this.props.latestCryptoVal.eth_supply)}`}
                            </p>
                        </li>
                        <li className="list-group-item ">
                            <h4>BTC <strong>{this.props.latestCryptoVal.btc_price} </strong> &#8658; <strong>{Math.round(this.props.latestCryptoVal.btc_breakevenprice)} USD</strong></h4>
                            <p className="small text-muted">
                                to reach Ether marketcap. breakeven(BTC) ≝ marcap(ETH) / supply(BTC) = {`${formatNumbers(this.props.latestCryptoVal.eth_marcap)} / ${formatNumbers(this.props.latestCryptoVal.btc_supply)}`}
                            </p>
                        </li>
                        <li className="list-group-item ">
                            <h4>Equality: ETH <strong>{Math.round(avg_marcap/this.props.latestCryptoVal.eth_supply)}</strong>, BTC <strong>{Math.round(avg_marcap/this.props.latestCryptoVal.btc_supply)}</strong> USD</h4>
                            <p className="small text-muted">
                                for BTC and ETH to meet in the middle.  equalmarcap ≝ (marcap(ETH) + marcap(BTC)) / 2 = {formatNumbers(avg_marcap)} USD. equality(BTC) ≝ equalmarcap / supply(BTC). equality(ETH) ≝ equalmarcap / supply(ETH).
                            </p>
                        </li>
                        <li className="list-group-item ">
                            <h4>Δ Köppelmann <strong>{round2(this.props.latestCryptoVal.koeppel_diff_btc)} ETH/BTC</strong> ({roundPc(this.props.latestCryptoVal.ethbtc_price / KOEPPELMANN)}%)</h4>
                            <div className="small text-muted">
                                The Köppelmann Constant <strong>{KOEPPELMANN}</strong> is the ETH/BTC rate where <em>newly created coin supply</em> for Ether PoW mining yields the same value as <em>newly created coin supply</em> by Bitcoin mining (<a href="https://www.reddit.com/r/ethtrader/comments/609xse/watch_out_for_ethbtc_price_0058333_above_that/df56k66/">Source: Köppelmann, Reddit</a>).
                                Also, it is the ETH/BTC rate where Ether PoW expends more economic resources on PoW than Bitcoin (source: <a href="https://www.reddit.com/r/ethereum/comments/60428n/is_ethereum_about_to_overtake_bitcoin_in_terms_of/df43u6t/">V. Buterin, Reddit</a>). Another definition wouldbe: the point where one network's security is subsidized by more monetary supply. Delta Köppelman = price(ETH/BTC) - {KOEPPELMANN}
                                <p><strong>Note currently not accounting for ice age blocktime increase!</strong></p>
                            </div>
                        </li>
                        <li className="list-group-item ">
                            <h4>Δ Buterin Equilibrium <strong>{round2(this.props.latestCryptoVal.buterin_diff_btc)} ETH/BTC</strong> ({roundPc(this.props.latestCryptoVal.ethbtc_price/BUTERIN)}%)</h4>
                            <div className="small text-muted">
                                <p><strong>Köppelmann constant adjusted for dynamic fees and ice age</strong> according to <a href="https://www.reddit.com/r/ethtrader/comments/685jqk/30_reached_this_is_gentlemen/dgw24cd/">suggestion by V. Buterin</a>, therefore we call it the Buterin Equilibrium, currently at {BUTERIN} ETH/BTC. </p>
                                <p><strong>SUBJECT TO CHANGE</strong> <a href="https://www.reddit.com/r/ethereum/comments/6cg54g/ethereum_is_now_for_the_first_time_the_blockchain/dhudlnp/">correction by u/PeenuttButler</a> Corrected currently manually. Last update 2017-05-21</p>
                            </div>
                        </li>
                        </ul>
                </div>
            </div>
        );
    }
}