'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	jade = require('gulp-jade'),
	compass = require('gulp-compass'),
	wiredep = require('wiredep').stream;

var paths = {
	src: {
		app : 'app',
		html : 'app/*.html',
		js : 'app/js/**/*.js',
		css : 'app/css/**/*.css',
		scss : 'app/sass/**/*.scss',
		jade : 'app/jade/**/*.jade'
	},
	dest: {
		css : 'app/css',
		app : 'app/',
		scss : 'app/sass'
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
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch(paths.src.jade, ['jade']);
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
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: '\t'
        }))
        .pipe(gulp.dest(paths.dest.app));
});

//compass scss
gulp.task('compass', function() {
  gulp.src(paths.src.scss)
    .pipe(compass({
      config_file: './config.rb',
      css: paths.dest.css,
      sass: paths.dest.scss
    }))
    .pipe(gulp.dest(paths.dest.css));
});

gulp.task('default', ['server', 'watch']);