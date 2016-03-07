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
        id: req.body.id
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
                var token = jwt.sign({ id: user.id }, "test", {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    nickname: user.nickname,
                    fullname: user.fullname,
                    token: token
                });
            }

        }

    });
});


/* Test function adding user*/
router.get('/add', function (req, res, next) {

    var user = new User({
        id: req.query.id,
        fullname: req.query.fullname,
        password: req.query.password,
    });


    user.save(function (err) {
        if (err) {
            res.json({success: false});
            console.log('Error Inserting New Data');
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
        } else {
            res.json({success: true});
        }
    });
});

router.post('/modify', function (req, res, next) {
    var token = req.body.token;

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            } else {
                req.decoded = decoded;
                var payload = jwt.decode(token, "test");


                User.findOne({
                    id: payload.id
                }, function (err, user) {

                    if (err) { return next(err); }
                    user.password = req.body.password;
                    user.save(function(err) {
                        if (err) { return next(err); }
                        else res.json({success: true, message: 'Password Updated.'});
                    });

                });

            }
        });
    }
});


module.exports = router;