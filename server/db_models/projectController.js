var Sequelize = require('sequelize');
var Project = require('./projectModel.js');
var User = require('./userModel.js');

var ProjectController = {};

ProjectController.createProject = function(req, res) {
  Project.create({
    projectName: req.body.name,
    githubLink: req.body.github,
    description: req.body.description,
    tools: req.body.tools,
    learned: req.body.learn}).done( function(project) {
      User.findOne({where: {githubID: req.cookies.githubID}}).done(function(user1) {
        User.findOne({where: {username: req.body.partner}}).done(function(user2) {
          user1.addOwnedproject(project).done(function () {
            project.addProjectowner(user1).then(function () {
              if (user2) {
                user2.addOwnedproject(project).then(function () {
                  project.addProjectowner(user2);
                })
              }
            })
          })
        })
      })
      var id = project.id + '';
      res.send(id);
    })
}

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

ProjectController.getProjects = function (req, res) {
  if (req.params.pageNumber) {
    offset = (req.params.pageNumber - 1) * 10;
  }
  else {
    offset = 0;
  }
  Project.findAll({limit:10, include: [{model: User, as: 'projectowner'}], order: [['id', 'desc']], offset: offset}).done(function (projects) {
     res.send(projects);
  });
}

module.exports = ProjectController;
