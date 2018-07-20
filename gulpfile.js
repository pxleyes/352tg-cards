var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('images/'));
});

gulp.task('sass', function(){
  gulp.src(['src/css/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('scripts/'));
});

gulp.task('default', function(){
  browserSync.init({});

  gulp.start('sass');

  gulp.watch("src/css/**/*.scss", ['sass']);
  // gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("**/*.html").on('change', browserSync.reload);
});