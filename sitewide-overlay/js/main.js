'use strict';

var util        = require( './util' );
var STRING      = require( './strings' );

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


        /* Add true src from data attribute to prevent unneeded partial load when not visible */
        if ( window.screen.width < 768 ) {
            /* On mobile, load image */
            var image = overlay.querySelectorAll( 'img' );

            util.copyAttrib( image, 'data-src', 'src' );
            util.copyAttrib( image, 'data-srcset', 'srcset' );

        } else {
            /* Else load video asset */
            var media = overlay.querySelectorAll( 'source, video, img' );
            var video = overlay.querySelectorAll( 'video' )[ 0 ];

            util.copyAttrib( media, 'data-src', 'src' );
            util.copyAttrib( media, 'data-srcset', 'srcset' );
            util.copyAttrib( media, 'data-poster', 'poster' );
            video.load( );
            video.play( );
        }

        /* Set data attribute for page view metrics */
        overlay.setAttribute( STRING.data.shown, true );

        /* Bind sub-elements with close events */
        util.bindClose( overlay, STRING.selector.closeTriggers, STRING.event.click, STRING.effect.fadeOut, function ( ) { removeBackgroundEffect( overlay ) } );

        /* Add visual effect to background elements */
        window.document.addEventListener( STRING.event.domReady, function ( ) { addBackgroundEffect( overlay ) } );

        /* Display */
        util.removeClasses( overlay, STRING.effect.hidden );

    } else {

        /* Don't show, remove node */
        util.removeNode( overlay, media );
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
    overlay.querySelectorAll( STRING.selector.backdrop )[ 0 ].style.opacity = STRING.style.opacity;
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
