var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    request_module = require('request'),
    config = require('config');
    // Sequelize = require('sequelize'),
    // User = require('./db_models/userModel.js');

/** request to github using oauth, if successful it will redirect
  * to the callback route. on success it will run the callback function
  * which sends ANOTHER request to the API for the user email
  * in order to do so, we pause the asynchronous reading.
  * on success of the email request, we resume and create an object to
  * hold the wanted data retrieved from both requests.**/
passport.use(new GitHubStrategy({
  clientID: process.env.OAUTH_CLIENT_ID || config.get('oAuth.clientID'),
  clientSecret:process.env.OAUTH_CLIENTSECRET || config.get('oAuth.clientSecret') ,
  scope: ['user:email'],
  callbackURL: 'http://localhost:3000/auth/github/callback',
  userAgent: 'pairWithMe'
},
function(accessToken, refreshToken, profile, done) {
  var userObj = {};
  userObj.id = profile.id;
  userObj.username = profile.username;
  userObj.email = profile._json.email;
  userObj.profileUrl = profile.profileUrl;
  userObj.profilePic = profile._json.avatar_url;
  userObj.token = accessToken;

  /*sends second request for user emails if their email is not public info*/
  if(!userObj.email) {
    var options = {
      url: 'https://api.github.com/user/emails?access_token='+accessToken,
      headers: {
        'User-Agent': 'pairWithMe'
      },
      json: true
    };
    request_module(options, function(err, res, body) {
      if(!err && res.statusCode === 200) {
        userObj.email = body[0].email;
        console.log('i think the user should save DB here')
        signIn(userObj); //saves to database
        return done(null,userObj);
      }
      else{
        console.log('error in request',res.statusCode);
        return done(err);
      }

    });
  }
  else {
    console.log('does it reach down here?');
    signIn(userObj); //saves to database
    return done(null, userObj);
  }

}));

 function signIn(userObj) {
  User.findOrCreate({where: {username: userObj.username}, defaults: {
    githubID: userObj.id, githubProfileURL: userObj.profileUrl,
    githubProfileImage: userObj.profilePic, token: userObj.token, email: userObj.email}}).spread(function(user, created) {
    //  res.cookie('githubID', user.githubID);
      //res.cookie('token', user.token);
    if (created === true) {
      res.redirect('/profileEditor');
    }
  })
  return;
};

/** Github login
  * serializeuser stores the user id in the session
  * deserializeuser gets the user from database and store it in req.user */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({where: {githubID: id}}).done(function (userProfile) {
    done(null, userProfile);
  });

});

module.exports = passport;
