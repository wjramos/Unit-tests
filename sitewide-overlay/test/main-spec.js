'use strict';

var shim   = require( '../../test-shim/js/main' );
var expect = shim.expect;

var overlay = shim.init( '../../sitewide-overlay/js/main', {
    'components/sitewide-overlay/js/util': shim.spy( )
} );
