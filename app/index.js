'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var FrontOMaticGenerator = module.exports = function FrontOMaticGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FrontOMaticGenerator, yeoman.generators.Base);

FrontOMaticGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // welcome message
    console.log(this.yeoman);
    console.log('Kaleidos Front-o-matic > Simple Front-end Development Framework');

    var prompts = [{
        name: 'appName',
        message: "What will be your app name?",
        default: "app"
    }];

    this.prompt(prompts, function (answers) {
        // `props` is an object passed in containing the response values, named in
        // accordance with the `name` property from your prompt object. So, for us:
        this.appName = answers.appName;

        cb();
    }.bind(this));
};

FrontOMaticGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};


FrontOMaticGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

FrontOMaticGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
    /*this.copy('gitattributes', '.gitattributes');*/
};

FrontOMaticGenerator.prototype.bower = function bower() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

FrontOMaticGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

FrontOMaticGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

FrontOMaticGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js', 'Gruntfile.js');
};

FrontOMaticGenerator.prototype.h5bp = function h5bp() {
    this.copy('favicon.ico', 'app/favicon.ico');
    this.copy('404.html', 'app/404.html');
    this.copy('robots.txt', 'app/robots.txt');
    this.copy('humans.txt', 'app/humans.txt');
    this.copy('htaccess', 'app/.htaccess');
};

FrontOMaticGenerator.prototype.lessCss = function lessCss() {
    if (this.less) {
        //less
        this.copy('main.less', 'app/styles/main.less');
        this.copy('colors.less', 'app/styles/libs/colors.less');
        this.copy('helpers.less', 'app/styles/libs/helpers.less');
        this.copy('reset.less', 'app/styles/libs/reset.less');
        this.copy('responsive.less', 'app/styles/libs/responsive.less');
        this.copy('typography.less', 'app/styles/libs/typography.less');
    } else {
        //CSS
        this.copy('main.css', 'app/styles/main.css');
    }
};

FrontOMaticGenerator.prototype.coffee = function coffee() {
    if (this.coffeeScript) {
        this.copy('base.coffee', 'app/scripts/base.coffee');
        this.copy('main.coffee', 'app/scripts/main.coffee');
    } else {
        this.copy('base.js', 'app/scripts/base.js');
        this.copy('main.js', 'app/scripts/main.js');
    }
};

FrontOMaticGenerator.prototype.appDir = function appDir() {

    this.mkdir('app');

    //HTML
    this.template('index.html', 'app/index.html');

    //less
    this.mkdir('app/styles');
    this.mkdir('app/styles/libs');

    //JS
    this.mkdir('app/scripts');
    this.mkdir('app/scripts/libs');

    //IMAGES
    this.mkdir('app/images');
};
