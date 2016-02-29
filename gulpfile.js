'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	jade = require('gulp-jade'),
	compass = require('gulp-compass'),
	wiredep = require('wiredep').stream,
	plumber = require('gulp-plumber'),
	spritesmith = require('gulp.spritesmith');


var paths = {
	src: {
		app : 'app',
		html : 'app/*.html',
		js : 'app/js/**/*.js',
		css : 'app/css/**/*.css',
		scss : 'app/sass/**/*.scss',
		jade : 'app/jade/*.jade',
		img : 'app/img/sprites/*.png'
	},
	dest: {
		css : 'app/css',
		app : 'app/',
		scss : 'app/sass',
		sprite : 'app/img/sprite'
	}
};

//Сервер
gulp.task('server', function () {
	browserSync({
		port : 9000,
		server: {
			baseDir : paths.src.app
		}
	});
});

//Слежка
gulp.task('watch', function () {
	gulp.watch([
		paths.src.html,
		paths.src.js,
		paths.src.css,
	]).on('change', browserSync.reload);
	gulp.watch(paths.src.jade, ['jade']);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch(paths.src.scss, ['compass']);
});

//Слежка за Bower
gulp.task('wiredep', function () {
  gulp.src(paths.src.html)
    .pipe(wiredep())
    .pipe(gulp.dest(paths.dest.app));
});

//jade
gulp.task('jade', function () {
    var YOUR_LOCALS = {};

    gulp.src(paths.src.jade)
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: '\t'
        }))
        .pipe(wiredep())
        .pipe(gulp.dest(paths.dest.app));
});

//compass scss
gulp.task('compass', function() {
  gulp.src(paths.src.scss)
  	.pipe(plumber())
    .pipe(compass({
      config_file: './config.rb',
      css: paths.dest.css,
      sass: paths.dest.scss
    }))
    .pipe(gulp.dest(paths.dest.css));
});

//sprite
gulp.task('sprite', function () {
  var spriteData = gulp.src(paths.src.img)
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    padding:30
  }));
  return spriteData.pipe(gulp.dest(paths.dest.sprite));
});

gulp.task('default', ['server', 'watch']);