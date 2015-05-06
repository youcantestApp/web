'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');

var JS_LIB_DEST = 'app/assets/javascripts/libs/';
var CSS_LIB_DEST = 'app/assets/stylesheets/';

gulp.task('libs', function() {
    gulp.src('./bower_components/**/*.min.js')
        .pipe(gulp.dest(JS_LIB_DEST));

    gulp.src('./bower_components/**/dist/js/*.min.js')
        .pipe(gulp.dest(JS_LIB_DEST));


    gulp.src('./bower_components/**/dist/css/*.min.css')
        .pipe(gulp.dest(CSS_LIB_DEST));


    gulp.src('./bower_components/**/dist/fonts/*')
        .pipe(gulp.dest(CSS_LIB_DEST));

});

        // This will output the non-minified version
        //.pipe(gulp.dest(DEST))
        // This will minify and rename to foo.min.js
        //.pipe(uglify())
        //.pipe(rename({ extname: '.min.js' }))
        //.pipe(gulp.dest(JS_LIB_DEST));

gulp.task('default', ['libs']);
