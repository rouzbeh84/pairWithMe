var Sequelize = require('sequelize');
var User = require('./userModel.js');
var KnownTag = require('./knownTagsModel.js');
var Project = require('./projectModel.js');
var Tag = require('./tagModel.js');

var userController = {};



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
    });
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

module.exports = userController;
