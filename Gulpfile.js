var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// Gulp Tasks created a app.css file and moved to public directory
gulp.task('styles', function () {
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'));
});

// Gulp Task moved all content of assets directory to public directory
// Note: Folder public is accessible by users but they cannot access to assets folder
gulp.task('assets', function () {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public'));
});

function compile(watch) {
  var bundle = browserify('./src/index.js', {debug: true});
    if (watch) {
        bundle = watchify(bundle);
        bundle.on('update', function () {
            console.log('--> Bundling...');
            rebundle();
        });
    }
  function rebundle() {
    bundle
      .transform(babel, { "presets": ["es2015"], 'plugins': ['syntax-async-functions','transform-regenerator']})
      .bundle()
      .on('error', function (err) {
        console.log(err); this.emit('end');
      })
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
  }

  rebundle();
}

// Gulp Task created a index.js file on public directory
gulp.task('scripts', function () {
    browserify('./src/index.js')
        .transform(babel)
        .bundle()
        .pipe(source('index.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public'));
});

// Execute default task and send array
gulp.task('default', ['styles', 'assets','scripts']);