var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Challenge = require('../models/challenge');
var mongoose = require('mongoose');

//post
// --data "questionID=XXX&teamID=XXX&score=XXX"
router.get('/addChallenge/:teamID', (req, res) => {
    res.render('addChallenge',{teamID:req.params.teamID});
});

router.post('/addChallenge',(req, res) => {
    console.log(req.body);
    console.log(req.body.content);
    console.log(req.body.content[0].ans);
    res.json({success:true});
});

router.get('/getChallenges/round/:round',(req, res) => {
    res.json([{"teamID": "2016S101",
        "teamName": "teamKAV",
        "date": "2016-03-16T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
},{"teamID": "2",
        "teamName": "2016S102",
        "date": "2016-03-17T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
    },{"teamID": "3",
        "teamName": "2016S103",
        "date": "2016-03-17T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
    }]);
});






/*
router.post('/postRecord', function (req, res, next) {
    //var token = req.body.token;
    if (true) {
        var cha = new Challenge(
            {
                'questionID': req.body.questionID,
                'teamID': req.body.teamID,
                'score': req.body.score
            });
        cha.save(function (err) {
            if (err)
                res.json({success: false});
            else
                res.json({success: true});
        });
    }
});
*/
//get single record by _id
router.get('/getRecord/:cid', function (req, res, next) {
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
                Challenge.find({_id: req.params.cid}, function (err, results) {
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


//get by questionID

//get by teamID
module.exports = router;
