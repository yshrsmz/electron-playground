'use strict';

var gulp = require('gulp');
var template = require('gulp-template');
var merge = require('event-stream').merge;
//var atomshell = require('gulp-atom-shell');
var atom = require('gulp-atom');

var config = require('../config.js').electron;
var packageConfig = require('../../package.json');

var appConfig = {
    name: packageConfig.name,
    version: packageConfig.version,
    main: config.build.main
};

gulp.task('electron-config', function() {
    return gulp.src(config.configFile.src)
        .pipe(template(appConfig))
        .pipe(gulp.dest(config.configFile.dest));
});

gulp.task('electron', ['electron-config'], function () {
    //return gulp.src(config.build.src)
    //        .pipe(atomshell({
    //            version: '0.25.0',
    //            platform: 'darwin'
    //        }))
    //        .pipe(atomshell.zfsdest(config.build.dest));

    return atom({
        srcPath: './build',
        releasePath: './release',
        cachePath: './cache',
        version: 'v0.25.0',
        rebuild: false,
        platforms: ['darwin-x64']
    });
});