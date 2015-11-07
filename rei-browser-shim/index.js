/*jshint camelcase:false*/
/*global window*/
/** CommonJS module shims for JavaScript libraries and objects attached to the
    browser's global 'window' object. The idea is to provide a single interface
    to the browser's global objects to reduce browser-specific couplings.

    Any shim specified in here can be "imported" using the CommonJS module
    pattern with 'require', e.g., in a CommonJS module, you can access jQuery
    like so:

        var $ = require( 'rei-browser-shim' ).jQuery;
*/
var win         = ( typeof window !== 'undefined' ? window : {} );
var polyfills   = require( './polyfills' );

// Browser API
module.exports.win = win;

// jQuery
module.exports.jQuery = win.jQuery || {};

// Modernizr
module.exports.Modernizr = win.Modernizr;

// REI
module.exports.rei = win.rei || {};

// Environment Info
module.exports.isProduction = ( win.rei && win.rei.session ) ? win.rei.session.isProduction : undefined;

// Adobe SiteCatalyst's AppMeasurement
// TODO delete this when `metrics` module is implemented site-wide
module.exports.s_gi = win.s_gi;
module.exports.s_account =  win.s_account;


// A space to gather polyfills for lacking browsers (*cough* IE8 *cough*)
polyfills.init();
