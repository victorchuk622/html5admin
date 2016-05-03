var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var DiscussBoard = require('../models/discussion');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');

router.use(authUser);

//posting a reply
//post /postReply --data "questionID=x&userID=xxx&content=xxx"
router.post('/postReply', (req, res) => {
    console.log(req.body);
    var criteria = {questionID:req.body.questionID};

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
});

//get the reply of particular questionID
router.get('/getReply/:questionID', (req, res) =>{
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
});

module.exports = router;
