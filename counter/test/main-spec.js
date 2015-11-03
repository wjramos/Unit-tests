'use strict';

var sinon   = require( 'sinon' );
var stub    = sinon.stub;
var spy     = sinon.spy( );

var chai    = require( 'chai' );
var should  = chai.should( );

var proxyquire = require( 'proxyquire' ).noCallThru();

var util    = require( '../js/utils' );
var STRING  = require( '../js/strings' );

var document = {
    querySelectorAll: function ( ) { }
};
var counter = require( '../js/main' );
var Counter = proxyquire( '../js/counter', spy );

var testSelector = 'test';
var testNodeList = [ 'test', 'test', 'test' ];

sinon.stub( document, 'querySelectorAll' ).withArgs( testSelector ).returns( testNodeList );

counter.init( testSelector );

console.log( Counter );
