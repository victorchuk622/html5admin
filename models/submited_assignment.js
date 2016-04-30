var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Submitted_Assignment', new Schema({
    id: {type: String, required: true},
    userID: {type: String, required: true}



}));