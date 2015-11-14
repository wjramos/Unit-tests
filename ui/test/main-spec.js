'use strict';

var shim     = require( '../../test-shim/js/main' );
var expect   = shim.expect;
var spy      = shim.spy;
var stub     = shim.stub;

var objStub  = {};

var component = shim.init( '../../ui/js/main', {
    './init'                             : function ( ) { return spy() },
    'components/countdown-timer/js/main' : function ( ) { return objStub; },
    'components/counter/js/main'         : function ( ) { return objStub; }
} );

describe( 'UI bundle', function ( ) {
    it( 'should run initiate for each component type', function ( ) {

    } );
} );