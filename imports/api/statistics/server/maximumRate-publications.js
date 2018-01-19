import { Meteor } from 'meteor/meteor';

import MaximumRateStats from '../maximumRate';

Meteor.publish('maximumRate', function() {
    return MaximumRateStats.find();
})