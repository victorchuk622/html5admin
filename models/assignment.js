var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Assignment', new Schema({
    //recordID  default _id
    id: String,
    title: {type: String, required: true},
    create: {type: Date, required: true , default:Date.now()},
    deadline: {type: Date, required: true},
    info: {type: String, required: true},
    submit: Number,
    content: [{
        question: {type: String, required: true},
        questionNo: {type: Number, required: true},
        qType: {type: String, required: true , enum: ['mc', 'oc', 'fitb']},
        ans: [{
            content: {type: String, required: true},
            correct: {type: Boolean, required: true, default:false}
        }],
    }],
}));