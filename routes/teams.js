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

//Path OK

router.get('/myTeam', authUser, (req, res) => {
    Team.findOne({teamMember:req.decoded.id}).then((team) => {
        res.json(team);
    });
});

router.post('/createTeam', authadmin, (req, res) => {
    var createTeam = new Team(
        {
            teamName: req.body.teamName,
            teamMember: req.body.teamMember.filter(Boolean)
        });
    createTeam.save(function (err) {
        if (err)
            res.redirect('back');
        else
            res.redirect('back');
    });
});

router.get('/deleteTeam/:id', authadmin, (req, res) => {
    Team.findOne({_id:req.params.id}).remove(function (err, result) {
        if (err)
            res.redirect('back');
        else
            res.redirect('back');
    });
});

module.exports = router;