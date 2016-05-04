var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');
var authadmin = require('./authadmin.js');

/* GET users listing. */



router.get('/allUser', authUser, (req, res) => {
    User.find().select('id fullname admin').sort({id: 1}).exec(function (err, results) {
        if (err)
            return res.json({success: false, message: 'Server Error!'});
        if (results.length > 0)
            res.json(results);
        else
            res.json({message: 'Result not found!'});
    });
});






//POST create user by ADMIN
//--data "id=X&fullnameX=&pw=X&token=X"

router.post('/newUser', authadmin, (req, res) => {
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
});

//PUT update user by student, only password/nickname can be changed
//--data "id=X&pw=X&nickname=X&token=X" only one from pw or nickname exist is still okay
router.put('/updateUser', authUser, (req, res) => {
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
});

//DELETE remove user by ADMIN
router.get('/deleteStudent/:id', authadmin, (req, res) => {
    User.findOne({id:req.params.id}).remove(function (err, result) {
        if (err)
            res.redirect('back');
        else
            res.redirect('back');
    });
});

//Change user password by ADMIN
router.post('/changePassword/:id', authadmin, (req, res) => {
    User.findOne({id:req.params.id}).exec(function (err, result) {
        if (err)
            res.redirect('back');
        else
        {
            result.password = req.body.password;
            result.save();
            res.redirect('back');
        }
    });
});
module.exports = router;
