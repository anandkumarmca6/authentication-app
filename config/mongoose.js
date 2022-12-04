const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://mongo:oBEyGEf18lih2Gnvjvnw@containers-us-west-144.railway.app:6564'
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the mongodb'));

db.once('open', function () {
  console.log('connected to database');
});

module.exports = db;
