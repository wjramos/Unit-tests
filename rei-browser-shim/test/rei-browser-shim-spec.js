'use strict';
var proxyquire  = require( 'proxyquire' ).noCallThru();
var should      = require( 'should' );
var sinon       = require( 'sinon' );

// Window Stub on global scope
global.window = require( './window-stub' );

// Dependencies Stub
var depStub = {
    './polyfills': {
        init: function(){}
    }
};

// Get shim module for testing
var getShim = proxyquire.bind( this, '../index', depStub);

describe( 'REI Browser Shim', function () {

    it( 'Should allow access to the global window object', function () {
        var w = getShim().win;
        w.should.equal( window );
    } );

    it( 'Should allow access to a global JQuery object', function () {
        var jq = getShim().jQuery;

        jq.should.eql( window.jQuery );

    } );

    it( 'Should allow access to the global Modernizr object', function () {
        var m = getShim().Modernizr;
        m.should.equal( window.Modernizr );
    } );

    it( 'Should allow access to the global rei object', function () {
        var rei = getShim().rei;
        rei.should.equal( window.rei );
    } );

    it( 'Should allow access to the global Site Catalyst objects', function () {
        var sgi = getShim().s_gi;
        var sAcct = getShim().s_account;
        sgi.should.equal( window.s_gi );
        sAcct.should.equal( window.s_account );
    } );

    it( 'Should use the polyfills module', function() {
        var mock = sinon.mock( depStub[ './polyfills' ] );
        mock.expects( 'init' ).once();

        var shim = getShim();
        mock.verify();

    } );

} );