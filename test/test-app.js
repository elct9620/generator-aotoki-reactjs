'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('ReactJS:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
        .withOptions({ skipInstall: true })
        .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'bower.json',
            'package.json',
            '.editorconfig',
            '.jshintrc'
        ]);
    });

    it('setup gulp', function() {
        assert.file([
            'gulpfile.js',
            'gulp/index.js',
            'gulp/config.js',
            'gulp/tasks/default.js',
            'gulp/tasks/watch.js',
            'gulp/tasks/vendor.js',
            'gulp/tasks/image.js',
            'gulp/tasks/bundle.js',
            'gulp/tasks/help.js',
            'gulp/tasks/bower.js',
            'gulp/tasks/html.js',
            'gulp/tasks/clean.js',
            'gulp/tasks/javascript.js',
            'gulp/tasks/css.js'
        ]);
    });
});

describe('ReactJS with Parse:app', function() {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
        .withOptions({ skipInstall: true })
        .withPrompts({ bUseParse: true })
        .on('end', done);
    });

    it('include Parse task', function() {
        assert.file([
            'gulp/tasks/parse.com.js'
        ])
    });

    it('app/app.js include Parse initialize code', function() {
        assert.fileContent('app/app.js', /Parse.initialize\(.+?\)/)
    });

    it('include environment file', function() {
        assert.file('.env');
    });

    it('gulp tasks work with parse', function() {
        assert.fileContent('gulp/tasks/clean.js', /clean:parse/);
    });
});

describe('ReactJS without Sass:app', function() {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
        .withOptions({ skipInstall: true })
        .withPrompts({ bUseSass: false })
        .on('end', done);
    });

    it('should copy normal css file', function() {
       assert.file('css/app.css');
    });

    it('should not install gulp-sass', function() {
        assert.noFileContent('package.json', /gulp-sass/);
        assert.noFileContent('gulp/tasks/css.js', 'require(\'gulp-sass\')');
    });
});
