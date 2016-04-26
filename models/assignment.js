var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Assignment', new Schema({
    //recordID  default _id
    title: {type: String, required: true},
    create: { type: Date, required: true},
    deadline: { type: Date, required: true},
    content: [{qType: {type: String, required: true},
        ans: [{type: String, required: true}],
        question: {type: String, required: true}}],
}));