'use strict';

var shim   = require( '../../test-shim/js/main' );
var expect = shim.expect;
var util   = shim.init( '../../counter/js/utils', {
    'jquery2' : shim.stub()
} );

/* Test Data */
var lower     = 2;
var higher    = 5;
var bigNumber = 10000000;
var testFloat = 1000.24;

var lowerStr           = '2';
var higherStr          = '5';
var bigNumberStr       = '10000000';
var floatStr           = '1000.24';
var floatFormattedStr  = '1,000.24';
var numberFormattedStr = '10,000,000';
var numberBadFormatStr = '10,00,000,0';

var minutes      = [ '10 Minutes', '10 minutes', '10 Mins', '10 mins', '10 Min', '10 min', '10 M', '10 m', '10M', '10m' ];
var seconds      = [ '10 Seconds', '10 seconds', '10 Secs', '10 secs', '10 Sec', '10 sec', '10 S', '10 s', '10S', '10s' ];
var milliseconds = [ 10000, '10000' ];

var testStr = 'test';
var testArr = [ 'test', 'test' ];
var testObj = {
    test: 'test'
};

describe( 'Counter Utils', function( ) {

    /* getRandomIncrement */
    describe( 'getRandomIncrement', function( ) {
        it( 'should return a number between two numbers, inclusive of the lower', function( ) {

            var increments = [ ];

            for ( var i = 0; i < 50; i++ ) {
                increments[ i ] = util.getRandomIncrement( lower, higher );
                expect( increments[ i ] ).to.be.at.least( lower ).and.below( higher );
            }

        } );
        it( 'should include the lower number', function( ) {
            expect( util.getRandomIncrement( lower, lower ) ).to.eq( lower );
        } );

        it( 'should return non-random number if passed one parameter', function( ) {
            var oneParam = util.getRandomIncrement( lower );
            expect( oneParam ).to.eq( lower );
        } );

        it( 'should return zero if passed nothing', function( ) {
            var noParams = util.getRandomIncrement( );
            expect( noParams ).to.eq( 0 );
        } );

        it( 'should return expected results if passed parsable strings', function( ) {

            var increments = [ ];

            for ( var i = 0; i < 50; i++ ) {
                increments[ i ] = util.getRandomIncrement( lowerStr, higherStr );
                expect( increments[ i ] ).to.be.at.least( lower ).and.below( higher );
            }
        } );

        it( 'should return 0 if passed un-parsable string or other invalid input', function( ) {

            expect( util.getRandomIncrement( undefined ) ).to.eq( 0 );
            expect( util.getRandomIncrement( false ) ).to.eq( 0 );
            expect( util.getRandomIncrement( null ) ).to.eq( 0 );
            expect( util.getRandomIncrement( '' ) ).to.eq( 0 );
            expect( util.getRandomIncrement( testStr ) ).to.eq( 0 );
            expect( util.getRandomIncrement( testArr ) ).to.eq( 0 );
            expect( util.getRandomIncrement( testObj ) ).to.eq( 0 );
        } );
    } );

    /* formatNumber */
    describe( 'formatNumber', function( ) {
        it( 'should return a thousands comma-delimited string of a large number', function( ) {
            expect( util.formatNumber( bigNumber ) ).to.be.a( 'string' ).and.eq( numberFormattedStr );
        } );

        it( 'should return a thousands comma-delimited string of a large number for a parsable number string', function( ) {
            expect( util.formatNumber( bigNumberStr ) ).to.be.a( 'string' ).and.eq( numberFormattedStr );
        } );

        it( 'should return the same string for a well-formatted number string', function( ) {
            expect( util.formatNumber( numberFormattedStr ) ).to.be.a( 'string' ).and.eq( numberFormattedStr );
        } );

        it( 'should reformat a badly formatted number string', function( ) {
            expect( util.formatNumber( numberBadFormatStr ) ).to.be.a( 'string' ).and.eq( numberFormattedStr );
        } );

        it( 'should return a formatted float string from a float', function( ) {
            expect( util.formatNumber( testFloat ) ).to.be.a( 'string' ).and.eq( floatFormattedStr );
        } );

        it( 'should return a formatted float string from an unformatted float string', function( ) {
            expect( util.formatNumber( floatStr ) ).to.be.a( 'string' ).and.eq( floatFormattedStr );
        } );

        it( 'should return an empty string on invalid input', function( ) {
            expect( util.formatNumber( undefined ) ).to.be.eq( '' );
            expect( util.formatNumber( false ) ).to.be.eq( '' );
            expect( util.formatNumber( null ) ).to.be.eq( '' );
            expect( util.formatNumber( '' ) ).to.be.eq( '' );
            expect( util.formatNumber( testStr ) ).to.be.eq( '' );
            expect( util.formatNumber( testArr ) ).to.be.eq( '' );
            expect( util.formatNumber( testObj ) ).to.be.eq( '' );
        } );
    } );

    /* detectIE */

    /* getData - TODO ( Waiting on resolve of IE9 crossDomain requests ) */


    /* toMs */
    describe( 'toMs', function( ) {
        it( 'should return a number of minutes converted to ms', function( ) {
            for ( var i = 0; i < minutes.length; i++ ) {
                expect( util.toMs( minutes[ i ] ) ).to.be.a( 'number' ).and.eq( parseFloat( minutes[ i ] ) * 60 * 1000 );
            }
        } );

        it( 'should return a number of seconds converted to ms', function( ) {
            for ( var i = 0; i < seconds.length; i++ ) {
                expect( util.toMs( seconds[ i ] ) ).to.be.a( 'number' ).and.eq( parseFloat( seconds[ i ] ) * 1000 );
            }
        } );

        it( 'should return a number of ms presented as string or number as a number', function( ) {
            for ( var i = 0; i < milliseconds.length; i++ ) {
                expect( util.toMs( milliseconds[ i ] ) ).to.be.a( 'number' ).and.eq( parseFloat( milliseconds[ i ] ) );
            }
        } );

        it( 'should return 0 for invalid input', function( ) {
            expect( util.toMs( undefined ) ).to.be.a( 'number' ).and.eq( 0 );
            expect( util.toMs( false ) ).to.be.a( 'number' ).and.eq( 0 );
            expect( util.toMs( null ) ).to.be.a( 'number' ).and.eq( 0 );
            expect( util.toMs( '' ) ).to.be.a( 'number' ).and.eq( 0 );
            expect( util.toMs( testStr ) ).to.be.a( 'number' ).and.eq( 0 );
            expect( util.toMs( testArr ) ).to.be.a( 'number' ).and.eq( 0 );
            expect( util.toMs( testObj ) ).to.be.a( 'number' ).and.eq( 0 );
        } );
    } );
} );
