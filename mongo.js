var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://reactorUser:reactor123@ds031167.mlab.com:31167/reactor'

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});