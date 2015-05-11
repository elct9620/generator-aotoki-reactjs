/**
 * Image Task
 */

const gulp = require('gulp')
const config = require('../config').images
const imagemin = require('gulp-imagemin')
const size = require('gulp-size')

gulp.task('images', function() {
    return gulp.src(config.src)
               .pipe(imagemin({
                   progressive: true,
                   interlaced: true
               }))
               .pipe(gulp.dest(config.tmp))
               .pipe(size({title: 'image'}))
})

gulp.task('images:bundle', function() {
    return gulp.src(config.src)
               .pipe(imagemin({
                   progressive: true,
                   interlaced: true
               }))
               .pipe(gulp.dest(config.dest))
               .pipe(size({title: 'image'}))
})
