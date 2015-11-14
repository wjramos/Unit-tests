'use strict';

var shim   = require( '../../test-shim/js/main' );
var expect = shim.expect;

var init   = shim.init( '../../sitewide-overlay/js/init', {
    'components/sitewide-overlay/js/main': shim.spy( )
} );

describe( 'Overlay init', function ( ) {
    it( 'should call initiate once', function ( ) {
        expect( init.calledOnce ).to.be.true;
    } );
} );
