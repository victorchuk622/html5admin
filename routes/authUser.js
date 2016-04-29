 /**
 * Created by reinz on 10/3/2016.
 */

var logger = require('morgan');
var config = require('../config.js');

// Security
var jwt = require('jsonwebtoken');

var authUser = (req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, "test", (err, decoded) => {
            if (err) {
                return res.status(403).json({
                 success: false, 
                 message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                req.payload = jwt.decode(token, "test");
                next();
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
};

module.exports = authUser;
