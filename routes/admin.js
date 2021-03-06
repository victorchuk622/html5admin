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
var Ranking = require('../models/ranking');
var logger = require('morgan');
//var config = require('../setting.js');

//var jwt = require('jsonwebtoken');
//var cookieParser = require('cookie-parser')
//mongoose.connect(config.db.development);
var authadmin = require('./authadmin.js');
var News = require('../models/new');

router.use(authadmin);

router.get('/config',(req, res) => {
    res.render('config');
});

router.get('/assignments', (req, res) => {
    Assignment.find().exec().then((assignments) => {
        var submitted = [];
        assignments.forEach(assignment => {
            SubmitedAssignment.find({assignmentID:assignment.id}).exec().then((submit) => {
                submitted.push = 0+submit.length;
            })
        })
        console.log(submitted);
        res.render('assignments',{assignments:assignments,submitted:submitted});
    });
});

router.get('/addAssignment', (req, res) => {
    res.render('addAssignment');
});

router.post('/addAssignment', (req, res) => {
    res.redirect(307, '/assignments' + req.path);
});



router.get('/stat-assignments/:id',(req, res) => {
    var data;
    var stat = {
        labels: [],
        datasets: []
    };
    var assignmentId = req.params.id;
    var promises = [];
    promises.push(SubmitedAssignment.find({
        assignmentID: assignmentId
    }).exec());
    promises.push(Assignment.findOne({
        id: assignmentId
    }).exec());
    Promise.all(promises).then((results) => {
        var total;
        var htotal;
        var particulars = results[1].toObject();
        delete particulars.submit;
        delete particulars.content;
        console.log(total);
        console.log(particulars);
        console.log(results[0].length);
        total = results[1].content.length;
        htotal = results[0].length;
        data = Array(total).fill(0);
        stat.labels = Array(total).fill(0).map((x, i) => {
            return 'Q'+(i+1);
        });
        results[0].forEach((submission) => {
            submission.result.forEach((correct) => {
                data[correct-1]++;
            })
        });
        data = data.map( s => (s/htotal)*100 );
        console.log(data);
        stat.datasets.push({
            label: '% of Correct', 
            data: data
        });
        res.render('stat-assignments',{
            particulars: particulars, 
            data: stat
        });
    });
});





//stat related ok

router.get('/stat-assignments-menu/',(req, res) => {
    Assignment.find().exec().then((assignments) => {
        res.render('stat-assignments-menu',{assignments:assignments});
    });
});

//view related ok

router.get('/', (req, res) => {
    var promises = [];

    promises.push(News.find().sort({publish: -1}));

    promises.push(Assignment.find().select('title id deadline'));

    promises.push(SubmitedAssignment.aggregate([{$group:{_id:'$assignmentID', submited: {$sum: 1}}}]).exec());

    promises.push(Ranking.find().sort({score: -1}));

    Promise.all(promises).then((values) => {

        console.log(values[3]);
        res.render('portal',{news:values[0],assignments:values[1],submited:values[2],ranks:values[3]});

    }, (err) => {
        console.log(err);
        res.render('portal');
    })
});

router.get('/logout',(req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

router.get('/addNews', (req, res) => {
    res.render('addNews');
});

router.post('/addNews', (req, res) => {
    res.redirect(307, '/news' + req.path);
});

router.get('/messages', (req, res) => {
    res.render('messages');
});

router.get('/news',(req, res) => {
    News.find().sort({publish: -1}).then((results) => {
        res.render('news', {news:results});
    }, (err) => {
        throw err;
    });
});

router.get('/accounts', (req, res) => {
    User.find({admin: false}).then((results) => {
        res.render('accounts', {students: results});
    }, (err) => {
        throw err;
    });
});

router.get('/teams', (req, res) => {
    Team.find().then((results) =>{
        res.render('teams',{teams: results});
    });
});

//model related ok

router.get('/deleteAssignment/:id', (req, res) => {
    res.redirect(307, '/assignments' + req.path);
});

router.post('/createTeam', (req, res) => {
    res.redirect(307, '/teams' + req.path);
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

router.post('/changePassword/:id', (req, res) => {
    res.redirect(307, '/users' + req.path);
});

router.get('/deleteTeam/:id', (req, res) => {
    res.redirect(307, '/teams' + req.path);
});

module.exports = router;
