/**
 * Bundle Task
 */

const gulp = require('gulp')

gulp.task('bundle', ['html:bundle', 'js:bundle', 'css:bundle', 'images:bundle', 'bower:bundle', 'vendor:bundle'])
