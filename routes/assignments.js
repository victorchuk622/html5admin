/**
 * Created by reinz on 25/4/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Assignment = require('../models/assignment');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');

router.use(authUser);

router.post('/createAssignment', (req, res) => {



});

router.get('/getAssignments', (req, res) => {
    Assignment.find({}).lean().exec().then((assignments) => {
        console.log(typeof assignments, assignments.length);
        assignments.forEach(function(assignment){
            var concateContent = [];
            var str = '';
            assignment.content.forEach(function (content) {
                str += content.qType + '$' + content.question + '$$';
                content.ans.forEach(function (ans) {
                    if (ans.correct)str += '*' + ans.content + '|';
                    else str += ans.content + '|';
                });
                str = str.slice(0, -1);
                str += '&';
            });
            str = str.slice(0, -1);
            concateContent.push(str);
            console.log(concateContent);
            assignment.content=concateContent;
            console.log(assignment.content);
        });
        res.json(assignments);
    });
});

router.post('/submitAssignment/:assid', (req, res) => {
    //console.log(req.body);
    //var answer=req.body().toObject();
    var submit=JSON.parse('{"userID": "s1126051","ans": [{ "questionNo": 1, "answer": ["Event attributes"] },{ "questionNo": 2, "answer": ["getPosition()","getCurrentsPosition()"] }]}');
    var score=0;
    var result=[];
    //console.log(answer.ans);

    Assignment.findOne({id:req.params.assid}).select('content.questionNo content.ans').exec().then((contents) => {
        contents.content.forEach(function (content) {
            var submittedAns = submit.ans.filter((val)=>{
                return val.questionNo == content.questionNo;
            });
            console.log(submittedAns);
            var wrong = false;
            content.ans.forEach(function (ans){
                if(ans.correct){
                    var submittedOneAns = submittedAns[0].answer.filter((val)=>{
                        return val == ans.content;
                    });
                    console.log(submittedOneAns);
                    if(submittedOneAns.length == 0) wrong = true;
                }
            });
            if(!wrong){
                score++;
                result.push(content.questionNo);
            }
        });
        console.log(score);
        console.log(result);
        res.json({success: true});
    });


});

router.get('/getResult', (req, res) => {



});

module.exports = router;
