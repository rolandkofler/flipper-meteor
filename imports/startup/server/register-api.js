import '../../api/history/history-service';
import '../../api/history/server/history-publications';
import '../../api/statistics/server/maximumRate-publications';
import MaximumRateStats from '../../api/statistics/maximumRate';


Meteor.startup(() => {
    // code to run on server at startup
    const maximumRateItem = MaximumRateStats.findOne();
    const currentMaximumRate = maximumRateItem && maximumRateItem.maximumRate || 0;
    const data = JSON.parse(Assets.getText('highestRecordedData.json'));
    if(data.maximumRate > currentMaximumRate) {
        MaximumRateStats.remove({});
        MaximumRateStats.insert(data);
    }
});
  