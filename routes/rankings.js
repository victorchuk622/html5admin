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
    Ranking.find({round:req.params.round}).sort({score: -1}).exec().then((ranks)=> {
        res.json(ranks);
    });
});

router.get('/statistic/round/:round/teamID/:id',(req,res) => {
    Ranking.find({round:req.params.round}).sort({score: -1}).exec().then((ranks)=>{
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
