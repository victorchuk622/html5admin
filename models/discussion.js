/**
 * Created by reinz on 28/4/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('discussion', new Schema({
    questionID: String, //the ID of the question set in Arena
    reply: [{userID: String, content: String, date: Date}]
}));