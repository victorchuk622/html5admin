/**
 * Created by reinz on 25/4/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Assignment = require('../models/question');
var mongoose = require('mongoose');
var authUser = require('authUser.js');

router.use(authUser.authUser);

router.get('/getAssignments', function (req, res, next) {


});

router.post('/submitAssignment/:assid', function (req, res, next) {



});

router.get('/getResult', function (req, res, next) {



});
module.exports = router;
