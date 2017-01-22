var express = require('express');
var engines = require('consolidate');
var bodyParser = require('body-parser');

var app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(errorHandler);

app.get('/', function(req, res, next) {
    res.render('index', { 'fruits' : [ 'apple', 'orange', 'banana', 'peach' ] });
});

app.post('/favorite_fruit', function(req, res, next) {
    var favorite = req.body.fruit;
    if (typeof favorite == 'undefined') {
        next('Please choose a fruit!');
    }
    else {
        res.send("Your favorite fruit is " + favorite);
    }
});

var server = app.listen(8000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});

/////////////////////

// Handler for internal server errors
function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', { error: err });
}
