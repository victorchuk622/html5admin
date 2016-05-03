var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Challenge', new Schema({
    //recordID  default _id
    //questionID: String,  //questions _id
    //score: Number,
    teamID: String,
    teamName: String,
    date: { type: Date, default: Date.now },
    content: [{
        question: {type: String, required: true, enum: ['mc', 'oc', 'fitb']},
        questionNo: {type: Number, required: true},
        qType: {type: String, required: true},
        ans: [{
            content: {type: String, required: true},
            correct: {type: Boolean, required: true, default:false}
        }],
    }],
}));