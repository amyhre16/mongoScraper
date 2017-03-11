'use strict';

var mongoose = require('mongoose');

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

var Article = ongoose.model("Article", ArticleSchema);

module.exports = Article;