/**
 * Created by KOTORI on 12/3/2016.
 */
/**last edit: 12 Mar**/
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Rank = require('../models/rankings');
var mongoose = require('mongoose');

//update the ranking in the database
//:scope only accept 'CH1-3', 'CH4-6', 'CH7-9', 'CH10-12', 'Overall'
router.put('/updateRank/:scope', function (req, res, next) {
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
                criteria['ranking'] = req.body.ranking;

                Rank.find({scope: req.params.scope},function(err,results){
                    if (err)
                        return res.json({success: false, message: 'Server Error!'});

                    if (results.length > 0){
                        Rank.update({scope: req.params.scope}, {$set: criteria}, function(err, result) {
                            if (err) {
                                console.log("Error: " + err.message);
                                res.json(err);
                            }
                            else {
                                res.json({message: 'update done'});
                            }
                        });
                    }
                    else{
                        var rank = new Rank({
                            scope: req.params.scope,
                            ranking: req.body.ranking
                        });
                        rank.save(function (err) {
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

//get the rank by scope
router.get('/getRank/:scope', function (req, res, next) {
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

                Message.find({scope: req.params.scope},function(err,results){
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
module.exports = router;