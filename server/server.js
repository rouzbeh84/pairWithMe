 var compression = require('compression'),
  express = require('express'),
  app = express(),
  session = require('express-session'),
  Sequelize = require('sequelize'),
  http = require('http'),
  path = require('path'),
  config = require('config'),
  passport = require('./oauth.js'),
  ensureAuthenticated = require('./ensureAuthenticated.js'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  express = require('express');


/*Connects to Database via sequalize ORM */
sequelize = new Sequelize(process.env.DATABASE || config.get('database.database'), process.env.DATABASE_USER || config.get('database.user'), process.env.DATABASE_PASSWORD || config.get('database.password'), {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST || config.get('database.host'),
  port: 5432,
  dialectOptions: {
    ssl: true
  },
  logging: false
});


/* inheriting database models + establishing the relations many to many*/
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

sequelize.sync().then(function () {
  return console.log("database has synced");
});

/* Seperated the server file into multiple files, inhering other files  */
var UserController = require('./db_models/userController.js');
var TagController = require('./db_models/tagController.js');
var ProjectController = require('./db_models/projectController.js');
var ControllerDirector = require('./db_models/controllerDirector.js');

// compress all requests
app.use(compression());

/* Setting up middleware */
app.use('/', express.static(__dirname + '/../client'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: false}));
app.use(passport.initialize()); //middleware to start passport
app.use(passport.session()); //used for persisten login

/** loading home page */
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});
/** request for login, redirects to github.com */
app.get('/auth/github', passport.authenticate('github'), function(req,res) {
  //request will redirect to Githib for authentication
});
/** authenticates callback */
app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: 'login'}), UserController.signIn);

app.post('/updateProfile', UserController.updateProfile);

app.get('/api/users', UserController.allUsers);

app.get('/api/profile', UserController.getProfile);

app.get('/api/profile/:name', UserController.profileByName);

app.post('/createProject', ProjectController.createProject);

app.get('/api/projects', ProjectController.getProjects);
app.get('/api/projects/:pageNumber', ProjectController.getProjects);

app.post('/updateProject', ProjectController.updateProject);

app.get('/recentProjects/:number', ProjectController.recentProjects);

app.get('/tags', TagController.getAllTags);

app.post('/tags', TagController.addTags);

app.post('/search', ControllerDirector.search);

app.get('/logout', function (req, res) {
  res.clearCookie('githubID');
  res.clearCookie('token');
  req.logout();
  res.redirect('/');
})

/* This is our initial get request for our html and allows us to remove the #
 It along with our work on the client side allows us to not reload the whole
 page on each route switch
 */
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html', { maxAge: 86400000 }));
});

app.use(express.static('client'));
app.listen(process.env.PORT || 80);
module.exports = app;
