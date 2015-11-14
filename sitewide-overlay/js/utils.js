var window = require( 'rei-browser-shim' ).win;

/**
 * Sets a client cookie
 *
 * @param { string } param Description
 * @param { string } value The value of the cookie
 * @param { number } days  Days until the cookie should expire
 */
var setCookie = function( name, value, days ) {
    var expiration = new Date( );

    /* Set expiration to expire in X days from initial */
    expiration.setDate( expiration.getDate( ) + days );

    var cookieString = escape( value ) + ( ( days === null ) ? '' : ';expires=' + expiration.toUTCString( ) );

    window.document.cookie = name + '=' + cookieString + ';path=/;domain=' + window.location.hostname;
};

/**
 * Element Iterations with callback
 *
 * @param    { element/nodeList } elems Elements to interate
 * @callback { function } func Callback function to perform on each element in set
 */
var eachElem = function( elems, func ) {

    // If element is a single node ( using getElementById )
    if ( !elems.length ) {
        elems = [ elems ];
    }

    for ( var i = 0; i < elems.length; i++ ) {
        func( elems[ i ] );
    }
};

/**
 * Splits string or array into array of individual words
 *
 * @param  { string/array } source Phrase/set of phrases to split
 * @return { array } Returns array of individual words
 */
var toWordArray = function ( source ) {
    // If string, split to array
    if ( typeof source === 'string' ) {
        source = source.split( ' ' );
    }

    // Break up any classes that contain multiple
    for ( var i = 0; i < source.length; i++ ) {
        if ( source[ i ].indexOf( ' ' ) > -1 ) {
            var multiple = source[ i ].split( ' ' );

            // Remove index that contains multiple
            source.splice( i, 1 );

            for ( var j = 0; j < multiple.length; j++ ) {
                source.push( multiple[ j ] );
            }
        }
    }

    return source;
};

/**
 * Get element siblings
 *
 * @param  { element }  element The element to get the siblings of
 * @return { nodeList } returns an array list of node siblings
 */
var getSiblings = function( elem ) {

    return Array.prototype.filter.call(
        elem.parentNode.children,
        function( child ) {
            return child !== elem;
        }
    );
};

/**
 * Add a set of classes to an element
 *
 * @param { element/array } elements The elements to add classes to
 * @param { string/array }  classes  The classes to add
 */
var addClasses = function( elems, classes ) {

    var classes = toWordArray( classes );

    // Iterate through elements
    eachElem(
        elems,
        function( elem ) {
            if ( elem.classList ) {
                elem.classList.add.apply( elem.classList, classes );
            } else {
                for ( var i = 0; i < classes.length; i++ ) {
                    elem.className += ' ' + classes[ i ].join( ' ' );
                }
            }
        }
    );
};

/**
 * Remove a set of classes from a set of elements
 *
 * @param { nodeList }     elements The elements to remove classes from
 * @param { string/array }  classes The classes to remove
 */
var removeClasses = function( elems, classes ) {

    var classes = toWordArray( classes );

    // Iterate through elements
    eachElem(
        elems,
        function( elem ) {
            if ( elem.classList ) {
                elem.classList.remove.apply( elem.classList, classes );
            } else {
                elem.className = elem.className.split( ' ' ).filter(
                    function( className ) {
                        return classes.indexOf( className ) === -1;
                    }
                ).join( ' ' );
            }
        }
    );
};

/**
 * Gets the transition duration property of an element in ms
 *
 * @param  { element } element The element to get transition property of
 * @return { return }  Returns a number, reflecting transition duration in ms
 */
var getTransition = function( element ) {
    var properties = [
        'transitionDuration',
        'WebkitTransitionDuration',
        'msTransitionDuration',
        'MozTransitionDuration',
        'OTransitionDuration'
    ];

    var property;
    while ( property = properties.shift( ) ) {
        var duration = getComputedStyle( element )[ property ];

        if ( typeof duration != 'undefined' ) {
            return parseFloat( duration ) * 1000;
        }
    }

    return 0;
};

/**
 * Removes selected node from DOM
 *
 * @param { element } element The element to remove
 */
var removeNode = function( elem ) {
    elem.parentNode.removeChild( elem );
};

/**
 * Binds an event to an element
 *
 * @param  { element }  element The element to bind
 * @param  { string }   evnt    The event to bind
 * @param  { function } funct   The function to bind
 * @return { return }   Returns element method that binds function to event on the element
 */
var bindEvent = function( elem, evnt, funct ) {
    if ( elem.attachEvent ) {
        return elem.attachEvent( 'on' + evnt, funct );
    } else {
        return elem.addEventListener( evnt, funct, false );
    }
};

/**
 * Binds triggers within element to act as close
 *
 * @param { element }      element  The element to close
 * @param { string/array } triggers The elements to bind event to
 * @param { string }       evnt     The event to bind
 * @param { string/array } effect   Animation classes to add
 */
var bindClose = function( elem, triggers, evnt, effect, removeEffect ) {
    var triggers = elem.querySelectorAll( triggers );

    for ( i = 0; i < triggers.length; i++ ) {
        bindEvent(
            triggers[ i ],
            evnt,
            function( ) {

                addClasses( elem, effect );
                removeEffect( );

                setTimeout(
                    function( ) {
                        removeNode( elem );
                    },
                    getTransition( elem )
                );
            }
        );
    }
};

/**
 * Sets an element's attribute from another attribute
 *
 * @param { element/nodeList } element The element(s) to set attributes of
 * @param { string }           srcAttrib The attribute to set source from
 * @param { string }           tarAttrib The attribute to set
 */
var copyAttrib = function( elems, srcAttrib, tarAttrib ) {

    if ( elems && srcAttrib && tarAttrib ) {

        eachElem(
            elems,
            function( elem ) {
                if ( elem.hasAttribute( srcAttrib ) ) {
                    elem.setAttribute( tarAttrib, elem.getAttribute( srcAttrib ) );
                }
            }
        );
    }
};

/**
 * Checks the computed style on the <body> element to see if the appropriate breakpoint element is showing.
 *
 * @return {String|null} String containing the value in the content property of the body:after element, if no win.getComputedStyle, returns null.
 */
function getBreakpoint( ) {
    if( !!window.getComputedStyle ) {
        var contentString = window.getComputedStyle( document.body, ':after' ).getPropertyValue( 'content' );
        return contentString.replace( /\W/g, '' );
    }

    return null;
}

module.exports = {
    setCookie     : setCookie,
    getSiblings   : getSiblings,
    addClasses    : addClasses,
    removeClasses : removeClasses,
    getTransition : getTransition,
    removeNode    : removeNode,
    bindClose     : bindClose,
    bindEvent     : bindEvent,
    copyAttrib    : copyAttrib,
    eachElem      : eachElem,
    toWordArray   : toWordArray,
    getBreakpoint : getBreakpoint
};
