var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Challenge = require('../models/challenge');
var Team = require('../models/team');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');
var Ranking = require('../models/ranking');
var SubmitedChallenge = require('../models/submited_challenge');

//post
// --data "questionID=XXX&teamID=XXX&score=XXX"

//OK path not protected


router.get('/addChallenge/:teamID', (req, res) => {
    res.render('addChallenge',{teamID:req.params.teamID,token:req.query.token});
});

router.post('/addChallenge',(req, res) => {
    //var challenge = new Challenge(req.body.toJSON);
    //console.log(req.body);
    var currentRound = 1;
    var challenge = new Challenge(req.body);

    challenge.round=currentRound;

    //console.log(req.body.teamID);

    challenge.content.forEach( q => {
        if(q.qType == 'mc'){
            var correcta = q.ans.filter((val)=> {
                return val.correct == true;
            });
            if(correcta.length == 1) q.qType = 'oc';
        }
        challenge.save();
    });

    Team.findOne({_id:req.body.teamID}).select('teamName').lean().exec().then((result)=>{
        //console.log(result);
        challenge.teamName = result.teamName;
        challenge.save();
    });

    Challenge.findOne().sort('-questionID').lean().exec().then((result)=>{
        //console.log(result);
        challenge.questionID += result.questionID;
        challenge.save();
    });

    res.render('addChallengeResult');
});

router.use(authUser);

router.post('/submitChallenge/:id',(req, res) => {
    var currentRound =1 ;
    console.log(req.body);
    var userSubmission = req.body;
    //console.log(req.body);
    //var userSubmission = JSON.parse('{"userID": "s1126051","ans": [{ "questionNo": 1, "answer": "Event attributes" },{ "questionNo": 2, "answer": "getPosition()"},{ "questionNo": 2,"answer":"getCurrentPosition()" }]}');
    var score = 0;
    var sresult = [];
    Challenge.findOne({questionID:req.params.id.slice(3)}).select('content.questionNo content.ans').exec().then((challenge) => {
        console.log(challenge.content);
        challenge.content.forEach((content) => {
            var submittedAns = userSubmission.filter((val)=>{
                return val.question_number == (content.questionNo-1);
            });
            //console.log(submittedAns);
            //console.log("end");
            var wrong = false;
            content.ans.forEach((ans) => {
                if(ans.correct){
                    //console.log(ans.content);
                    var submittedOneAns = submittedAns.filter((val)=>{
                        return val.answer == ans.content;
                    });
                    //console.log(submittedOneAns);
                    //console.log('end');
                    if(submittedOneAns.length == 0) wrong = true;
                }

                if(!ans.correct){
                    //console.log(ans.content);
                    var submittedOneAns = submittedAns.filter((val)=>{
                        return val.answer == ans.content;
                    });
                    //console.log(submittedOneAns);
                    //console.log('end');
                    if(submittedOneAns.length != 0) wrong = true;
                }
            });
            if(!wrong){
                score++;
                sresult.push(content.questionNo);

            }
        });

        console.log(score);
        Team.findOne({teamMember:req.decoded.id}).lean().exec().then((result) =>{
            console.log(result);
            Ranking.findOne({teamID: result._id}).exec().then((ranking) => {
                console.log(ranking);
                if (!ranking){
                    var rank = new Ranking({
                        teamID: result._id,
                        team: result.teamName,
                        score: score,
                        round: currentRound
                    });
                    rank.save();
                }else{
                    ranking.score += score;
                    ranking.save();
                }
                var submit = new SubmitedChallenge({
                    challengeID: req.params.id.slice(3),
                    teamID: result._id,
                    score: score,
                    result: sresult,
                    ans: req.body
                });
                submit.save().then(() => {
                    res.json({success: true});
                }, (err) => {
                    console.log(err);
                        res.json({success: false});
                });
            });
        });

    });
});

//OK path

router.get('/getChallenges/round/:round',(req, res) => {
    Challenge.find({round:req.params.round}).lean().exec().then((challenges)=> {
        Team.findOne({teamMember:req.decoded.id}).lean().exec().then((result) =>{
        var promises = [];
        challenges.forEach((challenge) => {
            var submissionCheckPromise = new Promise((resolve, reject) => {
                var challengeSubmissionQuery;
                if (!!result){
                    challengeSubmissionQuery = SubmitedChallenge.find({
                        challengeID: challenge.questionID,
                        teamID: result._id
                    }).lean().exec();
                }else{
                    challengeSubmissionQuery = new Promise((resolve) => {
                        resolve();
                    });
                }
                challengeSubmissionQuery.then((submitted) => {
                    if (!!result){
                        (submitted.length > 0) ? (challenge.done = true) : (challenge.done = false);
                        (challenge.teamID == result._id) ? (challenge.done = true) : (challenge.done = false);
                    }
                    //assignment.id=assignment._id;
                    var str = '';
                    challenge.content.forEach((content) => {
                        str += content.qType + '$' + content.question + '$$';
                        content.ans.forEach((ans) => {
                            (ans.correct) ? (str += '*' + ans.content + '|') : (str += ans.content + '|');
                        });
                        str = str.slice(0, -1);
                        str += '&';
                    });
                    str = str.slice(0, -1);
                    challenge.content = str;
                    challenge.questionID="Q00"+challenge.questionID; //add Q00 to questionID
                    resolve();
                });
            });
            promises.push(submissionCheckPromise);
        });
        Promise.all(promises).then(() => {
            res.json(challenges);
        });


    });


        /*
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
        res.json(challenges);*/
    });
});

router.get('/myTeam', (req, res) => {
    Team.findOne({teamMember:req.decoded.id}).lean().exec().then((result) =>{
        result.teamID = result._id;
        res.json(result);
    });
});

//need implement

router.get('/progress', (req, res) => {
    res.json({
        "total":10,
        "finish":2
    });
});

module.exports = router;
