/**
 * HTML Task
 */

const gulp = require('gulp')
const config = require('../config').html
const size = require('gulp-size')

gulp.task('html', function() {
    return gulp.src(config.src)
               .pipe(gulp.dest(config.tmp))
               .pipe(size({title: 'html'}))
})

gulp.task('html:bundle', function() {
    return gulp.src(config.src)
               .pipe(gulp.dest(config.dest))
               .pipe(size({title: 'html'}))
})
