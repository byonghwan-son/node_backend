const {MongoClient} = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/board?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000";

module.exports = function(callback) {
  return MongoClient.connect(uri, callback);
}