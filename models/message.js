var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Message', new Schema({
    userA: String,
    userB: String,
    conversation: [{senderID: String, content: String, date: { type: Date, default: Date.now }}]
}));