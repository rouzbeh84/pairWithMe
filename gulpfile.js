var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var nodemon = require('gulp-nodemon');
var reactify = require('reactify');
var babelify = require('babelify');
var spawn = require('child_process').spawn;
var async = require( 'async' );
var path = require('path');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var node;

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
    .pipe(uglify())
    .pipe(gzip())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
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
// call all tasks and start server on port 3000
gulp.task('default', ['js', 'css', 'css:watch', 'server']);
