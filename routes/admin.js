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
var Team = require('../models/team');
var Assignment = require('../models/assignment')
var SubmitedAssignment = require('../models/submited_assignment');
var logger = require('morgan');
//var config = require('../setting.js');

//var jwt = require('jsonwebtoken');
//var cookieParser = require('cookie-parser')
//mongoose.connect(config.db.development);
var authadmin = require('./authadmin.js');
var News = require('../models/new');

router.use(authadmin);


router.get('/', (req, res) => {
    var promises = [];

    promises.push(News.find().sort({publish: -1}));

    promises.push(Assignment.find().select('title id deadline'));

    promises.push(SubmitedAssignment.aggregate([{$group:{_id:'$assignmentID', submited: {$sum: 1}}}]).exec());

    Promise.all(promises).then((values) => {

        console.log(values[2]);
        res.render('portal',{news:values[0],assignments:values[1],submited:values[2]});

    }, (err) => {
        console.log(err);
        res.render('portal');
    })
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

router.get('/teams', (req, res) => {
    Team.find().then((results) =>{
        res.render('teams',{teams: results});
    });
});

router.post('/createTeam', (req, res) => {
    res.redirect(307, '/teams' + req.path);
});




router.get('/assignments', (req, res) => {
    res.render('assignments');
});

router.get('/assignments/addAssignment', (req, res) => {
    res.render('addAssignment');
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