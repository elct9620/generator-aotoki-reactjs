/**
 * Vendor Task
 */

const gulp = require('gulp')
const config = require('../config').vendor
const size = require('gulp-size')

gulp.task('vendor', function() {
    return gulp.src(config.src)
               .pipe(gulp.dest(config.tmp))
               .pipe(size({ title: 'vendor' }))
})

gulp.task('vendor:bundle', function() {
    return gulp.src(config.src)
               .pipe(gulp.dest(config.dest))
               .pipe(size({ title: 'vendor' }))
})
