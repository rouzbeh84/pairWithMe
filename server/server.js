var express = require('express'),
  app = express(),
  // morgan = require('morgan'),
  Sequelize = require('sequelize'),
  config = require('config'),
  http = require('http'),
  path = require('path'),
  passport = require('./oauth.js'),
  ensureAuthenticated = require('./ensureAuthenticated.js'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser');
  // .urlencoded({ extended: true }),
// app.use(morgan('combined'));
sequelize = new Sequelize(config.get('database.database'), config.get('database.user'), config.get('database.password'), {
  dialect: 'postgres',
  host: config.get('database.host'),
  port: 5432,
  dialectOptions: {
    ssl: true
  },
  logging: false
});

var User = require('./db_models/userModel.js');
var Tag = require('./db_models/tagModel.js');
var Project = require('./db_models/projectModel.js');
var KnownTag = require('./db_models/knownTagsModel.js');
var WantedTag = require('./db_models/wantedTagsModel.js');
var UserProject = require('./db_models/userProjectsModel.js');

Tag.belongsToMany(User, {as: 'known', through: 'knowntags'});
User.belongsToMany(Tag, {as: 'known', through: 'knowntags'});
Tag.belongsToMany(User, {as: 'want', through: 'wantedtags'});
User.belongsToMany(Tag, {as: 'want', through: 'wantedtags'});
Project.belongsToMany(User, {as: 'projectowner', through: 'userprojects'});
User.belongsToMany(Project, {as: 'ownedproject', through: 'userprojects'});

var UserController = require('./db_models/userController.js');
var TagController = require('./db_models/tagController.js');
var KnownTagController = require('./db_models/knownTagsController.js');
var WantedTagController = require('./db_models/wantedTagsController.js');
var ProjectController = require('./db_models/projectController.js');
//will need project controller

sequelize.sync().then(function () {
  return console.log("database has synced");
});

var ControllerDirector = require('./db_models/controllerDirector.js');

app.use('/', express.static(__dirname + '/../client'));
app.use(cookieParser());
app.use(bodyParser.json());
//app.use(express.session({secret: "feeling lost"}));
app.use(passport.initialize()); //middleware to start passport
app.use(passport.session()); //used for persisten login

/** middleware used to authenticate any route
  * checks if a cookie exist, if so it will display continue
  * onthe the next param when used. else it would redirect to the
  * ouath/github route that will redirect to the github page */
var authenticate = function(req,res,next) {
  if(!req.cookies.token) {
    res.redirect('/auth/github')
  }
  else {next();}
}


/** loading home page */
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

/** request for login, redirects to github.com */
app.get('/auth/github', passport.authenticate('github'), function(req,res) {
  //request will redirect to Githib for authentication
});

app.get('/test', ControllerDirector.getProfile);
/** authenticates callback */
app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: 'login'}), UserController.signIn);

app.post('/updateProfile', ControllerDirector.updateProfile);

app.get('/api/users', UserController.allUsers);

app.get('/api/profile',authenticate,ControllerDirector.getProfile);

/* this route is authenticated, user must have cookie before diplaying profile*/
app.get('/api/profile/:name',authenticate, UserController.profileByName);

app.post('/createProject', ControllerDirector.createProject);

app.get('/api/projects', ControllerDirector.getProjects);
app.get('/api/projects/:pageNumber', ControllerDirector.getProjects);

app.post('/updateProject', ProjectController.updateProject);

app.get('/recentProjects/:number', ProjectController.recentProjects);

app.get('/tags', TagController.getAllTags);

app.post('/tags', TagController.addTags);

app.post('/knowntags', KnownTagController.addTags);

app.post('/search', ControllerDirector.search);

app.get('/logout', function (req, res) {
  res.clearCookie('githubID');
  res.clearCookie('token');
  res.redirect('/');
})



/* This is our initial get request for our html and allows us to remove the #
 It along with our work on the client side allows us to not reload the whole
 page on each route switch
 */
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.use(express.static('client'));
app.listen(process.env.PORT || 3000);
module.exports = app;
