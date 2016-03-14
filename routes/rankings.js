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

//update the ranking in the database
//:scope only accept 'CH1-3', 'CH4-6', 'CH7-9', 'CH10-12', 'Overall'
router.put('/updateRank/:scope', (req, res, next) => {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, "test", (err, decoded) => {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }else{
                var payload = jwt.decode(token, "test");
                console.log(payload.id);
                var criteria = {};
                criteria.ranking = req.body.ranking;
                Rank.find({scope: req.params.scope}).then((results) => {
                    if (results.length > 0){
                        Rank.update({scope: req.params.scope}, {$set: criteria}).then((result) => {
                            res.json({message: 'update done'});
                        }, (err) => {
                            console.log("Error: " + err.message);
                            res.json(err);
                        });
                    }else{
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
            }
        });
    }else{
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

//get the rank by scope
router.get('/getRank/:scope', (req, res, next) => {
    var token = req.query.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({
                    success: false, 
                    message: 'Authentication failed.'
                });
            } else {
                var payload = jwt.decode(token, "test");
                console.log(payload.id);
                Message.find({scope: req.params.scope}).then((err,results) => {
                    if (results.length > 0){
                        res.json(results);
                    } else {
                        res.json({message: 'Result not found!'});
                    }
                }, (err) => {
                    res.json({success: false, message: 'Server Error!'});
                });
            }
        });
    } else {
        // return error if there is no token,
        res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
module.exports = router;
