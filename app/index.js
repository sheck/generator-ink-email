'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var InkEmailGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'confirm',
      name    : 'uncss',
      message : 'Would you like to use UNCSS?',
      default : true
    }, function (answers) {
      this.uncss = answers.uncss;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('source');

      this.copy('_package.json', 'package.json');
      this.copy('_bower.json', 'bower.json');
      this.copy('bowerrc', '.bowerrc');
      this.copy('gitignore', '.gitignore');
    },

    gruntfile: function () {
      this.template('Gruntfile.js');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.directory('source', 'source');
    }
  },

  install: function () {
    this.spawnCommand('gem', ['install', 'premailer']);
    this.installDependencies();
  }
});

module.exports = InkEmailGenerator;
