'use strict';
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const multipipe = require('multipipe');
const uglify = require('gulp-uglify');
const rigger = require('gulp-rigger');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const mmq = require('gulp-merge-media-queries');
const browserSync = require('browser-sync').create();

gulp.task('clean', function() {
  return del(['public/**','!public','!public/images/**']);
});

gulp.task('all_clean', function() {
  return del(['public/**','!public']);
});

gulp.task('movesrc', function() {
  return gulp.src('frontend/src/**')
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

gulp.task('scripts-app', function() {
  return gulp.src('frontend/scripts/napp.js')
      .pipe(rigger())
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('img', function() {
  return gulp.src('frontend/images/**/*.*', {since: gulp.lastRun('img')})
  .pipe(newer('public/images'))
  .pipe(imagemin())
  .pipe(gulp.dest('public/images'));
});

gulp.task('prepare_appcss', function() {
  return multipipe(
      gulp.src('frontend/styles/app.less'),
      sourcemaps.init(),
      less(),
      autoprefixer(),
      mmq({
        log: true
      }),
      cleancss(),
      sourcemaps.write(),
      gulp.dest('frontend/tmp')
  ).on('error', notify.onError());
});

gulp.task('styles', function() {
  return multipipe(
      gulp.src('frontend/styles/main.less'),
      less(),
      gulp.dest('public/css')
  ).on('error', notify.onError());
});

gulp.task('watch', function() {
  gulp.watch('frontend/html/**/*.html', gulp.series('html'));
  gulp.watch('frontend/styles/*.less', gulp.series('prepare_appcss','styles'));
  gulp.watch('frontend/src/**/*.*', gulp.series('movesrc'));
  gulp.watch('frontend/scripts/napp.js', gulp.series('scripts-app'));
  gulp.watch('frontend/images/**', gulp.series('img'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
  'clean','prepare_appcss',
  gulp.parallel('html','styles','img', 'scripts', 'scripts-app', 'movesrc'))
);

gulp.task('dev',
  gulp.series('build', gulp.parallel('watch', 'serve'))
);


// Сборка для переноса на Joomla
gulp.task('prepare_appcss_prod', function() {
  return multipipe(
      gulp.src('frontend/styles/app.less'),
      less(),
      autoprefixer(),
      mmq({
        log: true
      }),
      cleancss(),
      gulp.dest('frontend/tmp')
  ).on('error', notify.onError());
});

gulp.task('scripts_prod', function() {
  return gulp.src('frontend/scripts/*.js')
      .pipe(rigger())
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('prod', gulp.series(
  'all_clean','prepare_appcss_prod',
  gulp.parallel('html','styles','img', 'scripts_prod', 'movesrc'), 'serve')
);


gulp.task('js', function() {
  return gulp.src('frontend/scripts/main.js')
      .pipe(rigger())
      .pipe(gulp.dest('public/js'));
});
