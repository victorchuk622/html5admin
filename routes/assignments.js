/**
 * Created by reinz on 25/4/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Assignment = require('../models/question');
var mongoose = require('mongoose');
//var authUser = require('../routes/authUser.js');

//router.use(authUser.authUser);

router.get('/getAssignments', function (req, res, next) {

    res.json(
        [{
            title: 'Assignment 2',
            create: '2016-03-16T08:23:45.079Z',
            deadline: '2017-03-16T08:23:45.079Z',
            info:'This is Assignment 2',
            content: 'mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()&fitb$_____ is used to specify a header for a document or section?$$*<header>'

        },{
            title: 'Assignment 1',
            create: '2016-03-15T08:23:45.079Z',
            deadline: '2017-03-15T08:23:45.079Z',
            info:'This is Assignment 1',
            content: 'mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()&fitb$_____ is used to specify a header for a document or section?$$*<header>'
        }]
    )


});

router.post('/submitAssignment/:assid', function (req, res, next) {



});

router.get('/getResult', function (req, res, next) {

    res.json({success: true});

});
module.exports = router;
