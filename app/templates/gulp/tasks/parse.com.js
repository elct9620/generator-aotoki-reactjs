/**
 * Parse.com Helper
 */

require('dotenv').load()

const gulp = require('gulp')
const config = require('../config')
const parseConfig = config.parse
const template = require('gulp-template')
const size = require('gulp-size')
const shell = require('gulp-shell')


gulp.task('parse:config', function() {
    return gulp.src(parseConfig.config)
               .pipe(template(process.env))
               .pipe(gulp.dest(parseConfig.dest))
               .pipe(size({title: 'parse:config'}))
})


gulp.task('parse:cloud', function() {
    return gulp.src(parseConfig.cloud)
               .pipe(gulp.dest(`${parseConfig.dest}/cloud`))
               .pipe(size({title: 'parse:cloud'}))
})

gulp.task('parse:prepare', ['bundle', 'parse:cloud', 'parse:config'], function() {
    return gulp.src(`${config.dest}/**/*`)
               .pipe(gulp.dest(`${parseConfig.dest}/public`))
               .pipe(size({title: 'parse:prepare'}))
})

gulp.task('parse:deploy', ['parse:prepare'], shell.task([
    `cd ${parseConfig.dest} && parse deploy`,
]))
