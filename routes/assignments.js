var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Assignment = require('../models/assignment');
var SubmitedAssignment = require('../models/submited_assignment');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');
var authadmin = require('./authadmin.js');

//missing check done function

router.post('/addAssignment', authadmin,(req, res) => {

    var assignment = new Assignment(req.body);

    assignment.id=assignment._id;
    //assignment.deadline = Date.now();

    console.log(req.body);

    //console.log(req.body.teamID);
    assignment.content.forEach( q => {
        if(q.qType == 'mc'){
            var correcta = q.ans.filter((val)=> {
                return val.correct == true;
            });
            if(correcta.length == 1) q.qType = 'oc';
        }
        assignment.save().then(() => {
            res.redirect('/admin/assignments');
        }, (err) => {
            console.log(err);
            res.redirect('/admin/assignments');
        })
    });
});



router.get('/getAssignments', authUser,  (req, res) => {
    Assignment.find({}).select().lean().exec().then((assignments) => {
        //console.log(typeof assignments, assignments.length);
        var promises = [];
        assignments.forEach((assignment) => {
            var submissionCheckPromise = new Promise((resolve, reject) => {
                SubmitedAssignment.find({
                    assignmentID: assignment._id, 
                    userID: req.decoded.id
                }).lean().exec().then((submitted) => {
                    (submitted.length > 0) ? (assignment.done = true) : (assignment.done = false);
                    //assignment.id=assignment._id;
                    var str = '';
                    assignment.content.forEach((content) => {
                        str += content.qType + '$' + content.question + '$$';
                        content.ans.forEach((ans) => {
                            (ans.correct) ? (str += '*' + ans.content + '|') : (str += ans.content + '|');
                        });
                        str = str.slice(0, -1);
                        str += '&';
                    });
                    str = str.slice(0, -1);
                    assignment.content = str;
                    resolve();
                });
            });
            promises.push(submissionCheckPromise);
        });
        Promise.all(promises).then(() => {
            res.json(assignments);
        });
    });
});

//path ok

router.post('/submitAssignment/:assid' , authUser, (req, res) => {
    console.log(req.body);
    var userSubmission = req.body;
    //console.log(req.body);
    //var userSubmission = JSON.parse('{"userID": "s1126051","ans": [{ "questionNo": 1, "answer": "Event attributes" },{ "questionNo": 2, "answer": "getPosition()"},{ "questionNo": 2,"answer":"getCurrentPosition()" }]}');
    var score = 0;
    var result = [];
    Assignment.findOne({id:req.params.assid}).select('content.questionNo content.ans').exec().then((assignment) => {
        assignment.content.forEach((content) => {
            console.log(content);
            var submittedAns = userSubmission.filter((val)=>{
                return val.question_number == (content.questionNo -1) ;
            });
            console.log(submittedAns);
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

        submit.save(function (err) {
            if (err)
            {
                console.log(err);
                res.json({success: false});
            }
            else
                res.json({success: true});
        });
    });
});

router.get('/deleteAssignment/:id', authadmin, (req, res) => {
    Assignment.find({id:req.params.id}).remove(function (err, result) {
        if (err)
            res.redirect('back');
        else
            SubmitedAssignment.find({assignmentID:req.params.id}).remove(function (err, result) {
                if (err)
                    res.redirect('back');
                else
                    res.redirect('back');
            });
    });
});
//wait to implement

router.post('/createAssignment', authadmin, (req, res) => {




});

router.get('/getResult' , authUser, (req, res) => {



});

module.exports = router;
