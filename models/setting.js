/**
 * Created by KOTORI on 2/5/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Config', new Schema({
    currentRound: {type: Integer, required: true},
    teamMemberLimit:{type: Integer, required: true},



}));