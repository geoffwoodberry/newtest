var Account  = require('../models/account');
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', user : req.user });
});

router.get('/register', function(req, res) {
	res.render('register', {message: req.flash('signupMessage')});
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
        	console.log(err);
            return res.render('register', { message : err, account : account });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
  });

router.get('/login', function(req, res) {
	res.render('login', {user : req.user, message: req.flash('loginMessage')});
});

// process the login form
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login', // see text
  failureFlash: true // optional, see text as well
}));


router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
