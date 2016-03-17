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


router.get('/allUser', function (req, res, next) {
    var token = req.query.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            }
            else{


                User.find().select('id fullname admin').exec(function (err, results) {
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
