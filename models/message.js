var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Message', new Schema({
    //msgID: String,
    //title: String,
    //date: Date,  //date of creation
    senderID: String,
    receiverID: String,
    content: String
}));