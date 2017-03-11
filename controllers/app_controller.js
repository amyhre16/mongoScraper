'use strict';

var cheerio = require('cheerio');
var request = require('request');

var Note = require('./../models/Notes.js');
var Article = require('./../models/Articles.js');


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index');
    }); // end of app.get('/')

    app.get('/scrapedArticles', function(req, res) {
        var result = [];

        request("http://www.bleacherreport.com", function(err, response, html) {
            if (err) throw err;

            var $ = cheerio.load(html);


            $('li.articleSummary').each(function(i, element) {
                var title = $(element).children('.articleContent').children('a').children('h3').children('.title').text();

                var link = $(element).children('.articleContent').children('a').attr('href');

                result.push({
                    title: title,
                    link: link
                });
            }); // end of .each()
            console.log(result);
        }); // end of request
    }); // end of app.get('/scrapedArticles')

    app.get('/savedArticles', function(req, res) {
        // do the things
    });

    app.get('/articleNotes', function(req, res) {
        // do the things
    });

    app.post('/saveArticle', function(req, res) {
        // do the things
    });
    
    app.post('/deleteArticle', function(req, res) {
        // do the things
    });

    app.post('/addNote', function(req, res) {
        // do the things
    });

    app.post('/deleteNote', function(req, res) {
        // do the things
    });
};