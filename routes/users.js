var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req,res){
    User.find({})
    .sort({username:1})
    .exec(function(err, users){
        if(err) return res.json(err);
        res.render('users/index', {users:users});
    })
});

router.get('/new', function(req,res){
    res.render('users/new');
})

router.post('/', function(req, res) {
    User.create(req.body, function(err, user){
        if (err) return res.json(err);
        res.redirect('/users')
    })
});

router.get('/:username', function(req,res) {
    User.findOne({username:req.params.username}, function(err, user){
        if (err) return res.json(err);
        res.render('users/show', {user:user});
    })
})

router.get('/:username/edit', function(req, res){
    User.findOne({username:req.params.username}, function(err, user){
        if (err) return res.json(err);
        res.render('users/edit', {user:user})
    })
})

router.put('/:username', function(req, res, next){
    User.findOne({username:req.params.username})
    .select('password')
    .exec(function(err, user){
        if (err) return res.json(err);

        user.originalPassword = user.password;
        user.password = req.body.newPassword? req.body.newPassword : user.password;
        for (var p in req.body) {
            user[p] = req.body[p]
        }

        user.save(function(err, user){
            if (err) return res.json(err);
            res.redirect('/users/'+ user.username);
        });
    })
})

router.delete('/:username', function(req, res){
    User.deleteOne({username:req.params.username}, function(err){
        if (err) return req.json(err);
        res.redirect('/users');
    })
})

module.exports = router;