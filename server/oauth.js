var passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    config = require('config'),
    request_module = require('request');

/** request to github using oauth, if successful it will redirect
  * to the callback route. on success it will run the callback function
  * which sends ANOTHER request to the API for the user email
  * in order to do so, we pause the asynchronous reading.
  * on success of the email request, we resume and create an object to
  * hold the wanted data retrieved from both requests.**/
passport.use(new GitHubStrategy({
  clientID: config.get('oAuth.clientID'),
  clientSecret: config.get('oAuth.clientSecret'),
  scope: ['user:email'],
  callbackURL: 'http://107.170.249.202:3000/auth/github/callback',
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
        return done(null,userObj);
      }
      else{
        console.log('error in request',res.statusCode);
        return done(err);
      }
    });
  }
  else {
    return done(null, userObj);
  }
}));

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
