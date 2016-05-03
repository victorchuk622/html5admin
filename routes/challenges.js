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
    res.json([{"questionID": "2016S101",
        "teamName": "teamKAV",
        "date": "2016-03-16T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
},{"questionID": "2",
        "teamName": "2016S102",
        "date": "2016-03-17T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
    },{"questionID": "3",
        "teamName": "2016S103",
        "date": "2016-03-17T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
    }]);
});

router.get('/myTeam', (req, res) => {
    res.json({
        "teamID":"2016S101",
        "teamName": "TeamKAV",
        "teamMember": [
        "s1112416",
        "s1126051",
        "s1112411"
    ]});
});

router.get('/addChallenge/:teamID', (req, res) => {
    res.render('addChallenge',{teamID:req.params.teamID});
});

module.exports = router;
