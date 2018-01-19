import { Meteor } from 'meteor/meteor';

import CryptoValueHistory from '../history';

Meteor.publish('cryptoHistory', function() {
        return CryptoValueHistory.find();
   }
);