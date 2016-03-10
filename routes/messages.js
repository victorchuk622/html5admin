var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Message = require('../models/message');
var mongoose = require('mongoose');

//sending a message
//post /sendmsg --data "userID=xxx&targetID=xxx&content=xxx"
router.post('/sendmsg', function (req, res, next) {
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
        criteria = JSON.parse('{$or: [{$and: [{"senderID": "' + req.body.targetID + '"}, {"receiverID": "' + req.body.userID + '"}]},' 
                                   + '{$and: [{"senderID": "' + req.body.userID + '"}, {"receiverID": "' + req.body.targetID + '"}]}]}');
        Message.find(criteria,function(err,results){
          if (err) 
            return res.json({success: false, message: 'Server Error!'});
         
          if (results.length > 0){ //append to existing dialog
            /**
            expected content in "content":
             |*sid001*|hi alex, i am victor.|*sid002*|nice to meet u alex.|*sid002*|Alex, where do you come from?
            **/
            Message.update(criteria, {$set: {content: this.content + "|*" + req.body.userID + "*|" + req.body.content}}, function(err, result) {
              if (err) {
                console.log("Error: " + err.message);
                res.json(err);
              }
              else {
                res.json({message: 'update done'});
              }
            });
          }
          else { //create new dialog 
            var msg = new Message(
            {
              senderID: req.body.userID,
              receiverID: req.body.targetID,
              content: "|*" + req.body.userID + "*|" + req.body.content
            });
            msg.save(function (err) {
              if (err) 
                res.json({success: false});
              else 
                res.json({success: true});
            });
          }
        });
        
      }
    });
  }
});

//get the latest message from each sender
//  return lastest msg, senderID, date
router.get('/getAllMsg', function (req, res, next) {
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

        Message.find({},{senderID:1, date:1, content:1},function(err,results){
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


//get all the message of a sender
router.get('/getMsg/:targetID:/:userID', function (req, res, next) {
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
        criteria = JSON.parse('{$or: [{$and: [{"senderID": "' + req.params.targetID + '"}, {"receiverID": "' + req.params.userID + '"}]},' 
                                   + '{$and: [{"senderID": "' + req.params.userID + '"}, {"receiverID": "' + req.params.targetID + '"}]}]}');
        Message.find(criteria,function(err,results){
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


/**********************************************
*****************no deletion*******************
delete multiple(1 or many) message of one user
delete messages of multiple(1 or many) users
**********************************************/