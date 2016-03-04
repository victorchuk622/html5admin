var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('News', new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    create: { type: Date, required: true},
    publish: { type: Date, required: true},
    expire: { type: Date, required: true},
    author: {type: String, required: true},
}));