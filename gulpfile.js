/**
 * Created by FixError on 14.10.2015.
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');
var config = require('./gulp.config')();

/*===================================================================*/
/*========START LOG ERROR============================================*/
/*===================================================================*/
var log = function (error) {
    console.log([
        '',
        "================START ERROR MESSAGE ===========================",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "================END ERROR MESSAGE =============================",
        ''
    ].join('\n'));
};

/*===================================================================*/
/*========END LOG ERROR==============================================*/
/*===================================================================*/

/*===================================================================*/
/*========START PIPE ================================================*/
/*===================================================================*/
var pipes = {};



pipes.builtBootstapDev = function () {
   /*
    *  .bootstrap.json ===>
    *  "main": [
    *           "dist/css/bootstrap.css",
    *           "dist/js/bootstrap.js",
    *           "dist/fonts/**"
    *          ]
    *
    *          ||
    *
    *  "main": [
    *           "dist/css/bootstrap.min.css",
    *           "dist/js/bootstrap.min.js",
    *           "dist/fonts/**"
    *          ]
    */
    return gulp.src('./setting/.bower.json')
        .pipe(gulp.dest('./bower_components/bootstrap/'));
};

pipes.VendorScripts = function () {
    return plugins.order(['jquery.js', 'angular.js', 'bootstrap.js']);
};

pipes.validatedAppScripts = function () {
    return gulp.src(config.js.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};
pipes.builtAppScriptsDev = function () {
    return pipes.validatedAppScripts()
       // .pipe(plugins.ngAnnotate())
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(config.dist.scripts));
};

pipes.builtVendorScriptsStyleDev = function () {
    var filterJS = plugins.filter('**/*.js', {restore: true});
    var filterCSS = plugins.filter('**/*.css', {restore: true});
    var filterFonts = plugins.filter(['**/**.eot',
            '**/**.svg',
            '**/**.ttf',
            '**/**.woff',
            '**/**.woff2'],
        {restore: true});
    return gulp.src(bowerFiles())
        .pipe(plugins.plumber())
        .pipe(filterJS)
        .pipe(gulp.dest(config.dist.dev + '/bower_components/js'))
        .pipe(filterJS.restore)
        .pipe(filterCSS)
        .pipe(gulp.dest(config.dist.dev + '/bower_components/css'))
        .pipe(filterCSS.restore)
        .pipe(filterFonts)
        .pipe(gulp.dest(config.dist.dev + '/bower_components/fonts'))
        .pipe(filterFonts.restore);
};

pipes.builtIndexDev = function () {

    var filterJSCSS = plugins.filter(['**/*.js', '**/*.css'], {restore: true});

    var orderedVenderScripts = pipes.builtVendorScriptsStyleDev()
            .pipe(pipes.VendorScripts())
            .pipe(filterJSCSS);

    var orderedAppScriptsDev =pipes.builtAppScriptsDev();

    return gulp.src(config.clientIndex)
        .pipe(gulp.dest(config.dist.dev))
        .pipe(plugins.inject(orderedVenderScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScriptsDev,{relative: true}))
        .pipe(gulp.dest(config.dist.dev))
};


/*===================================================================*/
/*========END PIPE ==================================================*/
/*===================================================================*/


/*===================================================================*/
/*========START DEV TASK ================================================*/
/*===================================================================*/
gulp.task('built-setting-bootstap-dev', pipes.builtBootstapDev);
gulp.task('built-vendor-dev', pipes.builtVendorScriptsStyleDev);
gulp.task('built-app-scripts-dev', pipes.builtAppScriptsDev);
gulp.task('built-index-dev', pipes.builtIndexDev);


/*===================================================================*/
/*========END DEV TASK ==================================================*/
/*===================================================================*/