var express = require('express'),
  app = express(),
  Sequelize = require('sequelize'),
  config = require('config'),
  http = require('http'),
  path = require('path'),
  bodyParser = require('body-parser').urlencoded({ extended: true }),
  passport = require('./oauth.js');

sequelize = new Sequelize(config.get('database.database'), config.get('database.user'), config.get('database.password'), {
  dialect: 'postgres',
  host: config.get('database.host'),
  port: 5432,
  dialectOptions: {
    ssl: true
  },
  logging: false
});

var  User = require('./db_models/userModel.js'),
  Tag = require('./db_models/tagModel.js'),
  Project = require('./db_models/projectModel.js');

Tag.belongsToMany(User, {through: 'usertag'});
User.belongsToMany(Tag, {through: 'usertag'});
Project.belongsToMany(User, {through: 'userproject'});
User.belongsToMany(Project, {through: 'userproject'});

sequelize.sync().then(function () {
  return console.log("database has synced");
});

app.use('/', express.static(__dirname + '/../client'));
app.use(bodyParser);
app.use(passport.initialize());
app.use(passport.session());

/** loading home page */
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

/** request for login, redirects to github.com */
app.get('/auth/github', passport.authenticate('github'), function(req,res) {
  //request will redirect to Githib for authentication
});

/** authenticates callback */
app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: 'login'}), function(req,res) {
  //on success authentication
  // console.log(req.user);
  User.findOrCreate({where: {username: req.user.username}, defaults: {
    githubID: req.user.id, githubProfileURL: req.user.profileUrl,
    githubProfileImage: req.user.profilePic, token: req.user.token, email: req.user.email}}).spread(function(user, created) {
      res.cookie('githubID', user.githubID);
      res.cookie('token', user.token);
      // res.cookie('githubProfileURL', user.githubProfileURL);
      // res.cookie('githubProfileImage', user.githubProfileImage);
      // res.cookie('email', user.email);
    if (created === true) {
      res.redirect('/profileForm');
    }
    else {
      res.redirect('/profile');
    }
  })
});

app.get('/profile/:number', function (req, res) {
  User.findOne({where: {id: req.params.number}}).done(function (userProfile) {
    console.log(userProfile);
    res.send(userProfile)
  })
});

app.post('/createProject', function (req, res) {
  Project.create({projectName: req.body.projectName, githubLink: req.body.githubLink, description: req.body.description});
});

app.post('/updateProject', function (req, res) {
  Project.findOne({where: {id: req.body.projectid} }).on('success', function (project) {
    project.updateAttributes({
      description: req.body.description
    }).success(function () {
      console.log("updated project " + project.id);
    });
  });
});

app.get('/recentProjects/:number', function (req, res) {
  Project.findOne({where: {id: req.params.number}}).done(function (project) {
    console.log(project);
    res.send(project);
  })
});

app.get('/tags', function (req, res) {
  Tag.findAll({attributes:['tagName']}).done(function (tags) {
    res.send(tags);
  })
});

app.post('/tags', function (req, res) {
  for (var i = 0; i < req.tags.length; i++) {
    Tag.findOrCreate({tagName: req.tags[i].tagName});
  }
})

/** ends session*/
// app.get('/logout', function(req,res) {
//   req.logout();
//   res.redirect('/');
// });

// app.get('/profile' function(req,res) {
//   User.findOne({
//     where: {
//       username:
//     }
//   })
// })

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
