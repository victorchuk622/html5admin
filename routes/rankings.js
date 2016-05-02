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

router.use(authUser);

router.get('/getRanking/round/:round',(req,res) => {
    res.json([
        {
            "rank":1,
            "team":"teamkav",
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
});

module.exports = router;
