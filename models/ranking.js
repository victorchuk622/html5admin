var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//the server will periodically calculate all the scores and save into this table
module.exports = mongoose.model('Ranking', new Schema({
    scope: {type: String, enum: ['CH1-3', 'CH4-6', 'CH7-9', 'CH10-12', 'Overall']},
    ranking:[{score: Number, teamID: String, teamName: String}]  //rank[0][0] score, [0][1] teamID
}));