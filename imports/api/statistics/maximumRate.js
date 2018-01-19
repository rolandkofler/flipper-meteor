import { Mongo } from 'meteor/mongo';

class MaximumRateCollection extends Mongo.Collection {
    insert(data) {
        return super.insert(data);
    }

    update(selector, modifier) {
        return super.update(selector, modifier);
    }

    remove(data) {
        return super.remove(data);
    }
}
  
  
const MaximumRateStats = new MaximumRateCollection('maximumrate');
export default MaximumRateStats;