/**
 * Created by reinz on 2/5/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Submited_Challenge', new Schema({
    //recordID  default _id
    challengeID: String,  //questions _id
    teamID: String,
    score: Number,
    result: [Number],
    ans: [{
        question_number:{type: Number, required: true},
        answer:{type: String, required: true},
    }],
    date: { type: Date, default: Date.now() }
}));