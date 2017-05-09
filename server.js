'use strict';

var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var PORT = process.env.PORT || 3000;

// Set mongoose to leverage buitl in javaScript ES6 Promises
mongoose.Promise = Promise;

var app = express();

mongoose.connect('mongodb://localhost/l948hr7l47kp0aqopjtvfmluh4');
// mongoose.connect('mongodb://heroku_98p88b8p:l948hr7l47kp0aqopjtvfmluh4@ds127300.mlab.com:27300/heroku_98p88b8p');

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var db = mongoose.connection;

db.on("error", function(error) {
    throw error;
});

db.once("open", function() {
    console.log("Mongoose connection successful");
});

require('./controllers/app_controller.js')(app);

app.listen(PORT, function() {
    console.log("App is listening on port " + PORT);
});