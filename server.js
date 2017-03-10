'use strict';

var express = require('express');
var exphb = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');

// get rid of this later

var app = express();

// mongoose.connect('MONGODB_URI: mongodb://heroku_98p88b8p:l948hr7l47kp0aqopjtvfmluh4');

var Schema = mongoose.Schema;

var databaseURL = "mongoScraper";
var collections = ["scraperData"];
var db = 

request("http://www.bleacherreport.com", function(err, response, html) {
    if (err) throw err;

    var $ = cheerio.load(html);

    var result = [];

    $('li.articleSummary').each(function(i, element) {
        var title = $(element).children('.articleContent').children('a').children('h3').children('.title').text();

        var link = $(element).children('.articleContent').children('a').attr('href');


        result.push({
            title: title,
            link: link
        });
    });
        console.log(result);
        console.log(result.length);
});

app.listen(3000, function() {
    console.log("App is listening on port 3000");
});