/**
 * Sass Task
 */

const gulp = require('gulp')
const gutil = require('gulp-util')
const config = require('../config').sass<% if(options.bUseSass) { %>
const sass = require('gulp-sass')<% } %>
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const size = require('gulp-size')
const reload = require('browser-sync').reload

gulp.task('css', function() {
    return  gulp.src(config.src)<% if(options.bUseScss) { %>
                .pipe(sourcemaps.init())
                .pipe(sass({
                    includePaths: config.includePaths,
                    imagePath: config.imagePath
                }))
                .on('error', gutil.log)
                .on('error', function() { this.emit('end') })
                .pipe(sourcemaps.write())<% } %>
                .pipe(autoprefixer())
                .pipe(gulp.dest(config.tmp))
                .pipe(size({ title: 'sass' }))
                .pipe(reload({stream: true}))
})

gulp.task('css:bundle', function() {
    return  gulp.src(config.src)<% if(options.bUseScss) { %>
                .pipe(sass({
                    includePaths: config.includePaths,
                    imagePath: config.imagePath,
                    outputStyle: 'compressed'
                }))
                .on('error', gutil.log)
                .on('error', function() { this.emit('end') })<% } %>
                .pipe(autoprefixer())
                .pipe(gulp.dest(config.dest))
                .pipe(size({ title: 'sass' }))
})
