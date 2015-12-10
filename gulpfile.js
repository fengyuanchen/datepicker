'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pkg = require('./package');
var scripts = {
      name: 'datepicker.js',
      min: 'datepicker.min.js',
      all: [
        'gulpfile.js',
        'src/datepicker.js',
        'demo/js/main.js',
        'docs/js/main.js',
        'test/*.js'
      ],
      docs: 'docs/js',
      site: '_gh_pages/js',
      src: 'src/datepicker.js',
      dest: 'dist'
    };
var styles = {
      name: 'datepicker.css',
      min: 'datepicker.min.css',
      all: [
        'dist/datepicker.css',
        'demo/css/main.css',
        'docs/css/main.css'
      ],
      main: 'dist/datepicker.css',
      docs: 'docs/css',
      site: '_gh_pages/css',
      src: 'src/*.scss',
      dest: 'dist'
    };
var replacement = {
      regexp: /@\w+/g,
      filter: function (placeholder) {
        switch (placeholder) {
          case '@VERSION':
            placeholder = pkg.version;
            break;

          case '@YEAR':
            placeholder = (new Date()).getFullYear();
            break;

          case '@DATE':
            placeholder = (new Date()).toISOString();
            break;
        }

        return placeholder;
      }
    };

gulp.task('jscopy', function () {
  return gulp.src(scripts.src)
    .pipe(gulp.dest(scripts.dest));
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
    .pipe(gulp.dest(scripts.site))
    .pipe(plugins.rename(scripts.min))
    .pipe(plugins.uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest(scripts.dest))
    .pipe(gulp.dest(scripts.site));
});

gulp.task('sass', function () {
  return gulp.src(styles.src)
    .pipe(plugins.sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(styles.dest));
});

gulp.task('csslint', ['sass'], function () {
  return gulp.src(styles.all)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter());
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
    .pipe(gulp.dest(styles.site))
    .pipe(plugins.rename(styles.min))
    .pipe(plugins.minifyCss({
      compatibility: 'ie8',
      keepSpecialComments: 1
    }))
    .pipe(gulp.dest(styles.dest))
    .pipe(gulp.dest(styles.site));
});

gulp.task('htmlcomb:demo', function () {
  return gulp.src('demo/*.html')
    .pipe(plugins.htmlcomb())
    .pipe(gulp.dest('demo'));
});

gulp.task('htmlcomb:docs', function () {
  return gulp.src('docs/*.html')
    .pipe(plugins.htmlcomb())
    .pipe(gulp.dest('docs'));
});

gulp.task('htmlcomb', ['htmlcomb:demo', 'htmlcomb:docs']);


gulp.task('assets:js', function () {
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/qunit/qunit/qunit.js'
    ])
    .pipe(gulp.dest('assets/js'));
});

gulp.task('assets:fonts', function () {
  return gulp.src([
      'bower_components/bootstrap/fonts/*'
    ])
    .pipe(gulp.dest('assets/fonts'));
});

gulp.task('assets:css', ['assets:fonts'], function () {
  return gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/fontawesome/css/font-awesome.min.css',
      'bower_components/qunit/qunit/qunit.css'
    ])
    .pipe(gulp.dest('assets/css'));
});

gulp.task('assets', ['assets:js', 'assets:css']);

gulp.task('docs:i18n', function () {
  return gulp.src(['i18n/*.js'])
    .pipe(gulp.dest('_gh_pages/js'));
});

gulp.task('docs:all', function () {
  return gulp.src('docs/**')
    .pipe(gulp.dest('_gh_pages'));
});

gulp.task('docs', ['docs:i18n', 'docs:all']);

gulp.task('test', ['js', 'css'], function () {
  return gulp.src('test/*.html')
    .pipe(plugins.qunit());
});

gulp.task('release', ['test', 'docs'], function () {
  return gulp.src('dist/*.{js,css}')
    .pipe(gulp.dest('_releases/' + pkg.version));
});

gulp.task('watch', function () {
  gulp.watch(scripts.src, ['jscopy']);
  gulp.watch(styles.src, ['sass']);
  gulp.watch('docs/**', ['docs:all']);
});

gulp.task('default', ['watch']);
