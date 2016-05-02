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
    var answer=JSON.parse('{"userID": "s1126051","ans": [{ "questionNo": "1", "answer": ["HTML attributes"] },{ "questionNo": "2", "answer": ["HTML attributes","HTML attributes"] }]}');
    var score=0;
    console.log(answer.ans);

    Assignment.findOne({id:req.params.assid}).select('content.questionNo content.ans').where('content.ans.correct').equals(true).exec().then((content) => {

        console.log(content);
        res.json(content);
        content.forEach(function (content) {



            /*
            var target; // the questionNo that you wanna find ans for
            var targetAns = ans.filter((val, ind, arr)=>{
                return val.questionNo == target;
            })
            */


        });

    });
    //res.json({success: true});

});

router.get('/getResult', (req, res) => {



});

module.exports = router;
