'use strict';

var sinon   = require( 'sinon' );
var spy     = sinon.spy;

var chai    = require( 'chai' );
var should  = chai.should( );

var util    = require( '../js/utils' );
var STRING  = require( '../js/strings' );

/* Test Data */
var lower   = 2;
var higher  = 5;
var bigNumber = 10000000;
var float = 1000.24;

var lowerStr   = '2';
var higherStr  = '5';
var bigNumberStr = '10000000';
var floatStr     = '1000.24';
var numberFormattedStr = '10,000,000';
var numberBadFormatStr = '10,00,000,0';

var minutes = [ '10 Minutes', '10 minutes', '10 Mins', '10 mins', '10 Min', '10 min', '10 M', '10 m', '10M', '10m' ];
var seconds = [ '10 Seconds', '10 seconds', '10 Secs', '10 secs', '10 Sec', '10 sec', '10 S', '10 s', '10S', '10s' ];
var milliseconds = [ 10000, '10000' ];

var testStr = 'test';
var testArr = [ 'test', 'test' ];
var testObj = { test : 'test' };

describe( 'Counter Utils', function ( ) {

    /*getRandomIncrement*/
    describe( 'getRandomIncrement', function ( ) {
        it( 'should return a number between two numbers, inclusive of the lower', function ( ) {

            var increments = [];

            for ( var i = 0; i < 50; i++ ) {
                increments[ i ] = util.getRandomIncrement( lower , higher );
                increments[ i ].should.be.at.least( lower ).and.below( higher );
            }

        } );
        it( 'should include the lower number', function ( ) {
            util.getRandomIncrement( lower, lower ).should.eq( lower );
        } );

        it( 'should return non-random number if passed one parameter', function ( ) {
            var oneParam = util.getRandomIncrement( lower );
            oneParam.should.be.eq( lower );
        } );

        it( 'should return zero if passed nothing', function ( ) {
            var noParam = util.getRandomIncrement( );
            noParam.should.be.eq( 0 );
        } );

        it( 'should return expected results if passed parsable strings', function ( ) {

            var increments = [];

            for ( var i = 0; i < 50; i++ ) {
                increments[ i ] = util.getRandomIncrement( lowerStr , higherStr );
                increments[ i ].should.be.at.least( lower ).and.below( higher );
            }
        } );

        it( 'should return 0 if passed un-parsable string or other invalid input', function ( ) {

            util.getRandomIncrement( undefined ).should.eq( 0 );
            util.getRandomIncrement( null ).should.eq( 0 );
            util.getRandomIncrement( testStr ).should.eq( 0 );
            util.getRandomIncrement( testArr ).should.eq( 0 );
            util.getRandomIncrement( testObj ).should.eq( 0 );
        } );
    } );

    /*formatNumber*/
    describe( 'formatNumber', function ( ) {
        it( 'should return a thousands comma-delimited string of a large number', function ( ) {
            util.formatNumber( bigNumber ).should.be.a( 'string' ).and.eq( '10,000,000' );
        } );

        it( 'should return a thousands comma-delimited string of a large number for a parsable number string', function ( ) {
            util.formatNumber( bigNumberStr ).should.be.a( 'string' ).and.eq( '10,000,000' );
        } );

        it( 'should return the same string for a well-formatted number string', function ( ) {
            util.formatNumber( numberFormattedStr ).should.be.a( 'string' ).and.eq( '10,000,000' );
        } );

        it( 'should reformat a badly formatted number string', function ( ) {
            util.formatNumber( numberBadFormatStr ).should.be.a( 'string' ).and.eq( '10,000,000' );
        } );

        it( 'should return a formatted float string from a float', function ( ) {
            util.formatNumber( float ).should.be.a( 'string' ).and.eq( '1,000.24' );
        } );

        it( 'should return a formatted float string from an unformatted float string', function ( ) {
            util.formatNumber( floatStr ).should.be.a( 'string' ).and.eq( '1,000.24' );
        } );

        it( 'should return false on invalid input', function ( ) {
            util.formatNumber( undefined ).should.be.false;
            util.formatNumber( null ).should.be.false;
            util.formatNumber( testStr ).should.be.false;
            util.formatNumber( testArr ).should.be.false;
            util.formatNumber( testObj ).should.be.false;
        } );
    } );

    /*getData*/


    /*toMs*/
    describe( 'toMs', function ( ) {
        it( 'should return a number of minutes converted to ms', function ( ) {
            for ( var i = 0; i < minutes.length; i++ ) {
                util.toMs( minutes[ i ] ).should.be.a( 'number' ).and.eq( parseFloat ( minutes [ i ] ) * 60 * 1000 );
            }
        } );

        it( 'should return a number of seconds converted to ms', function ( ) {
            for ( var i = 0; i < seconds.length; i++ ) {
                util.toMs( seconds[ i ] ).should.be.a( 'number' ).and.eq( parseFloat ( seconds [ i ] ) * 1000 );
            }
        } );

        it( 'should return a number of ms as a number', function ( ) {
            for ( var i = 0; i < milliseconds.length; i++ ) {
                util.toMs( milliseconds[ i ] ).should.be.a( 'number' ).and.eq( parseFloat ( milliseconds [ i ] ) );
            }
        } );
    } );
} );
