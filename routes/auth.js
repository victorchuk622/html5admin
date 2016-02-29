var express = require('express');
//var crypto = require('crypto');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logger = require('morgan');
/* for test mongoDB connection */
var config = require('../config.js');
var jwt = require('jsonwebtoken');


mongoose.connect(config.db.development);


/* Login function and return Token. */
router.post('/', function (req, res, next) {

    User.findOne({
        name: req.body.user
    }, function (err, user) {


        if (err) throw err;

        if (!user) {

            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, "test", {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});


/* Test function adding user*/
router.get('/add', function (req, res, next) {

    var user = new User({
        name: req.query.name,
        password: req.query.password
    });

    user.save(function (err) {
        if (err) throw err;


        res.json({success: true});
    });
});


module.exports = router;