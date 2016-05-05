/**
 * Created by reinz on 29/2/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var News = require('../models/new');
var mongoose = require('mongoose');
var authUser = require('./authUser.js');
var authadmin = require('./authadmin.js');

/* GET all news desc by date /news */
router.get('/', authUser, (req, res) => {
    News.find().sort({publish: -1}).exec(function (err, news) {
        if (err)  return res.json({success: false, message: 'Server Error!'});
        res.json(news);
    });
});

/* POST news admin */
router.post('/addNews', authadmin, (req, res) => {
    var news = new News(
        {
            title: req.body.title,
            content: req.body.content,
            create: Date.now(),
            publish: req.body.publish,
            expire: req.body.expire,
            author: req.decoded.id,
        }
    );

    console.log(news);

    news.save(function (err) {
        if (err) res.redirect('/admin/news');
        else res.redirect('/admin/news');
    });
});


module.exports = router;

/*
 router.get('/latest', function (req, res, next) {

 res.json({
 "_id": "56d95d2663b833c33691c125",
 "title": "Helloworld!",
 "content": "FYP Project",
 "create": "2016-03-04T10:02:14.686Z",
 "publish": "2012-10-15T21:26:17.000Z",
 "expire": "2012-10-15T21:26:17.000Z",
 "author": "reinzwei",
 "__v": 0
 });
 });
 */