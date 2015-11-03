'use strict';

var $ = require( 'jquery' );

/**
 * Get random number in range
 *
 * @param  { number } min Minimum number boundary of range
 * @param  { number } max Maximum number boundary of range
 * @return { number } Returns random number within range
 */
var getRandomIncrement = function ( min, max ) {
    var min = parseFloat( min );
    var max = ( max ? parseFloat( max ) : min );
    return min && max ? Math.floor( Math.random( ) * ( max - min ) ) + min : 0;
};

/**
 * Formats number to locale
 *
 * @param  { number } number The number to format
 * @return { string } Returns string of number formatted to locale
 */
var formatNumber = function ( number ) {
    var number = number;

    if ( typeof number === 'string' ) {
        number = parseFloat( number.replace( /,/g, '' ) );
    }

    return number && !isNaN( number ) ? number.toLocaleString( ) : false;
};

/**
 * Performs AJAX call to endpoint to retrieve an updated count
 *
 * @param { string }   endpoint An endpoint for at AJAX call
 * @param { function } callback Callback for the data
 * @param { string }   property (Optional) The data property to return
 * @callback Invokes callback function with new data. Returns value if property set
 *           or returns an object if unset
 */
var getData = function( endpoint, callback, property, cache ) {
    var cache = cache;

    // Allows caching when set, defaults to disabled
    if ( !cache ) {
        cache = false;
    }

    // Add extra cache-busting
    endpoint = endpoint + ( ( /\?/ ).test( endpoint ) ? '&' : '?' ) + ( new Date( ) ).getTime( );

    // Response callbacks
    var success = function ( data ) {
        console.log( data );
        try {
            data = JSON.parse( data );
        }

        catch ( error ) { };

        // Success
        if ( data.hasOwnProperty( property ) ) {

            // Return specific value
            callback( data[ property ] );

        } else {

            // No property - return object
            callback( data );
        }
    };

    var fail = function ( ) {
        callback( false );
    };

    // The request
    $.ajax(
        {
            url: endpoint,
            method: 'GET',
            cache: cache,
            dataType: 'json',
            success: success,
            fail: fail
        }
    );
};

/**
 * Converts string to symbol-cued ms integer
 *
 * @param  { string } time Should contain a number, and if it contains letters,
 *                         it will read as different time units
 * @return { return } Returns number ( ms )
 */
var toMs = function( time ) {
    var time = time;

    if ( !isNaN( time ) ) {
        time = time.toString( );
    }

    // Normalize case
    time = time.toLowerCase( );

    // Minutes input
    if ( time.indexOf( 'm' ) !== -1 ) {
        time = parseFloat( time ) * 1000 * 60;
    }

    // Seconds input
    else if ( time.indexOf( 's' ) !== -1 ) {
        time = parseFloat( time ) * 1000;
    }

    // Assume ms input
    else {
        time = parseInt( time );
    }

    if ( time > 0 ) {
        return time;
    } else {
        return 0;
    }
};

module.exports = {
    getRandomIncrement : getRandomIncrement,
    formatNumber       : formatNumber,
    getData            : getData,
    toMs               : toMs
};
