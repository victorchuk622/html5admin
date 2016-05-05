/**
 * Created by KOTORI on 12/3/2016.
 */
/**last edit: 12 Mar**/
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Ranking = require('../models/ranking');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');
var Team = require('../models/team')

router.use(authUser);

router.get('/getRanking/round/:round',(req,res) => {
    if(req.params.round==1)
    res.json([
        {
            "rank":1,
            "team":"TeamKAV",
            "score":100
        },
        {
            "rank":2,
            "team":"team2",
            "score":80
        },
        {
            "rank":3,
            "team":"team3",
            "score":70
        },
        {
            "rank":4,
            "team":"team4",
            "score":68
        },
        {
            "rank":5,
            "team":"team5",
            "score":67
        }
    ]);
    if(req.params.round==2)res.json([
        {
            "rank":1,
            "team":"TeamKAV",
            "score":80
        },
        {
            "rank":2,
            "team":"team3",
            "score":70
        },
        {
            "rank":3,
            "team":"team4",
            "score":60
        },
        {
            "rank":4,
            "team":"team4",
            "score":50
        },
        {
            "rank":5,
            "team":"team5",
            "score":67
        }
    ]);

});

router.get('/statistic/round/:round/teamID/:id',(req,res) => {
    Ranking.find({round:1}).sort({score: -1}).exec().then((ranks)=>{
        //console.log(ranks);
        //console.log(req.params.id);
        var target = ranks.filter((val)=> {
            return val.teamID == req.params.id;});
        console.log(target);
        var rank = ranks.indexOf(target[0]);
        res.json({
            rank:(rank+1),
            score:target[0].score
        });
    });
});

module.exports = router;
