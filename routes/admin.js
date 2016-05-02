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
//var config = require('../setting.js');

//var jwt = require('jsonwebtoken');
//var cookieParser = require('cookie-parser')
//mongoose.connect(config.db.development);
var authadmin = require('./authadmin.js');

router.use(authadmin);



router.get('/', (req, res) => {
    res.render('portal');
});

router.get('/logout',(req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

router.get('/accounts', (req, res) => {
    User.find({admin: false}).then((results) => {
        res.render('accounts', {students: results});
    }, (err) => {
        throw err;
    });
});

router.get('/arena', (req, res) => {
    res.render('arena');
});

router.post('/createTeam', (req, res) => {
    res.redirect(307, '/teams' + req.path);
});




router.get('/assignments', (req, res) => {

    res.render('assignments');

});

router.post('/createStudent', (req, res) =>  {
    console.log(req.body);
    User.findOne({id:req.body.id}).then((user) => {
        var user = new User({
            id: req.body.id,
            fullname: req.body.fullname,
            password: req.body.password
        });
        user.save().then(() => {
            res.redirect('back');
        }, (err) => {
            res.redirect('back');
            console.log('Error Inserting New Data');
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                }
            }
        });
    });
});

router.get('/deleteStudent/:id', (req, res) => {
    res.redirect(307, '/users' + req.path);
});





module.exports = router;