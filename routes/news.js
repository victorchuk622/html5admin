/**
 * Created by reinz on 29/2/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
var News = require('../models/news');
var mongoose = require('mongoose');





/* GET news */




router.post('/add', function (req, res, next) {

    var token = req.body.token;

    if (true) {

        var news = new News(
            {
                title: req.body.title,
                content: req.body.content,
                create: Date.now(),
                publish: req.body.publish,
                expire: req.body.expire,
                author: req.body.author,
            }
        );

        news.save(function (err) {
            if (err) res.json({success: false});
            else res.json({success: true});
        });
    }
});

router.get('/', function (req, res, next) {

    var token = req.query.token;

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Authentication failed.'});
            } else {
                req.decoded = decoded;

                News.find().exec(function (err, news) {
                    if (err)  return res.json({success: false, message: 'Server Error!'});
                    res.json(news);
                    console.log(news);
                });
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

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


module.exports = router;
