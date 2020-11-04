const MongoClient = require('mongodb').MongoClient;
const { MONGO_CONNECTION_STRING } = require('./config');

let db;
async function init() {
  const client = await MongoClient.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true
  });
  db = client.db('rest');
  return db;
}

function getDB() {
  return db;
}

module.exports = { getDB, init };
