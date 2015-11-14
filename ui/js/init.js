var window = require( 'rei-browser-shim' ).win;

/**
 * Initiates a component for each element of a given selector
 *
 * @param { function }     Component The constructor function for a component
 * @param { string/array } selector  The selector to instanciate a component on
 * @return Returns an array of constructor objects
 */
var init = function( Component, selector ) {
    if ( Component && selector ) {

        var elements = window.document.querySelectorAll( selector );
        var i = 0;

        var components = [];

        while ( i < elements.length ) {
            components[ i ] = new Component( elements[ i ] );
            i++;
        }

        return components;
    }
};

module.exports = init;
