/**
 * Created by reinz on 25/4/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Assignment = require('../models/assignment');
var SubmitedAssignment = require('../models/submited_assignment');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');

router.use(authUser);

router.post('/createAssignment', (req, res) => {



});

router.get('/getAssignments', (req, res) => {
    Assignment.find({}).select('-_id').lean().exec().then((assignments) => {
        console.log(typeof assignments, assignments.length);
        assignments.forEach(function(assignment){

            assignment.done= false;

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
            assignment.content=str;
            console.log(assignment.content);
        });
        res.json(assignments);

    });
});

router.post('/submitAssignment/:assid', (req, res) => {
    //console.log(req.body);
    var userSubmission = req.body;
    //var userSubmission = JSON.parse('{"userID": "s1126051","ans": [{ "questionNo": 1, "answer": "Event attributes" },{ "questionNo": 2, "answer": "getPosition()"},{ "questionNo": 2,"answer":"getCurrentPosition()" }]}');
    var score = 0;
    var result = [];
    Assignment.findOne({id:req.params.assid}).select('content.questionNo content.ans').exec().then((assignment) => {
        assignment.content.forEach((content) => {
            var submittedAns = userSubmission.ans.filter((val)=>{
                return val.questionNo == content.questionNo;
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
                result.push(content.questionNo);
            }
        });
        var submit = new SubmitedAssignment(
            {
                assignmentID: req.params.assid,
                userID: req.decoded.id,
                score: score,
                result: result,
                ans: req.body
            }
        );
        submit.save();
        console.log(submit);
        res.json({success: true});
    });


});

router.get('/getResult', (req, res) => {



});

module.exports = router;
