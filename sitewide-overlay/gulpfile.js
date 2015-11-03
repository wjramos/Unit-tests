var path = require( 'path' );
var febs = require( 'febs' );
var gulp = require( 'gulp' );

var OUT_PATH = path.join( febs.config.paths.OUT_ROOT, 'sitewide-overlay' );

gulp.task( 'compile-js', [
    febs.addTask.compileJs( __dirname, OUT_PATH, {
        taskName:   'compile-main.js',
        src:        './js/main.js'
    } ),
    febs.addTask.compileJs( __dirname, OUT_PATH, {
        taskName:   'compile-init.js',
        src:        './js/init.js'
    } )
] );

gulp.task( 'compile-less', [
    febs.addTask.compileLess( __dirname, OUT_PATH, {
        taskName:   'compile-main.less',
        src:        './less/main.less'
    } )
] );

gulp.task( 'default', [
    'compile-js',
    'compile-less'
] );