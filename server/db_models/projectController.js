var Sequelize = require('sequelize');
var Project = require('./projectModel.js');
var User = require('./userModel.js');

var ProjectController = {};

ProjectController.updateProject = function (req, res) {
  Project.findOne({where: {id: req.body.projectid} }).on('success', function (project) {
    project.updateAttributes({
      description: req.body.description
    }).success(function () {
      console.log("updated project " + project.id);
    });
  });
};

//this should have an include to look up the user
ProjectController.recentProjects = function (req, res) {
  Project.findOne({where: {id: req.params.number}, include: [{model: User,as: 'projectowner'}]}).done(function (project) {
    res.send(project);
  })
};

module.exports = ProjectController;
