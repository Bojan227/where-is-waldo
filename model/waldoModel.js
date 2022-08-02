const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectionString = process.env.MONGO_KEY;

const client = new MongoClient(connectionString, { useUnifiedTopology: true });

module.exports = client;
