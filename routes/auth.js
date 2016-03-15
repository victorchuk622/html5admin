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

/*middleware to auth*/

/* Login function and return Token. */
router.post('/', (req, res, next) => {
    console.log(req.body);
    User.findOne({
        id: req.body.id
    }).then((err, user) => {
        console.log(user);
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
    }, (err) => {
        throw err;
    });
});

/* Test function adding user*/
router.get('/add', (req, res, next) => {
    var user = new User({
        id: req.query.id,
        fullname: req.query.fullname,
        password: req.query.password,
    });
    user.save().then(() => {
        res.json({
            success: true
        });
    }, (err) => {
        res.json({
            success: false
        });
        console.log('Error Inserting New Data');
        if (err.name == 'ValidationError') {
            for (field in err.errors) {
                console.log(err.errors[field].message);
            }
        }
    });
});

router.post('/modify', (req, res, next) => {
    var token = req.body.token;
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "test", (err, decoded) => {
            if (err) {
                return res.json({
                    success: false, 
                    message: 'Authentication failed.'
                });
            } else {
                req.decoded = decoded;
                var payload = jwt.decode(token, "test");
                User.findOne({
                    id: payload.id
                }).then((user) => {
                    if (req.body.password) user.password = req.body.password;
                    if (req.body.nickname) user.nickname = req.body.nickname;
                    user.save().then(() => {
                        res.json({
                            success: true, 
                            message: 'Account Updated.'
                        });
                    }, (err) => {
                        next(err);
                    });
                }, (err) => {
                    next(err);
                });
            }
        });
    }
});

router.post('/admin', (req, res, next) => {
    console.log(req.body);
    User.findOne({
        id: req.body.id
    }).then((user) => {
        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            (user.password == req.body.password) ? (user.admin) ? jwt.sign({ id: user.id , admin:true}, "test", {
                expiresIn: 22896000 // expires in 1 year
            }, function(token){
                // return the information including token as JSON
                res.json({
                    success: true,
                    nickname: user.nickname,
                    fullname: user.fullname,
                    token: token
                });
            }) : res.json({
                success: false,
                message: 'Authentication failed. You are not admin.'
            }) : res.json({
                success: false,
                message: 'Authentication failed. Wrong password.'
            });
        }
    }, (err) => {
        throw err;
    });
});

module.exports = router;
