'use strict';

var cheerio = require('cheerio');
var request = require('request');

var Note = require('./../models/Notes.js');
var Article = require('./../models/Articles.js');


module.exports = function (app) {
    app.get('/', function (req, res) {
        var doc = unsavedArticles(res);
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

                // var isNewArticle = true;

                // check database to see if title already exists, if it does, set isNewArticle to true
                Article.find({ title: title }, function (err, doc) {
                    if (err) throw err;
                    // console.log(doc.length);
                    if (doc.length === 0) {
                        // isNewArticle = false;
                        saveArticle({ title: title, link: link });
                        result.push({
                            title: title,
                            link: link
                        });
                        // console.log("LINE 45");
                        // console.log(result);
                    }
                });

                // if (isNewArticle) {
                // }
            }); // end of .each()
            
            process.nextTick(() => {
                // Article.insertMany(result, function (err, doc) {
                    console.log(result);
                    res.json(result);
                // });
            });
        }); // end of request
    }); // end of app.get('/scrapedArticles')

    app.get('/savedArticles', function (req, res) {
        // do the things
        Article.find({saved: true}, function (err, doc) {
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
        var newArticle = new Article(req.body);

        newArticle.save(function (err, doc) {
            if (err) throw err;
            res.json(doc);
        });
        console.log();
        console.log(newArticle);
        // console.log(req.body);
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
    var result;
    Article.find({ saved: false }, function (err, doc) {
        if (err) throw err;

        res.render('index', { article: doc })
        // result = doc;
    });
}