var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Message', new Schema({
    userA: String,
    userB: String,
    update:{ type: Date },
    conversation: [{senderID: String, content: String, date: { type: Date }}]
}));