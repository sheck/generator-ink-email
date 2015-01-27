'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var InkEmailGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  writing: {
    app: function () {
      this.dest.mkdir('source');
      this.dest.mkdir('source/images');

      this.copy('_package.json', 'package.json');
      this.copy('_bower.json', 'bower.json');
      this.copy('gitignore', '.gitignore');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('Gruntfile.js', 'Gruntfile.js');
      this.directory('source', 'source');
    }
  },

  install: function () {
    this.spawnCommand('gem', ['install', 'premailer']);
    this.installDependencies();
  }
});

module.exports = InkEmailGenerator;
