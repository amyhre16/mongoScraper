'use strict';

var cheerio = require('cheerio');
var request = require('request');

var Note = require('./../models/Notes.js');
var Article = require('./../models/Articles.js');


module.exports = function (app) {
    app.get('/', function (req, res) {
        unsavedArticles(res);
        // res.render('index', {article: doc});
    }); // end of app.get('/')

    app.get('/scrapedArticles', function (req, res) {
        var result = [];

        request("http://www.bleacherreport.com", function (err, response, html) {
            if (err) throw err;

            var $ = cheerio.load(html);


            $('li.articleSummary').each(function (i, element) {
                // console.log(element);
                var title = $(element).children('.articleContent').children('a').children('h3').children('.title').text();

                var link = $(element).children('.articleContent').children('a').attr('href');

                result.push({
                    title: title,
                    link: link
                });
            }); // end of .each()

            Article.insertMany(result, function (err, doc) {
                // console.log(result);
                unsavedArticles(res);
            });
        }); // end of request
    }); // end of app.get('/scrapedArticles')

    app.get('/savedArticles', function (req, res) {
        // do the things
        Article.find({ saved: true }, function (err, doc) {
            console.log("DOCS");
            console.log(doc);
            res.render('savedArticles', { article: doc });
        });
    });

    app.get('/articleNotes', function (req, res) {
        // do the things
    });

    app.post('/saveNewArticle', function (req, res) {
        // do the things
        var newArticleId = new Article(req.body.id);

        newArticle.save(function (err, doc) {
            if (err) throw err;
            res.json(doc);
        });
        console.log();
        console.log(newArticle);
    });

    app.post('/deleteArticle', function (req, res) {
        // do the things
    });

    app.post('/addNote', function (req, res) {
        // do the things
    });

    app.post('/deleteNote', function (req, res) {
        // do the things
    });
};

function saveArticle(scrpaedArticle) {
    var newArticle = new Article(scrpaedArticle);

    newArticle.save(function (err, doc) {
        if (err) throw err;
        return doc;
    });
};

function unsavedArticles(res) {
    Article.find({ saved: false }, function (err, doc) {
        if (err) throw err;
        console.log("RENDERING PAGE");
        console.log(doc[0]);
        res.render('index', { article: doc })
    });
}