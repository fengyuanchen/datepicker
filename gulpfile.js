'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var cssnext = require('postcss-cssnext');
var pkg = require('./package');
var scripts = {
  name: 'datepicker.js',
  min: 'datepicker.min.js',
  all: [
    'gulpfile.js',
    'src/datepicker.js',
    'docs/js/main.js',
    'test/*.js'
  ],
  docs: 'docs/js',
  src: 'src/datepicker.js',
  dest: 'dist'
};
var styles = {
  name: 'datepicker.css',
  min: 'datepicker.min.css',
  all: [
    'dist/datepicker.css',
    'docs/css/main.css'
  ],
  main: 'dist/datepicker.css',
  docs: 'docs/css',
  src: 'src/*.scss',
  dest: 'dist'
};
var replacement = {
  regexp: /@\w+/g,
  filter: function (placeholder) {
    switch (placeholder) {
      case '@VERSION':
        return pkg.version;

      case '@YEAR':
        return (new Date()).getFullYear();

      case '@DATE':
        return (new Date()).toISOString();

      default:
        return placeholder;
    }
  }
};

gulp.task('jscopy', function () {
  return gulp.src(scripts.src)
    .pipe(gulp.dest(scripts.dest))
    .pipe(gulp.dest(scripts.docs));
});

gulp.task('jshint', function () {
  return gulp.src(scripts.all)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('jscs', function () {
  return gulp.src(scripts.all)
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});

gulp.task('js', ['jshint', 'jscs'], function () {
  return gulp.src(scripts.src)
    .pipe(plugins.replace(replacement.regexp, replacement.filter))
    .pipe(gulp.dest(scripts.dest))
    .pipe(gulp.dest(scripts.docs))
    .pipe(plugins.rename(scripts.min))
    .pipe(plugins.uglify({
      output: {
        comments: 'some'
      }
    }))
    .pipe(gulp.dest(scripts.dest))
    .pipe(gulp.dest(scripts.docs));
});

gulp.task('postcss', function () {
  return gulp.src(styles.src)
    .pipe(plugins.postcss([
      cssnext()
    ]))
    .pipe(gulp.dest(styles.dest))
    .pipe(gulp.dest(styles.docs));
});

gulp.task('csslint', ['postcss'], function () {
  return gulp.src(styles.all)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.formatter());
});

gulp.task('css', ['csslint'], function () {
  return gulp.src(styles.main)
    .pipe(plugins.replace(replacement.regexp, replacement.filter))
    .pipe(plugins.autoprefixer({
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ]
    }))
    .pipe(plugins.csscomb())
    .pipe(gulp.dest(styles.dest))
    .pipe(gulp.dest(styles.docs))
    .pipe(plugins.rename(styles.min))
    .pipe(plugins.minifyCss({
      compatibility: 'ie8',
      keepSpecialComments: 1
    }))
    .pipe(gulp.dest(styles.dest))
    .pipe(gulp.dest(styles.docs));
});

gulp.task('test', ['js', 'css'], function () {
  return gulp.src('test/*.html')
    .pipe(plugins.qunit());
});

gulp.task('docs', function () {
  return gulp.src(['i18n/*.js'])
    .pipe(gulp.dest(scripts.docs));
});

gulp.task('release', ['test', 'docs']);

gulp.task('watch', function () {
  gulp.watch(scripts.src, ['jscopy']);
  gulp.watch(styles.src, ['postcss']);
});

gulp.task('default', ['watch']);
