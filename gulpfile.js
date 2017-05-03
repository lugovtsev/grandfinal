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
const gulpIf = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const svgSprite = require('gulp-svg-sprite');
const mmq = require('gulp-merge-media-queries');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
//for task "clean" - remove all images on production
const imgPathExcl = isDevelopment ? '!public/images/**' : '';
const scriptsPath = isDevelopment ? 'frontend/scripts/main.js' : 'frontend/scripts/*.js';

gulp.task('env', function(done) {
  console.log(process.env.NODE_ENV);
  done();
});

gulp.task('clean', function() {
  return del(['public/**','!public', imgPathExcl]);
});

gulp.task('src', function() {
  return gulp.src('frontend/src/**')
      .pipe(gulp.dest('public'));
});

gulp.task('img', function() {
  return gulp.src('frontend/images/**/*.*', {since: gulp.lastRun('img')})
  .pipe(newer('public/images'))
  .pipe(gulp.dest('public/images'));
});

gulp.task('svg', function() {
  return gulp.src('frontend/svg/*.svg')
  .pipe(svgSprite({
    mode: {
      css: {
        dest:       '.',
        bust:       false,
        sprite:     'sprite.svg',
        layout:     'vertical',
        prefix:     '.iSvg-',
        dimensions: true,
        render:     {
          less: {
            dest: 'sprite.less'
          }
        }
      }
    }
  }))
  .pipe(gulpIf('*.less',gulp.dest('tmp/styles'), gulp.dest('public/css')));
});

gulp.task('html', function() {
  return gulp.src('frontend/html/*.html')
      .pipe(rigger())
      .pipe(gulp.dest('public'));
});

gulp.task('scripts', function() {
  return gulp.src(scriptsPath)
      .pipe(rigger())
      .pipe(gulpIf(!isDevelopment,concat('main.js')))
      .pipe(uglify())
      .pipe(gulp.dest('public/js'))
      .pipe(gulpIf(isDevelopment, gulp.src('frontend/scripts/myApp.js')))
      .pipe(gulpIf(isDevelopment, uglify()))
      .pipe(gulpIf(isDevelopment, gulp.dest('public/js')));
});

gulp.task('myAppJsWatcher', function() {
  return gulp.src('frontend/scripts/myApp.js')
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
});

gulp.task('libcss', function() {
  return multipipe(
    gulp.src('frontend/styles/main.less'),
    less(),
    cleancss(),
    gulp.dest('public/css')
  ).on('error', notify.onError());
});

gulp.task('appcss', function() {
  return multipipe(
      gulp.src('frontend/styles/app.less'),
      gulpIf(isDevelopment, sourcemaps.init()),
      less(),
      autoprefixer(),
      gulpIf(!isDevelopment, mmq({log: true})),
      cleancss(),
      gulpIf(isDevelopment, sourcemaps.write()),
      gulp.dest('public/css')
  ).on('error', notify.onError());
});

gulp.task('watch', function() {
  gulp.watch('frontend/html/**/*.html', gulp.series('html'));
  gulp.watch('frontend/styles/app.less', gulp.series('appcss'));
  gulp.watch('frontend/src/**/*.*', gulp.series('src'));
  gulp.watch('frontend/images/**', gulp.series('img'));
  gulp.watch('frontend/svg/**', gulp.series('svg','appcss'));
  gulp.watch('frontend/scripts/myApp.js', gulp.series('myAppJsWatcher'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
  'clean','svg', gulp.parallel('html','libcss','appcss','src','img','scripts'))
);

if (isDevelopment) {
  gulp.task('default',
    gulp.series('build', gulp.parallel('watch', 'serve'))
  );
}
else {
  gulp.task('default',
    gulp.series('build', 'serve')
  );
}
