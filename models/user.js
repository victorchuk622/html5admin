var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    id:{type: String, required: true},
    nickname: String,
    fullname: String,
    password: String,
    admin: {type: Boolean, required: true, default: false}
}));