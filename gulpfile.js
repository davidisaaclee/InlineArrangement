'use strict';

var _          = require('lodash');
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var browserify  = require('browserify');
// var coffeeify  = require('gulp-coffeeify');
var coffeeify  = require('coffeeify');
var jade       = require('gulp-jade');
var notify     = require('gulp-notify');
var source     = require('vinyl-source-stream');
var watch      = require('gulp-watch');
var buffer     = require('vinyl-buffer');
var del        = require('del');

var rename     = require('gulp-rename');
var es         = require('event-stream');


var options = {};

options['coffee'] = {
  src: './src/**/*.coffee',
  dst: './build',
  options: {
    debug: true,
    basedir: __dirname + '/src',
    paths: [__dirname + '/node_modules', __dirname + '/src'],
    dest: './build',
    extensions: ['.coffee']
  }
};

options['sass'] = {
  src: './src/**/*.scss',
  dst: './build'
};

options['jade'] = {
  src: './src/**/*.jade',
  dst: './build/',
  options: {
    pretty: true
  }
};


gulp.task('default', ['coffee', 'demo_script', 'jade', 'sass', 'watch']);
gulp.task('coffee', function (done) {
  // we define our input files, which we want to have
  // bundled:
  var files = [
    'InlinePiece.coffee',
    'InlineNode.coffee',
    'InlineLine.coffee'
  ];
  // map them to our stream function
  var tasks = files.map(function(entry) {
      return browserify(_.extend(options.coffee.options, {
         entries: [entry],
         transform: [coffeeify] }))
          .bundle()
          .on('error', notify.onError({
             title: "CoffeeScript error",
             message: '<%= error.message %>',
             sound: "Frog", // case sensitive
             icon: false
           }))
          .pipe(source(entry))
          .pipe(rename({
             extname: '.js'
          }))
          .pipe(gulp.dest('./build'));
      });
  // create a merged stream
  return es.merge.apply(null, tasks);
});

gulp.task('demo_script', function () {
  var bundle = browserify(_.extend(options.coffee.options, {
    entries: './demo/InlineArrangementDemo.coffee',
    outputName: 'InlineArrangementDemo.js',
    transform: [coffeeify]
  })).bundle();

  bundle
    .on('error', notify.onError({
      title: "CoffeeScript error",
      message: '<%= error.message %>',
      sound: "Frog", // case sensitive
      icon: false
    }))
    .on('error', function (error) {
      console.log(error);
    });

  return bundle
    .pipe(source('InlineArrangementDemo.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/demo'));
});

gulp.task('sass', function () {
  return gulp.src(options.sass.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(options.sass.dst));
});

gulp.task('jade', function () {
  return gulp.src(options.jade.src)
    .pipe(jade(options.jade.options))
    .on('error', notify.onError({
      title: "CoffeeScript error",
      message: '<%= error.message %>',
      sound: "Frog", // case sensitive
      icon: false
    }))
    .on('error', function (error) {
      console.log(error);
    })
    .pipe(gulp.dest(options.jade.dst))
});

gulp.task('watch', function () {
  gulp.watch(options.coffee.src, ['coffee', 'demo_script']);
  gulp.watch(options.sass.src, ['sass']);
  gulp.watch(options.jade.src, ['jade']);
});


gulp.task('clean', function () {
  del([
    'build/**'
  ]);
});

function onError (err) {
  console.log(err);
  notify.onError({
    message: 'Error: <%= error.message %>',
    sound: false // deactivate sound?
  })
  this.emit('end');
}