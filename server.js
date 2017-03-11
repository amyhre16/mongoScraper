'use strict';

var express = require('express');
var exphb = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');

// Set mongoose to leverage buitl in javaScript ES6 Promises
mongoose.Promise = Promise;

// get rid of this later
// var mongojs = require('mongojs');
var Note = require('./models/Notes.js');
var Article = require('./models/Articles.js');

var app = express();

mongoose.connect('mongodb://heroku_98p88b8p:l948hr7l47kp0aqopjtvfmluh4');

/*var Schema = mongoose.Schema;

var databaseURL = "mongoScraper";
var collections = ["scraperData"];*/
// var db = mongojs(databaseURL, collections);
var db = mongoose.connection;

db.on("error", function(error) {
    throw error;
});

db.once("open", function() {
    console.log("Mongoose connection successful");
});

request("http://www.bleacherreport.com", function(err, response, html) {
    if (err) throw err;

    var $ = cheerio.load(html);

    var result = [];

    $('li.articleSummary').each(function(i, element) {
        var title = $(element).children('.articleContent').children('a').children('h3').children('.title').text();

        var link = $(element).children('.articleContent').children('a').attr('href');

        db.scraperData.insert({
            title: title,
            link: link
        });
        /*result.push({
            title: title,
            link: link
        });*/
    });/*
        console.log(result);
        console.log(result.length);*/
});

app.listen(3000, function() {
    console.log("App is listening on port 3000");
});