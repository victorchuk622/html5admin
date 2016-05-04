var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//the server will periodically calculate all the scores and save into this table
module.exports = mongoose.model('Ranking', new Schema({
    "rank":Number,
    "team":String,
    "score":Number
}));