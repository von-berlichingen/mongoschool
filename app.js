var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {
  assert.equal(err, null);
  console.log('Successfully connected to server');

  // find some documents
  // db.collection('movies').find({}).toArray(function(err, docs) {
  //
  //   // title of each document
  //   docs.forEach(function(doc) {
  //     console.log(doc.title);
  //   });
  //
  //   db.close();
  // });

  db.collection('movies').find({}, function(err, docs) {

    // title of each document

    docs.forEach(function(doc) {
      console.log(doc);
    })

    db.close();
  });

  console.log('Called find()');
});
