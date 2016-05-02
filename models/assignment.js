var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Assignment', new Schema({
    //recordID  default _id
    id: {type: String, required: true},
    title: {type: String, required: true},
    create: {type: Date, required: true},
    deadline: {type: Date, required: true},
    info: {type: String, required: true},
    content: [{
        question: {type: String, required: true, enum: ['mc', 'oc', 'fitb']},
        questionNo: {type: Number, required: true},
        qType: {type: String, required: true},
        ans: [{
            content: {type: String, required: true},
            correct: {type: Boolean, required: true}
        }],
    }],
}));