'use strict';

var shim   = require( '../../test-shim/js/main' );
var expect = shim.expect;
var spy    = shim.spy;

var STRING = require( '../js/strings' );

var utils = {
    twoDigitFormat    : function ( ) { return spy( ) },
    getCalibratedTime : function ( ) { return spy( ) },
    isDST             : function ( ) { return spy( ) },
    getTimeDiff       : function ( ) { return spy( ) },
    getTimeUntil      : function ( ) { return spy( ) }
}

var Timer  = shim.init( '../../countdown-timer/js/main', {
    './utils' : utils
} );

/* Test Data */
var timeMs   = 122244523;
var selector = 'selector';
var element  = {
    style: {
        visibility: null
    },
    innerHTML: '{ seconds} seconds',
    dataset: {
        endMessage: '',
        utcOffset : '',
        end       : timeMs
    },
    getAttribute: function ( ) {
        shim.stub();
    }
}

/* Stubs */
shim.getStub( 'getElementById' ).withArgs( selector ).returns( element );
// shim.getStub( 'parse' ).withArgs( 'data.end' ).returns( timeMs );

var timerObj = new Timer( element );

timerObj.init         = spy( );
timerObj.update       = spy( );
timerObj.display      = spy( );
timerObj.buildDisplay = spy( );

/* Tests */
describe( 'Countdown Timer', function ( ) {

    /* Timer.init */
    describe( 'Timer', function ( ) {
        it( 'should be a constructor', function ( ) {
            expect( timerObj ).to.be.an.instanceof( Timer );
        } );

        it( 'should call own init function', function ( ) {
            timerObj.init.calledOnce;
        } );
    } );

    /* Timer.init */
    describe( 'Timer.init', function ( ) {
        it( 'should set element style visibility property to hidden', function ( ) {
            expect( timerObj.element.style.visibility ).to.be.a( 'string' ).and.equal( 'hidden' );
        } );

        it( 'should set end property to date-parsed element data end', function ( ) {
            expect( timerObj.settings.end ).to.equal( element.dataset.end );
        } );

        it( 'should set end message property to element data end message', function ( ) {
            expect( timerObj.settings.endMessage ).to.equal( element.dataset.endMessage );
        } );

        it( 'should set utc offset property to either element data utc offset or default setting', function ( ) {
            if ( element.dataset.utcOffset ) {
                expect( timerObj.settings.utcOffset ).to.equal( parseInt( element.dataset.utcOffset ) );
            } else {
                expect( timerObj.settings.utcOffset ).to.equal( timerObj.settings.utcDefault );
            }
        } );

        describe( 'if there is a valid date, it', function ( ) {
            it( 'should set display property to element content', function ( ) {
                expect( timerObj.settings.endMessage ).to.equal( element.dataset.endMessage );
            } );

            it( 'should set countdown property to an interval', function ( ) {
                // expect( timerObj.countdown ).to.equal( element.dataset.endMessage );
                console.log( typeof timerObj )
            } );

            it( 'should call update once per interval', function ( ) {
                // expect( timerObj.countdown ).to.equal( element.dataset.endMessage );
            } );
        } );
    } );

    /* Timer.update */
    describe( 'Timer.update', function ( ) {
        it( 'should assign value to remaining', function ( ) {

        } );

        it( 'should invoke getTimeUntil', function ( ) {

        } );

        it( 'should invoke display', function ( ) {

        } );
    } );

    /* Timer.display */
    describe( 'Timer.display', function ( ) {
        it( 'should invoke buildDisplay', function ( ) {

        } );

        it( 'should replace element innerHTML with result of buildDisplay', function ( ) {

        } );

        it( 'should change element style visibility to "visible"', function ( ) {
            element.style.visibility.should.equal( 'visible' );
        } );

        describe( 'if remaining time is less than or equal to zero, it', function ( ) { if ( timerObj.remaining <= 0 ) {
            it( 'should clear timer at countdown', function ( ) {

            } );
        } } );
    } );

    /* Timer.buildDisplay */
    describe( 'Timer.buildDisplay', function ( ) {
        describe( 'if there is time remaining or not, it', function ( ) { if ( timerObj.remaining > 0 ) {
            it( 'should return display with specific tags replaced from remaining', function ( ) {

            } ); }
            else { it( 'should return end message', function ( ) {

            } );
        } } );
    } );
} );