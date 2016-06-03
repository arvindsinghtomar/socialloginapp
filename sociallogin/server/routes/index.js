var express = require('express');
var router = express.Router();

var passportLinkedIn = require('../auth/linkedin');
var passportGithub = require('../auth/github');
var passportTwitter = require('../auth/twitter');
var passportFacebook = require('../auth/facebook');
var passportTumblr = require('../auth/tumblr');
var passportYahoo = require('../auth/yahoo');
var passportGoogle = require('../auth/google');
var passportWindowsLive=require('../auth/windowslive');
var passportDropbox =require('../auth/dropbox');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

router.get('/auth/twitter', passportTwitter.authenticate('twitter',{session:false}));
router.get('/auth/twitter/callback',passportTwitter.authenticate('twitter',{session:false}),
  function(req, res) {
    // Successful authentication
    console.log(req.user);
    res.json(req.user);
  });

  
  
router.get('/auth/facebook', passportFacebook.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });
  
 router.get('/auth/tumblr', passportTumblr.authenticate('tumblr'));

router.get('/auth/tumblr/callback',
  passportTumblr.authenticate('tumblr', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });
  
  
router.get('/auth/yahoo', passportYahoo.authenticate('yahoo'));

router.get('/auth/yahoo/callback',
  passportYahoo.authenticate('yahoo', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });
  
router.get('/auth/google', passportGoogle.authenticate('google',{ scope: ['profile'] }));

router.get('/auth/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });
  
 router.get('/auth/windowslive', passportWindowsLive.authenticate('windowslive'));

router.get('/auth/windowslive/callback',
  passportWindowsLive.authenticate('windowslive'),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });
  
  
  router.get('/auth/dropbox', passportDropbox.authenticate('dropbox'));

router.get('/auth/dropbox/callback',
  passportGoogle.authenticate('dropbox'),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });
  
  
  

module.exports = router;
