var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var DiscussBoard = require('../models/discussion');
var mongoose = require('mongoose');

//posting a reply
//post /postReply --data "questionID=x&userID=xxx&content=xxx"
router.post('/postReply', function (req, res, next) {
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
                criteria = req.body.questionID;

                var theContent = {};
                theContent = JSON.parse('{"reply": {"userID": "' + req.body.userID + '", "content": "' + req.body.content + '", "date": "' + Date.now() + '"}}');

                DiscussBoard.find(criteria, function (err, results) {
                    if (err)
                        return res.json({success: false, message: 'Server Error!'});

                    if (results.length > 0) {

                        DiscussBoard.update(criteria, {$push: theContent}, function (err, result) {
                            if (err) {
                                console.log("Error: " + err.message);
                                res.json(err);
                            }
                            else {
                                result.update = Date.now();
                                //result.save();
                                res.json({message: 'update done'});
                            }
                        });
                    }
                    else {
                        //create new dialog
                        var board = new DiscussBoard(
                            {
                                questionID: req.body.questionID
                    });
                        board.save(function (err) {
                            if (err)
                                res.json({success: false});
                            else {
                                DiscussBoard.update(criteria, {$push: theContent}, function (err, result) {
                                    if (err) {
                                        console.log("Error: " + err.message);
                                        res.json(err);
                                    }
                                    else {
                                        result.update = Date.now();
                                        //result.save();
                                        res.json({message: 'update done'});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

//get the reply of particular questionID
router.get('/getReply/:questionID', function (req, res, next) {
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

                var criteria = {};
                criteria = req.params.questionID;

                DiscussBoard.find(criteria, function (err, results) {
                    if (err)
                        return res.json({success: false, message: 'Server Error!'});

                    if (results.length > 0)
                        res.json(results);
                    else {
                        res.json({message: 'Be the first one to start the discussion~'});
                    }
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
module.exports = router;