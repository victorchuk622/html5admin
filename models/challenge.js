var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Challenge', new Schema({
    //recordID  default _id
    //questionID: String,  //questions _id
    //score: Number,
    questionID: { type: Number, default: 1},
    teamID: String,
    teamName: String,
    round: Number,
    info: String,
    date: { type: Date, default: Date.now },
    content: [{
        question: {type: String, required: true},
        questionNo: {type: Number, required: true},
        qType: {type: String, required: true, enum: ['mc', 'oc', 'fitb']},
        ans: [{
            content: {type: String, required: true},
            correct: {type: Boolean, required: true, default:false}
        }],
    }]
}));