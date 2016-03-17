var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Challenge', new Schema({
    //recordID  default _id
    questionID: String,  //questions _id
    teamID: String,
    score: Number,
    date: { type: Date, default: Date.now }
}));