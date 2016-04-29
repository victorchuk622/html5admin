/**
 * Created by reinz on 12/4/2016.
 */
/**
 * Created by reinz on 10/3/2016.
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user');

var logger = require('morgan');
//var config = require('../config.js');

//var jwt = require('jsonwebtoken');
//var cookieParser = require('cookie-parser')
//mongoose.connect(config.db.development);
var authAdmin = require('./authAdmin.js');

router.use(authAdmin);

router.get('/', (req, res) => {
    res.render('portal');
});

router.get('/accounts', (req, res) => {
    User.find({admin: false}).then((results) => {
        res.render('accounts', {students: results});
    }, (err) => {
        throw err;
    });
});



module.exports = router;