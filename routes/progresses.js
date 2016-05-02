/**
 * Created by reinz on 2/5/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');

router.use(authUser);

