'use strict';

var sinon   = require( 'sinon' );
var spy     = sinon.spy;

var chai    = require( 'chai' );
var should  = chai.should( );

var util    = require( '../js/utils' );
var STRING  = require( '../js/strings' );


/* Scripts to test */
var twoDigitFormat    = util.twoDigitFormat;
var getTimeDiff       = util.getTimeDiff;
var getTimeUntil      = util.getTimeUntil;
var getCalibratedTime = util.getCalibratedTime;

/* Test data */
/* Strings */
var endString    = 'December 31, 2080';
var startString  = 'March 15, 2015';
var singleLetter = 'r';
var fiveLetter   = 'roads';
var nullStr      = 'null';
var undefinedStr = 'undefined';

/* Numbers */
var zero        = 0;
var singleDigit = 4;
var fiveDigit   = 44835;
var endMs       = Date.parse( endString );
var startMs     = Date.parse( startString );

/* Dates */
var endDateObj  = new Date( endMs );
var startDateObj= new Date( startMs );
var nowDateObj  = new Date( );
var utcDateObj  = new Date( nowDateObj.getTime( ) - ( nowDateObj.getTimezoneOffset( ) * 60 * 1000 ) );

var calibratedTime    = getCalibratedTime( singleDigit );
var utcCalibratedTime = getCalibratedTime( zero );
var timeLeft          = getTimeUntil( endString );

// Set locale
nowDateObj.setDate( utcDateObj.getDate( ));
nowDateObj.setHours( utcDateObj.getHours( ) + singleDigit );


/* Tests */

describe( 'Countdown Timer Utilities', function ( ) {

    /* twoDigitFormat */
    describe( 'twoDigitFormat( any )', function ( ) {
        it( 'should trim long values to last two characters', function ( ) {
            twoDigitFormat( fiveDigit ).should.be.a( 'string' ).and.have.length( 2 ).and.equal( fiveDigit.toString( ).substr( -2 ) );
            twoDigitFormat( fiveLetter ).should.be.a( 'string' ).and.have.length( 2 ).and.equal( fiveLetter.substr( -2 ) );
            twoDigitFormat( null ).should.be.a( 'string' ).and.have.length( 2 ).and.equal( nullStr.substr( -2 ) );
            twoDigitFormat( undefined ).should.be.a( 'string' ).and.have.length( 2 ).and.equal( undefinedStr.substr( -2 ) );
        } );

        it( 'should prefix single characters/digits with a 0', function ( ) {
            twoDigitFormat( singleDigit ).should.be.a( 'string' ).and.have.length( 2 ).and.equal( '0' + singleDigit.toString( ) );
            twoDigitFormat( singleLetter ).should.be.a( 'string' ).and.have.length( 2 ).and.equal( '0' + singleLetter );
        } );

    } );

    /* getCalibratedTime */
    describe( 'getCalibratedTime( number )', function ( ) {

        it( 'should return a Date object', function ( ) {
            calibratedTime.should.be.an.instanceof( Date );
        } );


        it( 'should be adjusted by defined number of hours', function ( ) {
            calibratedTime.getHours( ).should.equal( nowDateObj.getHours( ) );
            calibratedTime.getMinutes( ).should.equal( nowDateObj.getMinutes( ) );
            calibratedTime.getSeconds( ).should.equal( nowDateObj.getSeconds( ) );
            calibratedTime.getDate( ).should.equal( nowDateObj.getDate( ) );

        } );

        it( 'should match UTC time if zero offset', function ( ) {
            utcCalibratedTime.getHours( ).should.equal( utcDateObj.getHours( ) );
            utcCalibratedTime.getMinutes( ).should.equal( utcDateObj.getMinutes( ) );
            utcCalibratedTime.getSeconds( ).should.equal( utcDateObj.getSeconds( ) );
            utcCalibratedTime.getDate( ).should.equal( utcDateObj.getDate( ) );

        } );
    } );

    /* getTimeDiff */
    describe( 'getTimeDiff( string/number/Date, [ string/number/Date ] )', function ( ) {
        it( 'should always return a number', function ( ) {
            getTimeDiff( endString ).should.be.a( 'number' );
            getTimeDiff( endString, startString ).should.be.a( 'number' );
            getTimeDiff( endDateObj ).should.be.a( 'number' );
            getTimeDiff( endDateObj, startDateObj ).should.be.a( 'number' );
            getTimeDiff( singleDigit ).should.be.a( 'number' );
            getTimeDiff( fiveDigit, startDateObj ).should.be.a( 'number' );
        } );

        it( 'should be the difference between two numbers, interpreted as milliseconds', function ( ) {
            getTimeDiff( endMs, startMs ).should.be.a( 'number' ).and.equal( endMs - startMs );
            getTimeDiff( fiveDigit, singleDigit ).should.be.a( 'number' ).and.equal( fiveDigit - singleDigit );
        } );
    } );

    /* getTimeUntil */
    describe( 'getTimeUntil( string/number/Date, number )', function ( ) {

        it( 'should return an object with date number properties', function ( ) {
            timeLeft.should.be.an( 'object' );
            timeLeft.should.have.property( 'days' ).that.is.a( 'number' );
            timeLeft.should.have.property( 'hours' ).that.is.a( 'number' );
            timeLeft.should.have.property( 'minutes' ).that.is.a( 'number' );
            timeLeft.should.have.property( 'seconds' ).that.is.a( 'number' );
            timeLeft.should.have.property( 'total' ).that.is.a( 'number' );
        } );
    } );
} )