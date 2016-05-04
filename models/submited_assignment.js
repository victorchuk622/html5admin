var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Submitted_Assignment', new Schema({
    assignmentID: {type: String, required: true},
    userID: {type: String, required: true},
    score: Number,
    full: Number,
    result:[Number],
    ans: [{
        questionNo:{type: Number, required: true},
        answer:{type: String, required: true},
    }]
}));