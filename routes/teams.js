/**
 * Created by reinz on 2/5/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Team = require('../models/team');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');
var authadmin = require('./authadmin.js');

router.post('/createTeam', authadmin, (req, res) => {

    var createTeam = new Team(
        {
            //teamID: req.body.teamID,
            teamName: req.body.teamName,
            teamMember: req.body.teamMember.filter(Boolean)
        });

    createTeam.save(function (err) {
        if (err)
            res.json({success: false});
        else
            res.json({success: true});
    });
});

router.get('/myTeam/', authUser, (req, res) => {
    Team.findOne({teamMember:req}).then((team) => {
       res.json(team);
    });
});
module.exports = router;