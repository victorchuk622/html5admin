var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Message = require('../models/message');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');

router.use(authUser);

//sending a message
//post /sendmsg --data "userID=xxx&targetID=xxx&content=xxx"
router.post('/sendmsg', (req, res) =>{
    //<new version
    var criteriaA = {};
    criteriaA["userA"] = req.body.targetID;
    criteriaA["userB"] = req.body.userID;

    var criteriaB = {};
    criteriaB["userB"] = req.body.targetID;
    criteriaB["userA"] = req.body.userID;

    var theContent = {};
    theContent = JSON.parse('{"conversation": {"senderID": "' + req.body.userID + '", "content": "' + req.body.content + '", "date": "' + Date.now() + '"}}');

    Message.find(criteriaA, function (err, results) {
        if (err)
            return res.json({success: false, message: 'Server Error!'});

        if (results.length > 0) {

            Message.update(criteriaA, {$push: theContent}, function (err, result) {
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
            Message.find(criteriaB, function (err, results) {
                if (err)
                    return res.json({success: false, message: 'Server Error!'});

                if (results.length > 0) {
                    Message.update(criteriaB, {$push: theContent}, function (err, result) {
                        if (err) {
                            console.log("Error: " + err.message);
                            res.json(err);
                        }
                        else {
                            result.update = Date.now();
                            res.json({message: 'update done'});
                        }
                    });
                }
                else {
                    //create new dialog
                    var msg = new Message(
                        {
                            userA: req.body.userID,
                            userB: req.body.targetID,
                            //content: "|*" + req.body.userID + "*|" + req.body.content
                        });
                    msg.save(function (err) {
                        if (err)
                            res.json({success: false});
                        else {
                            Message.update(criteriaB, {$push: theContent}, function (err, result) {
                                if (err) {
                                    console.log("Error: " + err.message);
                                    res.json(err);
                                }
                                else {
                                    res.json({success: true});
                                }
                            });
                        }
                    });


                }
            });

        }
    });
    //new version>
});


//get the latest message from each sender
//  return lastest msg, senderID, date
router.get('/getAllMsg/:userID', (req, res) => {
    Message.find({$or: [{'userA': req.params.userID}, {'userB': req.params.userID}]}).sort({update: -1}).exec(function (err, results) {
        if (err)
            return res.json({success: false, message: 'Server Error!'});
        if (results.length > 0){
            console.log(results);
            res.json(results);
        }

        else
            res.json({message: 'Result not found!'});
    });
});

//get all the message of a sender
router.get('/getMsg/:targetID/:userID',(req, res) => {
    //<new version
    var criteriaA = {};
    criteriaA["userA"] = req.params.targetID;
    criteriaA["userB"] = req.params.userID;

    var criteriaB = {};
    criteriaB["userB"] = req.params.targetID;
    criteriaB["userA"] = req.params.userID;

    Message.find(criteriaA, function (err, results) {
        if (err)
            return res.json({success: false, message: 'Server Error!'});

        if (results.length > 0)
            res.json(results);
        else {
            Message.find(criteriaB, function (err, results) {
                if (err)
                    return res.json({success: false, message: 'Server Error!'});

                if (results.length > 0)
                    res.json(results);
                else
                    res.json({message: 'Result not found!'});
            });
        }
    });
    //new version>
});

/**********************************************
 *****************no deletion*******************
 delete multiple(1 or many) message of one user
 delete messages of multiple(1 or many) users
 **********************************************/
module.exports = router;