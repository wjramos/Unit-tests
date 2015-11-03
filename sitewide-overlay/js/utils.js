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

    document.cookie = name + '=' + cookieString + ';path=/;domain=' + window.location.hostname;
};

/**
 * Get element siblings
 *
 * @param  { element }  element The element to get the siblings of
 * @return { nodeList } returns an array list of node siblings
 */
var getSiblings = function( element ) {

    return Array.prototype.filter.call(
        element.parentNode.children,
        function ( child ) {
            return child !== element;
        }
    );
};

/**
 * Add a set of classes to an element
 *
 * @param { element/array } elements The elements to add classes to
 * @param { string/array }  classes  The classes to add
 */
var addClasses   = function( elements, classes ) {
    var elements = elements;
    var classes  = classes;

    // If element is a single node ( using getElementById )
    if ( !elements.length ) {
        elements = [ elements ];
    }

    // If string, split to array
    if ( typeof classes === 'string' ) {
        classes = classes.split( ' ' );
    }

    // Break up any classes that contain multiple
    for ( var i = 0; i < classes.length; i++ ) {
        if ( classes[ i ].indexOf( ' ' ) > -1 ) {
            var multiple = classes[ i ].split( ' ' );

            // Remove index that contains multiple
            classes.splice( i, 1 );

            for ( var j = 0; j < multiple.length; j++ ) {
                classes.push( multiple[ j ] );
            }
        }
    }

    // Iterate through elements
    for ( i = 0; i < elements.length; i++ ) {

        if ( elements[ i ].classList ) {
            elements[ i ].classList.add.apply( elements[ i ].classList, classes );
        } else {
            elements[ i ].className += ' ' + classes[ i ].join( ' ' );
        }
    }
};

/**
 * Remove a set of classes from a set of elements
 *
 * @param { nodeList }     elements The elements to remove classes from
 * @param { string/array }  classes The classes to remove
 */
var removeClasses = function( elements, classes ) {
    var elements  = elements;
    var classes   = classes;

    // If element is a single node ( using getElementById )
    if ( !elements.length ) {
        elements = [ elements ];
    }

    // If string, split to array
    if ( typeof classes === 'string' ) {
        classes = classes.split( ' ' );
    }

    // Break up any classes that contain multiple
    for ( var i = 0; i < classes.length; i++ ) {
        if ( classes[ i ].indexOf( ' ' ) > -1 ) {
            var multiple = classes[ i ].split( ' ' );

            // Remove index that contains multiple
            classes.splice( i, 1 );

            for ( var j = 0; j < multiple.length; j++ ) {
                classes.push( multiple[ j ] );
            }
        }
    }

    // Iterate through elements
    for ( i = 0; i < elements.length; i++ ) {

        if ( elements[ i ].classList ) {
            elements[ i ].classList.remove.apply( elements[ i ].classList, classes );
        } else {
            elements[ i ].className = elements[ i ].className.split( ' ' ).filter(
                function( className ) {
                    return classes.indexOf( className ) === -1;
                }
            ).join( ' ' );
        }
    }
};

/**
 * Gets the transition duration property of an element in ms
 *
 * @param  { element } element The element to get transition property of
 * @return { return }  Returns a number, reflecting transition duration in ms
 */
var getTransition = function( element ) {
    var property;
    var properties = [
        'transitionDuration',
        'WebkitTransitionDuration',
        'msTransitionDuration',
        'MozTransitionDuration',
        'OTransitionDuration'
    ];

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
var removeNode = function( element ) {
    element.parentNode.removeChild( element );
};


/**
 * Binds an event to an element
 *
 * @param  { element }  element The element to bind
 * @param  { string }   evnt    The event to bind
 * @param  { function } funct   The function to bind
 * @return { return }   Returns element method that binds function to event on the element
 */
var bindEvent = function( element, evnt, funct ) {
    if ( element.attachEvent ) {
        return element.attachEvent( 'on' + evnt, funct );
    } else {
        return element.addEventListener( evnt, funct, false );
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
var bindClose = function ( element, triggers, evnt, effect, removeEffect ) {
    var triggers = element.querySelectorAll( triggers );

    for ( i = 0; i < triggers.length; i++ ) {
        bindEvent(
            triggers[ i ],
            evnt,
            function ( ) {

                addClasses( element, effect );
                removeEffect( );

                setTimeout(
                    function( ) {
                        removeNode( element );
                    },
                    getTransition( element )
                );
            }
        );
    }
};

module.exports = {
    setCookie:     setCookie,
    getSiblings:   getSiblings,
    addClasses:    addClasses,
    removeClasses: removeClasses,
    getTransition: getTransition,
    removeNode:    removeNode,
    bindClose:     bindClose,
    bindEvent:     bindEvent
};
