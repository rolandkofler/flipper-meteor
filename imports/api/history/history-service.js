import { Meteor } from 'meteor/meteor';
import { HTTP as httpClient } from 'meteor/http'
import { SyncedCron } from 'meteor/percolate:synced-cron';
import moment from 'moment';

import CryptoValueHistory from './history';
import MaximumRateStats from './../statistics/maximumRate';

import { BUTERIN, KOEPPELMANN, ERRORMARGIN } from '../../../lib/variables';

const url = "https://api.coinmarketcap.com/v1/ticker/?limit=5";

let last_updated_BTC;
let last_updated_ETH;


SyncedCron.add({
    name: 'Fetch new crypto data',
    schedule (parser) {
        return parser.text('every 5 mins');
    },
    job () {
        return poller();
    },
});
  
SyncedCron.start();

function equalsWithMarginOfError(actual, expected, error){
    const diff = actual - expected;
    console.log("Equals with Error: ", actual, expected, diff, error);
    return Math.abs(diff) < error;
}

async function poller() {
    const apiResponse = await httpClient.get(url);
    const apiData = apiResponse.data;
    try {
        if(!apiData) { throw new Meteor.Error(404, 'Data not found'); }
        writeData(apiData);
    } catch (e){
        console.log("Write data exeption ", e);
    }
}

function writeData(data) {
    const stats= {};
    const btc = (data).filter((i,n) => i.id==="bitcoin")[0];
    const eth = (data).filter((i,n) => i.id==="ethereum")[0];
    // just trigger it the first time
    if (!last_updated_BTC) last_updated_BTC = parseFloat(btc.market_cap_usd) + ERRORMARGIN;
    if (!last_updated_ETH) last_updated_ETH = parseFloat(eth.market_cap_usd);
    
    console.log('Last updated: ', last_updated_BTC, last_updated_ETH);
    console.log('Current data: ', btc.market_cap_usd, eth.market_cap_usd);

    if(!equalsWithMarginOfError(last_updated_ETH/last_updated_BTC, eth.market_cap_usd/btc.market_cap_usd, ERRORMARGIN)){
        stats.btc_marcap = Number(btc.market_cap_usd);
        stats.eth_marcap = Number(eth.market_cap_usd);
        stats.btc_24h_volume_usd = Number(btc["24h_volume_usd"]);
        stats.eth_24h_volume_usd = Number(eth["24h_volume_usd"]);
        stats.btc_price = Number(btc.price_usd);
        stats.eth_price = Number(eth.price_usd);
        stats.ethbtc_price = Number(eth.price_btc);
        stats.koeppel_diff_btc = stats.ethbtc_price - KOEPPELMANN;
        stats.buterin_diff_btc = stats.ethbtc_price - BUTERIN;
        stats.btc_supply = Number(btc.available_supply);
        stats.eth_supply = Number(eth.available_supply);
        stats.btc_breakevenprice = stats.eth_marcap/stats.btc_supply;
        stats.eth_breakevenprice = stats.btc_marcap/stats.eth_supply;
        stats.ethbtc = stats.eth_marcap / stats.btc_marcap;
        stats.timestamp = Date.now();
        // TO DO Rewrite check for maxRate
        // statisticsRef.once('value').then(function(snapshot) {
        //     maximumRate = snapshot.val().maximumRate || 0;
        //     console.log("update",maximumRate, stats.ethbtc);
        //     if (maximumRate < stats.ethbtc) {
        //         statisticsRef.set(
        //         {
        //         'maximumRateTimestamp' : admin.database.ServerValue.TIMESTAMP,
        //         'maximumRate': stats.ethbtc
        //         }
        //         );
        //     }
        // });
        checkMaximumRate(stats.ethbtc);
        last_updated_BTC = parseFloat(btc.market_cap_usd);
        last_updated_ETH = parseFloat(eth.market_cap_usd);
        // console.log("history will be added", stats);
        CryptoValueHistory.insert(stats, removeOldFromHistory);
    } else {
        console.log("data from API hasn't changed");
    }
}

function removeOldFromHistory(insertError, newDocId) {
    if(insertError) {
        throw insertError;
    }
    const now = Date.now();
    const cutoff = now - 30 * 24 * 60 * 60 * 1000;
    // var old = historyRef.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
    // var listener = old.on('child_added', function(snapshot) {
    //     snapshot.ref.remove().then(function() {
    //     console.log("Remove succeeded.")
    //   })
    //   .catch(function(error) {
    //     console.log("Remove failed: " + error.message)
    //   });
    // });
    console.log('To delete: ', CryptoValueHistory.find({ timestamp: { $lt: cutoff} }).fetch());
    CryptoValueHistory.remove({ timestamp: { $lt: cutoff} });
}
async function checkMaximumRate(ethbtc) {
    const maximumRateItem = await MaximumRateStats.findOne();
    const maximumRate = maximumRateItem && maximumRateItem.maximumRate || 0;
    console.log('Max rate', maximumRate, ethbtc, maximumRateItem);
    if(maximumRate < ethbtc) {
        await MaximumRateStats.remove({});
        await MaximumRateStats.insert({
            'maximumRateTimestamp' : Date.now(),
            'maximumRate': ethbtc
        })
    }
}