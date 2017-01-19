var express = require('express');
var engines = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {
  assert.equal(err, null);
  console.log('Successfully connected to server');

  app.get('/', function(req, res) {
    db.collection('movies').find({}).toArray(function(err, docs) {
      res.render('index', {'movies': docs});
    });
  });

  app.get('/:name', function(req, res) {
    var name = req.params.name;
    var val1 = req.query.val1;
    var val2 = req.query.val2;
    console.log(val1);

    res.render('index', {'name': name, 'val1': val1, 'val2': val2})
  })

  app.use(function(req, res) {
    res.sendStatus(404);
  });

  var server = app.listen(8000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
  });
 });
