/**
 * Created by reinz on 2/5/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Team', new Schema({
    teamName: String,
    teamMember:[{type: String, required: true}],
    //teamID: String,
    //recordID  default _id
    //teamIcon: Blob,
}));