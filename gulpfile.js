var watchify = require('watchify'),
  browserify = require('browserify'),
  gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  gutil = require('gulp-util'),
  uglify = require('gulp-uglify'),
  gzip = require('gulp-gzip'),
  sourcemaps = require('gulp-sourcemaps'),
  assign = require('lodash.assign'),
  nodemon = require('gulp-nodemon'),
  reactify = require('reactify'),
  babelify = require('babelify'),
  spawn = require('child_process').spawn,
  async = require( 'async' ),
  path = require('path'),
  concat = require('gulp-concat'),
  minifyCSS = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  node;

var customOpts = {
  entries: ['./src/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
// add custom browserify options here

// add transformations here
// i.e. b.transform(coffeeify);
b.transform(babelify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(uglify())
    .pipe(gzip())
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./client/build/'));
}
var child = require('child_process');
gulp.task('server', function() {
   nodemon({ script: './server/server.js'
          , exec: 'node'
          , ext: 'html js'
          , ignore: ['client/']});
});

//css concat/minification/piping to public css folder
gulp.task('css', function () {
  gulp.src('./src/styles/*.css')
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gzip())
    .pipe(gulp.dest('./client/css/'));
});
gulp.task('css:watch', function () {
  gulp.watch('./src/styles/*.css', ['css']);
});
// call all tasks and start server on port 80
gulp.task('default', ['js', 'css', 'img', 'css:watch', 'server']);
