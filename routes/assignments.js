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
    Assignment.find({}).then((assignments) => {
        assignments = assignments.toObject();
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
    /*
    var str;

    Assignment.find({}).then((assignments) => {
        assignments.forEach(assignment){
            assignment.content.forEach(content){
                str += content.qType+'$'+content.question+'$$';
                content.answer.forEach(answer){
                    if(content.answer.correct)str += '*'+content.answer+'|';
                    else str += content.answer+'|';
                }
                str.slice(0,-1);
                str+='&'
            }
        }
    });
    */

/*
    
    res.json(
        [{
            title: 'Assignment 2',
            id:'ass2',
            done: false,
            create: '2016-03-16T08:23:45.079Z',
            deadline: '2017-03-16T08:23:45.079Z',
            info:'This is Assignment 2',
            content: 'mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()&fitb$_____ is used to specify a header for a document or section?$$*<header>'

        },{
            title: 'Assignment 1',
            id:'ass1',
            done: true,
            create: '2016-03-15T08:23:45.079Z',
            deadline: '2017-03-15T08:23:45.079Z',
            info:'This is Assignment 1',
            content: 'mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()&fitb$_____ is used to specify a header for a document or section?$$*<header>'
        }]
    )
*/

});

router.post('/submitAssignment/:assid', (req, res) => {
    console.log(req.body);
    res.json({success: true});
});

router.get('/getResult', (req, res) => {



});

module.exports = router;
