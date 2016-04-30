/**
 * Created by KOTORI on 12/3/2016.
 */
/**last edit: 12 Mar**/
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Rank = require('../models/ranking');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');

//update the ranking in the database
//:scope only accept 'CH1-3', 'CH4-6', 'CH7-9', 'CH10-12', 'Overall'
router.put('/updateRank/:scope', (req, res) => {
    var criteria = {};
    criteria.ranking = req.body.ranking;
    Rank.find({scope: req.params.scope}).then((results) => {
        if (results.length > 0) {
            Rank.update({scope: req.params.scope}, {$set: criteria}).then((result) => {
                res.json({message: 'update done'});
            }, (err) => {
                console.log("Error: " + err.message);
                res.json(err);
            });
        } else {
            var rank = new Rank({
                scope: req.params.scope,
                ranking: req.body.ranking
            });
            rank.save().then(() => {
                res.json({success: true});
            }, (err) => {
                res.json({success: false});
            });
        }
    }, (err) => {
        res.json({
            success: false,
            message: 'Server Error!'
        });
    });
});

//get the rank by scope
router.get('/getRank/:scope', (req, res) => {
    Message.find({scope: req.params.scope}).then((err, results) => {
        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({message: 'Result not found!'});
        }
    }, (err) => {
        res.json({success: false, message: 'Server Error!'});
    });
});

module.exports = router;
