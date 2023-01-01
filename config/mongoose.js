const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://authentication:authentication@cluster0.cjmdero.mongodb.net/?retryWrites=true&w=majority'
);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the mongodb'));

db.once('open', function () {
  console.log('connected to database');
});

module.exports = db;
