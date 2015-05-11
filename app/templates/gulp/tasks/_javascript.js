/**
 * Browserify Task
 */
<% if(options.bUseParse) { %>
require('dotenv').load()
<% } %>
const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config').javascript
const browserify = require('gulp-browserify')
const uglify = require('gulp-uglify')
const template = require('gulp-template')
const size = require('gulp-size')

gulp.task('js', function() {
    return gulp.src(config.entry)
               .pipe(browserify({
                   transform: ['babelify'],
                   debug: true
               }))
               .on('error', gutil.log)<% if(options.bUseParse) { %>
               .pipe(template(process.env))<% } %>
               .pipe(gulp.dest(config.tmp))
               .pipe(size({title: 'javascript'}))
})

gulp.task('js:bundle', function() {
    return gulp.src(config.entry)
               .pipe(browserify({
                   transform: ['babelify'],
                   debug: false
               }))
               .pipe(uglify())<% if(options.bUseParse) { %>
               .pipe(template(process.env))<% } %>
               .pipe(gulp.dest(config.dest))
               .pipe(size({title: 'javascript'}))
})
