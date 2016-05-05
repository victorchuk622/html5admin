var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Challenge = require('../models/challenge');
var Team = require('../models/team');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');
var Ranking = require('../models/ranking');


//post
// --data "questionID=XXX&teamID=XXX&score=XXX"
router.get('/addChallenge/:teamID', (req, res) => {
    res.render('addChallenge',{teamID:req.params.teamID,token:req.query.token});
});


router.post('/addChallenge',(req, res) => {
    //var challenge = new Challenge(req.body.toJSON);
    //console.log(req.body);
    var challenge = new Challenge(req.body);

    challenge.round=1;

    console.log(req.body.teamID);

    Team.findOne({_id:req.body.teamID}).select('teamName').lean().exec().then((result)=>{
        console.log(result);
        challenge.teamName = result.teamName;
        challenge.save();
    });

    Challenge.findOne().sort('-questionID').lean().exec().then((result)=>{
        console.log(result);
        challenge.questionID += result.questionID;
        challenge.save();
    });

    res.json(req.body);

});
router.use(authUser);

router.get('/getChallenges/round/:round',(req, res) => {
    Challenge.find({round:req.params.round}).lean().exec().then((challenges)=>{
        challenges.forEach(function(challenge){
            challenge.done= false;

            var str = '';
            challenge.content.forEach(function (content) {
                str += content.qType + '$' + content.question + '$$';
                content.ans.forEach(function (ans) {
                    if (ans.correct)str += '*' + ans.content + '|';
                    else str += ans.content + '|';
                });
                str = str.slice(0, -1);
                str += '&';
            });
            str = str.slice(0, -1);
            challenge.content=str;
            challenge.questionID="Q00"+challenge.questionID; //add Q00 to questionID

        });
        res.json(challenges);
    });
});

router.get('/myTeam', (req, res) => {
    Team.findOne({teamMember:req.decoded.id}).lean().exec().then((result) =>{
        result.teamID = result._id;
        res.json(result);
    });
});

router.get('/progress', (req, res) => {
    res.json({
        "total":10,
        "finish":2
    });
});

router.get('/addChallenge/:teamID', (req, res) => {
    res.render('addChallenge',{teamID:req.params.teamID});
});


module.exports = router;
