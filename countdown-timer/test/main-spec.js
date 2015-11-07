'use strict';

var sinon   = require( 'sinon' );
var spy     = sinon.spy;

var chai    = require( 'chai' );
var should  = chai.should( );

var util    = require( '../js/utils' );
var STRING  = require( '../js/strings' );

var Timer = require( '../js/timer' );

/* Test Data */
var timeMs   = 122244523;
var selector = 'selector';
var element  = {
    style: null,
    innerHTML: '{ seconds} seconds',
    dataset: {
        endMessage: '',
        utcOffset : '',
        end       : timeMs
    }

}

/* Stubs */
sinon.stub( document, 'getElementById' ).withArgs( selector ).returns( element );
sinon.stub( Date, 'parse' ).withArgs( 'data.end' ).returns( timeMs );


timerObj = new Timer( selector );

timerObj.prototype.init         = sinon.spy( );
timerObj.prototype.update       = sinon.spy( );
timerObj.prototype.display      = sinon.spy( );
timerObj.prototype.buildDisplay = sinon.spy( );

/* Tests */
describe( 'Countdown Timer', function ( ) {

    /* Timer.init */
    describe( 'Timer', function ( ) {
        it( 'should be a constructor', function ( ) {
            timerObj.should.be.an.instanceof( Timer );
        } );

        it( 'should call own init function', function ( ) {
            timerObj.init.calledOnce;
        } );
    } );

    /* Timer.init */
    describe( 'Timer.init', function ( ) {
        it( 'should set element style visibility property to hidden', function ( ) {
            timerObj.element.style.visibility.should.be.a( 'string' ).and.equal( 'hidden' );
        } );

        it( 'should set end property to date-parsed element data end', function ( ) {
            timerObj.settings.end.should.equal( element.dataset.end );
        } );

        it( 'should set end message property to element data end message', function ( ) {
            timerObj.settings.endMessage.should.equal( element.dataset.endMessage );
        } );

        it( 'should set utc offset property to either element data utc offset or default setting', function ( ) {
            if ( element.dataset.utcOffset ) {
                timerObj.settings.utcOffset.should.equal( parseInt( element.dataset.utcOffset ) );
            } else {
                timerObj.settings.utcOffset.should.equal( timerObj.settings.utcDefault );
            }
        } );

        describe( 'if there is a valid date, it', function ( ) {
            it( 'should set display property to element content', function ( ) {
                timerObj.settings.endMessage.should.equal( element.dataset.endMessage );
            } );

            it( 'should set countdown property to an interval', function ( ) {
                // timerObj.countdown.should.equal( element.dataset.endMessage );
                console.log( typeof timerObj )
            } );

            it( 'should call update once per interval', function ( ) {
                // timerObj.countdown.should.equal( element.dataset.endMessage );
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