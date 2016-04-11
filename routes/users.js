var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//get all users
router.get('/allUser', function (req, res, next) {
    var token = req.query.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }
            else {
                User.find().select('id fullname admin').sort({id:1}).exec(function (err, results) {
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

//POST create user by ADMIN
//--data "id=X&fullnameX=&pw=X&token=X"
router.post('/newUser', function (req, res, next) {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }
            else {
                var payload = jwt.decode(token, "test");
                console.log(payload.id);

                var user = new User(
                    {
                        id: req.body.id,
                        nickname: "", //default no nickname, therefore, empty string
                        fullname: req.body.fullname,
                        password: req.body.password  //password is reserved word
                    })

                user.save(function (err) {
                    if (err)
                        res.json({success: false});
                    else
                        res.json({success: true});
                });
            }
        });
    }
});


//PUT update user by student, only password/nickname can be changed
//--data "id=X&pw=X&nickname=X&token=X" only one from pw or nickname exist is still okay
router.put('/updateUser', function (req, res, next) {
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
                if (req.body.nickname)  criteria["nickname"] = req.body.nickname;
                if (req.body.pw)  criteria["pw"] = req.body.pw;

                User.update({id: req.body.id}, {$set: criteria}, function (err, result) {
                    if (err) {
                        console.log("Error: " + err.message);
                        res.json(err);
                    }
                    else {
                        res.json({message: 'update done'});
                    }
                });
            }
        });
    }
});

//DELETE remove user by ADMIN
router.delete('/removeUser/:id', function (req, res, next) {
    var token = req.query.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }
            else {
                User.find({id: req.param.id}).remove(function (err, results) {
                    if (err)
                        return res.json({success: false, message: 'Server Error!'});
                    else
                        return res.json({success: true, message: 'Delete Done!'});
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
