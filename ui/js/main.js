
/**
 *
 *   Bundle and init UI Elements
 *
 */

/* UI Components */
var timer   = require( 'components/countdown-timer/js/main' );
var counter = require( 'components/counter/js/main');

/* Init on call */
module.exports.init = function ( ) {
    timer.init( '.js-timer' );
    counter.init( '.js-counter' );
};