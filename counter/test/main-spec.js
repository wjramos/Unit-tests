'use strict';

var shim   = require( '../../test-shim/js/main' );
var expect = shim.expect;
var spy    = shim.spy();

var STRING = require( '../js/strings' );

var utils   = {
    getData           : function ( ) { return spy( ) },
    getRandomIncrement: function ( ) { return spy( ) },
    formatNumber      : function ( ) { return spy( ) },
    detectIE          : function ( ) { return spy( ) },
    getData           : function ( ) { return spy( ) },
    toMs              : function ( ) { return spy( ) }
}

var Counter = shim.init( '../../counter/js/main', {
    './utils' : utils
} );

/* Test Data */
var selector = 'selector';
var element  = {
    style: null,
    innerHTML: '600,000',
    dataset: {
        counterEndpoint: '',
        counterProperty: '',
        counterUpdate  : '',
        counterSpeed   : ''
    },
    getAttribute: function ( property ) {
        var property = property.replace( 'data-', '' ).replace( /-([a-z])/g, function ( g ) { return g[ 1 ].toUpperCase( ); } );
        return this.dataset[ property ];
    }
};

/* Stubs */
var counterObj = new Counter( element );

// counterObj.init        = spy( );
counterObj.getSettings = spy( );
counterObj.setInitial  = spy( );
counterObj.update      = spy( );
counterObj.animate     = spy( );
counterObj.increment   = spy( );
counterObj.display     = spy( );