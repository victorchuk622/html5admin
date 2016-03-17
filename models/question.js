var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Question', new Schema({
    //questionID default _id
    scope: {type: String, enum: ['CH4', 'CH8', 'CH12']},
    title: String,
    content: [{qType: String, ans: String, question: String}], 
    challengeRecords: [{type: String}]     //challenges _id
}));