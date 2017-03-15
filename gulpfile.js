'use strict';
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const multipipe = require('multipipe');
const uglify = require('gulp-uglify');
const ftp = require('gulp-ftp');
const gutil = require('gulp-util');
const rigger = require('gulp-rigger');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
/*
clean
movesrc
img
html
styles
scripts
watch
serve
ftp-dev
ftp-prod
*/


gulp.task('clean', function() {
  return del(['public/**','!public']);
});

gulp.task('movesrc', function() {
  return gulp.src('frontend/src', {since: gulp.lastRun('movesrc')})
      .pipe(newer('public'))
      .pipe(gulp.dest('public'));
});

gulp.task('html', function() {
  return gulp.src('frontend/html/*.html')
      .pipe(rigger())
      .pipe(gulp.dest('public'));
});

gulp.task('scripts', function() {
  return gulp.src('frontend/scripts/main.js')
      .pipe(rigger())
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function(file) {
  return multipipe(
      gulp.src('frontend/styles/main.less'),
      sourcemaps.init(),
      less(),
      sourcemaps.write(),
      gulp.dest('public/css')
  ).on('error', notify.onError());
});

// gulp.task('watch', function() {
//   gulp.watch('frontend/assets/**/*.html', gulp.series('html'));
//   gulp.watch('frontend/styles/*.less', gulp.series('allcss'));
//   gulp.watch('frontend/src/**/*.*', gulp.series('movesrc'));
//   gulp.watch('frontend/js/common.js', gulp.series('commonjs'));
// });
//
// gulp.task('serve', function() {
//   browserSync.init({
//     server: 'public'
//   });
//   browserSync.watch('public/**/*.*').on('change', browserSync.reload);
// });
//
// gulp.task('build', gulp.series(
//     'clean',
//     gulp.parallel('html','assets','libscss', 'allcss', 'libsjs', 'commonjs'))
// );
//
// gulp.task('dev',
//     gulp.series('build', gulp.parallel('watch', 'serve'))
// );

// gulp.task('ftp', function() {
//   return gulp.src('public/**/*.*')
//       .pipe(ftp({
//           host: 'lugovc.beget.tech',
//           user: 'lugovc_todolist',
//           pass: '9I%50}}*'
//         }))
//       .pipe(debug({title: 'to-ftp'}))
//       .pipe(gutil.noop());
// });
