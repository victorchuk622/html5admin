var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Submitted_Assignment', new Schema({
    assignmentID: {type: String, required: true},
    userID: {type: String, required: true},
    score: Number,
    ans: [{
        questionNo:{type: String, required: true},
        answer:{type: String, required: true},
    }]
}));