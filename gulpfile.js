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
const uglifycss = require('gulp-uglifycss');
const ftp = require('gulp-ftp');
const gutil = require('gulp-util');
const rigger = require('gulp-rigger');
const mainBowerFiles = require('main-bower-files');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('bowerjs', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(debug({"title": "mainBowerJS"}))
        .pipe(gulp.dest('public/js'))
});

gulp.task('bowercss', function() {
    return gulp.src(mainBowerFiles('**/*.scss'))
        .pipe(gulp.dest('public/css'))
});

gulp.task('bowermain', gulp.parallel('bowerjs', 'bowercss'));

gulp.task('clean', function() {
  return del(['public/**','!public']);
});

gulp.task('libsjs', function() {
  return gulp.src('frontend/scripts/*.*','!common.js')
      .pipe(concat('libs.js'))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('commonjs', function() {
  return gulp.src('frontend/scripts/common.js')
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('libscss', function(file) {
  return gulp.src('frontend/styles/*.css')
      .pipe(sourcemaps.init())
      .pipe(concat('libs.min.css'))
      .pipe(uglifycss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/css'));
});

gulp.task('allcss', function(file) {
  return multipipe(
      gulp.src('frontend/styles/style.less'),
      sourcemaps.init(),
      less(),
      sourcemaps.write(),
      gulp.dest('public/css')
  ).on('error', notify.onError());
});

gulp.task('html', function() {
  return gulp.src('frontend/assets/*.html')
      .pipe(rigger())
      .pipe(gulp.dest('public'));
});

gulp.task('assets', function() {
  return gulp.src('frontend/assets/images', {since: gulp.lastRun('assets')})
      .pipe(newer('public'))
      .pipe(gulp.dest('public'));
});

// gulp.task('default', gulp.series('clean', 'assets', 'styles', 'scripts')
// );

gulp.task('watch', function() {
  gulp.watch('frontend/assets/**/*.html', gulp.series('html'));
  gulp.watch('frontend/styles/*.less', gulp.series('allcss'));
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
  gulp.watch('frontend/js/common.js', gulp.series('commonjs'));
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
    gulp.parallel('html','assets','libscss', 'allcss', 'libsjs', 'commonjs'))
);

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);

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
