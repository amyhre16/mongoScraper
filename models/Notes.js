'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    note: {
        type: String,
        require: true
    }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;