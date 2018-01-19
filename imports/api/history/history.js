import { Mongo } from 'meteor/mongo';

class CryptoValueHistoryCollection extends Mongo.Collection {
  insert(stats) {
    return super.insert(stats);
  }

  update(selector, modifier) {
    return super.update(selector, modifier);
  }

  remove(stats) {
    return super.remove(stats);
  }
    
}
  
  
const CryptoValueHistory = new CryptoValueHistoryCollection('cryptovaluehistory');
export default CryptoValueHistory;