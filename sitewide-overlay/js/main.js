'use strict';

var util      = require( './utils' );
var STRING    = require( './strings' );

var showOverlay;

/**
 * Initiates interstital overlay if cookie is not present, and visitor is not a crawler
 *
 * @param { string } id The interstitial's id
 */
var init = function ( id ) {
    var overlay   = window.document.getElementById( id );
    var isCrawler = navigator.userAgent.match( STRING.regex.crawlerPattern ) !== null;
    var hasCookie = window.document.cookie.indexOf( STRING.cookieName ) >= 0;

    if ( !isCrawler && !hasCookie ) {
        showOverlay = true;
        util.setCookie( STRING.cookieName, true, 1 );

    } else {

        showOverlay = false;
    }

    /* Console status */
    console.log( 'is crawler: '   + isCrawler );
    console.log( 'has cookie: '   + hasCookie );
    console.log( 'show overlay: ' + showOverlay );

    /* Display or remove overlay */
    show( overlay, showOverlay );
};

/**
 * Shows or removes element based on condition
 *
 * @param { element } overlay The overlay element
 * @param { boolean } show    T/F to show the overlay
 */
var show = function ( overlay, show ) {

    if ( show === true ) {

        /* Add visual effect to background elements */
        window.document.addEventListener( STRING.event.domReady, function ( ) { addBackgroundEffect( overlay ) } );

        /* Data */
        overlay.setAttribute( STRING.data.shown, true );

        /* Display */
        util.removeClasses( overlay, STRING.effect.hidden );

        /* Bind sub-elements with close events */
        util.bindClose( overlay, STRING.selector.closeTriggers, STRING.event.click, STRING.effect.fadeOut, function ( ) { removeBackgroundEffect( overlay ) } );

    } else {

        /* Don't show, remove node */
        util.removeNode( overlay );
    }
};

/**
 * Adds visual effects to background elements
 *
 * @param { element } overlay The overlay to add effects to elements behind
 */
var addBackgroundEffect = function ( overlay ) {
    /* Background Effects */
    var siblings         = util.getSiblings( overlay );
    var backgroundEffect = [ STRING.effect.fadeIn, STRING.effect.blur, STRING.effect.appear ];

    /* Apply effect */
    for ( var i = 0; i < siblings.length; i++ ) {
        util.addClasses( siblings[ i ], backgroundEffect );
    }

    /* Reveal */
    overlay.querySelectorAll( STRING.selector.backdrop )[ 0 ].style.opacity = '.7';
};

/**
 * Removes visual effects to background elements
 *
 * @param { element } overlay The overlay to add effects to elements behind
 */
var removeBackgroundEffect = function ( overlay ) {
    /* Background Effects */
    var siblings         = util.getSiblings( overlay );
    var backgroundEffect = [ STRING.effect.blur ];

    /* Appearance */
    for ( var i = 0; i < siblings.length; i++ ) {
        util.removeClasses( siblings[ i ], backgroundEffect );
    }
};

module.exports = {
    init : init,
    shown: showOverlay
};
