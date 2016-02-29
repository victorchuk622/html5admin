var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('News', new Schema({
    title: String,
    content: String,
    create: { type: Date, default: Date.now },
    publish: Date,
    expire: Date,
    author: String,
}));