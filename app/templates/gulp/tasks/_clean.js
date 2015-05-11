/**
 * Clean Taslk
 */

const gulp = require('gulp')
const config = require('../config')
const clean = require('gulp-clean')

gulp.task('clean', ['clean:tmp', 'clean:bundle'<% if(options.bUseParse) { %>, 'clean:parse'<% } %>])

gulp.task('clean:tmp', function() {
    return gulp.src(config.tmp, {read: false})
               .pipe(clean())
})

gulp.task('clean:bundle', function() {
    return gulp.src(config.dest, {read: false})
               .pipe(clean())
})
<% if(options.bUseParse) { %>
gulp.task('clean:parse', function() {
    return gulp.src(config.parse.dest, {read: false})
               .pipe(clean())
})
<% } %>
