var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Challenge = require('../models/challenge');
var Team = require('../models/team');
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
    if(req.params.round==1)
    res.json([{"questionID": "Q001",
        "teamName": "TeamKAV",
        "info":"This is question set created by TeamKAV. It is very difficult, be careful!",
        "date": "2016-03-16T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
},{"questionID": "Q002",
        "teamName": "Team 2",
        "info":"This is question set created by Team2. It is not so difficult.",
        "date": "2016-03-17T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
    },{"questionID": "Q003",
        "teamName": "Team 3",
        "info":"This is question set created by Team3. It is so easy.",
        "date": "2016-03-17T08:23:45.079Z",
        "done":false,
        "content":"mc$In HTML5, contextmenu and spellcheck are:$$HTML attributes|*Event attributes|Style attributes|HTML elements&oc$In HTML5, which method is used to get the current location of a user?$$getUserPosition()|getPosition()|*getCurrentPosition()",
    }]);
});

router.get('/myTeam', (req, res) => {
    Team.findOne({teamMember:req.decoded.id}).exec((team)=>{
        team.teamID = team._id;
        res.json(team);
    });
});

router.get('/progress', (req, res) => {
    res.json({
        "total":10,
        "finish":2
    });
});

router.get('/addChallenge/:teamID', (req, res) => {
    res.render('addChallenge',{teamID:req.params.teamID});
});


module.exports = router;
