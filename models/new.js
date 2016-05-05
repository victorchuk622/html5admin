var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('New', new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    create: { type: Date, required: true, default:Date.now()},
    publish: { type: Date, },
    expire: { type: Date, },
    author: {type: String, required: true},
}));