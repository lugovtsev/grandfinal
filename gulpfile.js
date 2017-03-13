'use strict';
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const multipipe = require('multipipe');
const uglify = require('gulp-uglify');
const ftp = require('gulp-ftp');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('clean', function() {
  return del(['public/**','!public']);
});

gulp.task('scripts', function() {
  return gulp.src('frontend/js/*.*')
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function(file) {
  return multipipe(
      gulp.src('frontend/styles/*.*'),
      debug({title :'src-deb'}),
      sourcemaps.init(),
      debug({title :'sourmapinit-deb'}),
      //gulpif(file.extname == 'less', less()),
      gulpif(true, less()),
      debug({title :'gulpifless-deb'}),
      concat('all.css'),
      debug({title :'concat-deb'}),
      sourcemaps.write(),
      debug({title :'sourmapwrite-deb'}),
      gulp.dest('public/css')
  ).on('error', notify.onError());
});

gulp.task('assets', function() {
  return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
      .pipe(newer('public'))
      .pipe(debug({title: 'assets'}))
      .pipe(gulp.dest('public'));
});

// gulp.task('default', gulp.series('clean', 'assets', 'styles', 'scripts')
// );

gulp.task('watch', function() {
  gulp.watch('frontend/styles/*.less', gulp.series('styles'));
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
  gulp.watch('frontend/js/*.js', gulp.series('scripts'));
//  gulp.watch('public/**/*.*', gulp.series('ftp'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('assets','styles', 'scripts'))
);

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);

gulp.task('ftp', function() {
  return gulp.src('public/**/*.*')
      .pipe(ftp({
          host: 'lugovc.beget.tech',
          user: 'lugovc_todolist',
          pass: '9I%50}}*'
        }))
      .pipe(debug({title: 'to-ftp'}))
      .pipe(gutil.noop());
});
