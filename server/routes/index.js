var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var passportLinkedIn = require('../auth/linkedin');
var passportGithub = require('../auth/github');
var passportTwitter = require('../auth/twitter');
var passportFacebook = require('../auth/facebook');
var passportTumblr = require('../auth/tumblr');
var passportYahoo = require('../auth/yahoo');
var passportGoogle = require('../auth/google');
var passportWindowsLive=require('../auth/windowslive');
var passportDropbox =require('../auth/dropbox');
var config = require('../_config');

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

router.post('/api/auth/twitter',function(req, res) {
          
          passport.use(new TwitterStrategy({
                    consumerKey: req.body.appid,
                    consumerSecret: req.body.appsecret,
                    callbackURL: req.body.callbackurl
                  },
                  function(accessToken, refreshToken, profile, done) {
                    console.log("here");
                    var searchQuery = {
                      name: profile.displayName
                    };

                    var updates = {
                      name: profile.displayName,
                      someID: profile.id,
                      accessToken: accessToken
                    };

                    var options = {
                      upsert: true
                    };
                    

                    // update the user if s/he exists or add a new user
                    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
                      if(err) {
                        return done(err);
                      } else {
                        return done(null, user);
                      }
                    });
                  }

                ));
          init();
        

});

//router.get('/auth/twitter/:token', passportTwitter.authenticate('twitter'));

router.post('/auth/twitter/', function(req, res, next){
  console.log("fun call");
  //next();
//console.log("query" + req.query.token);
//console.log("param" + req.params.token);
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token'];
  //req.Origin="https://gluu.local.org";
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, "GluuNodeServerSocialLogin1234567890", function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
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
}, passportTwitter.authenticate('twitter'));


router.use('/auth/twitter/callback',passportTwitter.authenticate('twitter'),
  function(req, res) {
    

    var queryUserString = encodeURIComponent(JSON.stringify(req.user));
    console.log(queryUserString);
    //var string = JSON.stringify(req.user);
    var s = decodeURIComponent(queryUserString);
    console.log(s);
  res.redirect(config.applicationEndpoint + '?user=' + queryUserString);
  });


router.get('/auth/twitter/:token', function(req, res, next){
  //console.log(req);
  //next();
//console.log("query" + req.query.token);
//console.log("param" + req.params.token);
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token'];
  //req.Origin="https://gluu.local.org";
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, "GluuNodeServerSocialLogin1234567890", function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
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
}, passportTwitter.authenticate('twitter'));


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
  
router.get('/auth/google/', passportGoogle.authenticate('google',{ scope: 'https://www.google.com/m8/feeds' }));

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
