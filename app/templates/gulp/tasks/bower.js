/**
 * Bower Task
 */

const gulp = require('gulp')
const config = require('../config').bower
const bower = require('gulp-bower')
const size = require('gulp-size')

gulp.task('bower:bundle', function() {
    if(!config.enable) { return }
    return bower()
           .pipe(gulp.dest(config.dest))
           .pipe(size({title: 'bower'}))
})
