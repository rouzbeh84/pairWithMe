var Tag = require('./tagModel.js');
var KnownTag = require('./knownTagsModel.js');
var TagController = require('./tagController.js');
var UserController = require('./userController.js');
var Project = require('./projectModel.js');

var controllerDirector = {};

controllerDirector.search = function (req, res) {
  User.findOne({where: {githubID: req.cookies.githubID, token: req.cookies.token},
  include: [{model: Tag, as: 'known'}, {model: Tag, as: 'want'}]}).done(function (user) {
    var whereQuery = {};
    var partner = req.body.partner.toLowerCase();
    var skill = 'want';
    if (partner === 'teacher') {
      skill = 'known';
    }
    whereQuery[partner] = true;
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
