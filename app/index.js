'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');
var assign = Object.assign || require('object.assign');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
        this.props = {};
    },

    prompting: {
        askForBasicInformation: function() {
            var done = this.async();

            // Have Yeoman greet the user.
            this.log(yosay(
                'Welcome to the spectacular ' + chalk.red('AotokiReactJS') + ' generator!'
            ));

            var prompts = [{
                name: 'appname',
                message: 'Application Name:',
                default: this.appname,
                store: true
            }];

            this.prompt(prompts, function(props) {
                this.appname = props.appname;
                done();
            }.bind(this));
        },

        askForDependiences: function() {
            var done = this.async();

            /*
             *{
                type: 'confirm',
                name: 'bUseFlux',
                message: 'Use Flux?',
                default: true
            },
            */

            this.props.bUseFlux = false; // Not support now

            var prompts = [{
                type: 'confirm',
                name: 'bUseParse',
                message: 'Use Parse?',
                default: false
            }, {
                type: 'input',
                name: 'ParseAppID',
                message: 'Parse Application ID',
                when: function(props) {
                    return props.bUseParse;
                }
            }, {
                type: 'input',
                name: 'ParseMasterKey',
                message: 'Parse APP Master Key (Use for deploy): ',
                when: function(props) {
                    return props.bUseParse;
                }
            }, {
                type: 'input',
                name: 'ParseJavaScriptKey',
                message: 'Parse APP JavaScript Key: ',
                when: function(props) {
                    return props.bUseParse;
                }
            }];

            this.prompt(prompts, function (props) {
                this.props = assign({}, this.props, props);
                // To access props later use this.props.someOption;
                done();
            }.bind(this));
        },

        askForConfigure: function() {
            var done = this.async();

            var prompts = [
                {
                    type: 'confirm',
                    name: 'bUseSass',
                    message: 'Use Sass?',
                    default: true
                }
            ];

            this.prompt(prompts, function(props) {
                this.props = assign({}, this.props, props);

                 done();
            }.bind(this));
        }
    },

    writing: {
        app: function () {
            var data = {
                appname: _s.slugify(this.appname),
                options: this.props
            }
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                data
            );
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),
                data
            );

            this.copy('_gitignore', '.gitignore');

            this.template('app/_app.js', 'app/app.js', { options: this.props });
            this.template('app/__tests__/app-test.js');
            this.template('app/components/Application.js');

            this.template('html/_index.html', 'html/index.html', { options: this.props });

            if(this.props.bUseSass) {
                this.template('_app.css', 'sass/app.scss');
            } else {
                this.template('_app.css', 'css/app.css');
            }

            this.copy('_gitkeep', 'images/.gitkeep');
            this.copy('_gitkeep', 'vendor/.gitkeep');
        },

        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
        },

        gulp: function() {
            this.template('gulpfile.js');
            this.template('gulp/index.js');
            this.template('gulp/_config.js', 'gulp/config.js', { options: this.props }, { interpolate: /<%=([\s\S]+?)%>/g }); // Fix ES6 template

            this.template('gulp/tasks/default.js');
            this.template('gulp/tasks/watch.js');
            this.template('gulp/tasks/vendor.js');
            this.template('gulp/tasks/image.js');
            this.template('gulp/tasks/bundle.js');
            this.template('gulp/tasks/help.js');

            this.template('gulp/tasks/bower.js');
            this.template('gulp/tasks/html.js');

            this.template('gulp/tasks/_clean.js', 'gulp/tasks/clean.js', { options: this.props });

            this.template('gulp/tasks/_javascript.js', 'gulp/tasks/javascript.js', { options: this.props });
            this.template('gulp/tasks/_css.js', 'gulp/tasks/css.js', { options: this.props });
        },

        parse: function() {
            if(!this.props.bUseParse) { return; }

            this.template('gulp/tasks/parse.com.js');
            this.template(
                '_env',
                '.env', {
                    appname: _s.classify(this.appname),
                    appId: this.props.ParseAppID,
                    masterKey: this.props.ParseMasterKey,
                    jsKey: this.props.ParseJavaScriptKey
                }
            )

            this.template('parse/cloud/main.js', 'cloud/main.js');
            this.copy('parse/config/global.json');
        }
    },

    install: function () {
        this.installDependencies();
    }
});
