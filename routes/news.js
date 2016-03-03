/**
 * Created by reinz on 29/2/2016.
 */
var express = require('express');
var config = require('../config.js');
var jwt = require('jsonwebtoken');
var router = express.Router();
/* GET news */
router.get('/', function(req, res, next) {

    var token = req.query.token;

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, "test", function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Authentication failed.' });
            } else {





                req.decoded = decoded;
                return res.json({title: "test",
                    content: "test",
                    create: Date(),
                    publish: Date(),
                    expire: Date(),
                    author: "test",});
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

module.exports = router;
