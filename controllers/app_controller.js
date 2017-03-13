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

            Article.insertMany(result, { ordered: false }, function (err, doc) {
                // Article.insertMany({ title: "Testing new title", link: "localhost:4040"}, function (err, doc) {
                // console.log(result);
                if (err) {
                    console.log(err);
                    console.log(doc);
                    res.send("No new articles");
                }
                else {
                    console.log(err);
                    console.log(doc);
                    res.json(doc);
                }
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
        console.log(req.body.id);
        // var newArticleId = new Article(req.body.id);

        Article.update({ _id: req.body.id }, { $set: { saved: true } }, function (err, doc) {
            if (err) throw err;
            console.log(doc);
            res.json(doc);
        });
        // console.log();
        // console.log(newArticle);
    });

    app.post('/deleteArticle', function (req, res) {
        // do the things
        console.log(req.body.id);

        Article.remove({ _id: req.body.id }, function(err, doc) {
            if (err) {
                console.log(err);
                res.send("Error");
            }
            else {
                console.log(doc);
                res.json(doc);
            }
        });
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
        // console.log("RENDERING PAGE");
        // console.log(doc[0]);
        res.render('index', { article: doc })
    });
}