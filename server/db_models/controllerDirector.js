var Tag = require('./tagModel.js');
var KnownTag = require('./knownTagsModel.js');
var TagController = require('./tagController.js');
var UserController = require('./userController.js');
var Project = require('./projectModel.js');

var controllerDirector = {};

controllerDirector.updateProfile = function (req, res) {
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

controllerDirector.getProfile = function (req, res) {
  User.findOne({where: {githubID: req.cookies.githubID, token: req.cookies.token},
    include: [{model: Tag, as: 'known'}, {model: Tag, as: 'want'}, {model: Project, as: 'ownedproject'}]}).done(function (user) {
    res.send(user);
  })
};

controllerDirector.createProject = function(req, res) {
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
              user2.addOwnedproject(project).then(function () {
                project.addProjectowner(user2);
              })
            })
          })
        })
      })
      var id = project.id + '';
      res.send(id);
    })
}

controllerDirector.getProjects = function (req, res) {
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

controllerDirector.search = function (req, res) {
  User.findOne({where: {githubID: req.cookies.githubID, token: req.cookies.token},
  include: [{model: Tag, as: 'known'}, {model: Tag, as: 'want'}]}).done(function (user) {
    console.log(user);
    var whereQuery = {};
    var partner = req.body.partner.toLowerCase();
    var skill = 'want';
    if (partner === 'teacher') {
      skill = 'known';
    }
    whereQuery[partner] = true;
    console.log(whereQuery);
    Tag.findOne({where: {tagName: req.body.tag},
    include: [{model: User, as: skill, where: whereQuery, include: [{model: Tag, as: 'known'}, {model: Tag, as: 'want'}]}]}).done(function (tag) {
      var preSort = [];
      if (!tag || !tag[skill]) {
        return res.end();
      }
      for (var i = 0; i < tag[skill].length; i++) {
        preSort[i] = {};
        preSort[i].value = 0;
        if (user.id === tag[skill][i].id) {
          preSort[i].value = null;
          continue;
        }
        preSort[i].person = tag[skill][i];
        preSort[i].value = 0;
        for (var j = 0; j < user.want.length; j++) {
          for (var k = 0; k < tag[skill][i].want.length; k++) {
            if (user.want[j].id == tag[skill][i].want[k].id) {
              preSort[i].value++;
            }
          }
        }
        for (var j = 0; j < user.known.length; j++) {
          for (var k = 0; k < tag[skill][i].known.length; k++) {
            if (user.known[j].id == tag[skill][i].known[k].id) {
              preSort[i].value++;
            }
          }
        }
      }
      preSort.sort(function (a, b) {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      })
      if (preSort.length === 0) {
        res.end();
      }
      if (preSort[preSort.length -1].value == null) {
        preSort.length--;
      }
      res.send(preSort);
    })
  })
}

module.exports = controllerDirector;
