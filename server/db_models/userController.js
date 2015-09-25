var Sequelize = require('sequelize');
var User = require('./userModel.js');
var KnownTag = require('./knownTagsModel.js');
var Project = require('./projectModel.js');
var Tag = require('./tagModel.js');

var userController = {};

userController.getProfile = function (req, res) {
  User.findOne({where: {githubID: req.cookies.githubID, token: req.cookies.token},
    include: [{model: Tag, as: 'known'}, {model: Tag, as: 'want'}, {model: Project, as: 'ownedproject'}]}).done(function (user) {
    res.send(user);
  })
};

userController.allUsers = function (req, res) {
  User.findAll({attributes: ['username']}).done(function (users) {
    res.send(users);
  })
}

userController.profileByName = function (req, res) {

  //console.log('request for ', req.params.name);
  User.findOne({where: {username: req.params.name},
    include: [{model: Tag, as: 'known'}, {model: Tag, as: 'want'}, {model: Project, as: 'ownedproject', include: [{model: User, as: 'projectowner'}]}]}).done(function (user) {
    res.send(user);
  })
};

userController.updateProfile = function (req, res) {
  User.findOne({where: {githubID: req.cookies.githubID}}).done(function (user) {
    if (req.body.teacher === "true") {
      var teacher = true;
    }
    else {
      var teacher = false;
    }
    if (req.body.student === "true") {
      var student = true;
    }
    else {
      var student = false;
    }
    if (req.body.collaborator === "true") {
      var collaborator = true;
    }
    else {
      var collaborator = false;
    }
    user.updateAttributes({
      teacher: teacher,
      student: student,
      collaborator: collaborator
    }).done(function (user) {
      var tags = req.body.have.split(',');
      for (var i = 0; i < tags.length; i++) {
        if (tags[i] === ' ') {
          continue;
        }
        Tag.findOrCreate({where: {tagName: tags[i]}}).spread(function (tag) {
          tag.addKnown(user).then(function() {
            user.addKnown(tag);
          })
        })
      }
      var tags2 = req.body.want.split(',');
      for (var j = 0; j < tags2.length; j++) {
        if (tags2[j] === ' ') {
          continue;
        }
        Tag.findOrCreate({where: {tagName: tags2[j]}}).spread(function (tag2) {
          tag2.addWant(user).then(function() {
            user.addWant(tag2);
          })
        })
      }
      res.end();
    });
  })
};

module.exports = userController;
