'use strict';

var shim     = require( '../../test-shim/js/main' );
var expect   = shim.expect;
var spy      = shim.spy;
var doc      = shim.getDoc();

var componentInit = shim.init( '../../ui/js/init', {
    'rei-browser-shim': {
        win : {
            document: doc
        }
    }
} );

/* Test Data */
var testSelector = 'test';
var testNodeList = [ 'test1', 'test2', 'test3' ];

var Test = function ( ) { };

/* Stub */
// shim.getStub( 'querySelectorAll' ).withArgs( testSelector ).returns( testNodeList );
var components = componentInit( Test, testSelector );

describe( 'UI Components Initiate', function ( ) {
    it( 'should instantiate a number of constructors based on length of nodelist gotten by provided selector', function ( ) {
        for ( var i = 0; i < testNodeList.length; i++ ) {
            expect( components[ i ] ).to.be.an( 'object' ).and.to.be.an.instanceof( Test );
        }
    } );
} );
