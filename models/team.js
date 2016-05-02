/**
 * Created by reinz on 2/5/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Team', new Schema({
    //recordID  default _id
    //teamID: String,
    teamName: String,
    //teamIcon: Blob,
    teamMember:[{type: String, required: true}]
}));