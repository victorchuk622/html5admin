var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Question = require('../models/question');
var mongoose = require('mongoose');

//post - create questions
// --data "scope=XXX&title=XXX&content=XXX" ***content should include qType(question type), ans(answer), question
router.post('/newQuestion', function (req, res, next) {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }
            else {
                var payload = jwt.decode(token, "test");
                console.log(payload.id);

                var qes = new Question(
                    {
                        scope: req.body.scope,
                        title: req.body.title,
                        content: req.body.content
                    })
                //challengeRecords are wait to be push

                qes.save(function (err) {
                    if (err)
                        res.json({success: false});
                    else
                        res.json({success: true});
                });
            }
        });
    }
});

//get - get all questions or by scope
router.get('/getQesByScope/:scope', function (req, res, next) {
    var token = req.query.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }
            else {
                var payload = jwt.decode(token, "test");
                console.log(payload.id);

                //var criteria = {};
                //criteria["scope"] = req.params.scope;

                //only return _id, scope, title
                Question.find({scope: req.params.scope}, {
                    _id: 1,
                    scope: 1,
                    title: 1,
                    content: 0,
                    challengeRecords: 0
                }, function (err, results) {
                    if (err)
                        return res.json({success: false, message: 'Server Error!'});

                    if (results.length > 0)
                        res.json(results);
                    else
                        res.json({message: 'Result not found!'});
                });
            }
        });
    }
    else {
        // return error if there is no token,
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});


//get - get single question
router.get('/getQuestion/:qid', function (req, res, next) {
    var token = req.query.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }
            else {
                var payload = jwt.decode(token, "test");
                console.log(payload.id);

                //var criteria = {};
                //criteria["_id"] = req.params.qid;
                //Message.find({criteria},function(err,results){

                //if fail, replace the follow row by above three rows
                Question.find({_id: req.params.qid}, function (err, results) {
                    if (err)
                        return res.json({success: false, message: 'Server Error!'});

                    if (results.length > 0)
                        res.json(results);
                    else
                        res.json({message: 'Result not found!'});
                });
            }
        });
    }
    else {
        // return error if there is no token,
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});


//put - update the challenge records
// /putRecord/:qid  --date="cid=XXXXXXXX" cid = challenge _id(get from model.challenges)
router.put('/putRecord/:qid', function (req, res, next) {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }
            else {
                var payload = jwt.decode(token, "test");
                console.log(payload.id);

                var criteria = {};
                criteria = JSON.parse('{"challengeRecords": "' + req.body.cid + '"}');
                Question.update({_id: req.param.qid}, {$push: criteria}, function (err, result) {
                    if (err) {
                        console.log("Error: " + err.message);
                        res.json(err);
                    }
                    else {
                        res.json({message: 'update done'});
                    }
                });
            }
        });
    }
});

module.exports = router;
