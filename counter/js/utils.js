'use strict';

var window = require( 'rei-browser-shim' ).win;
var $      = require( 'jquery2' );

/**
 * Get random number in range
 *
 * @param  { number } min Minimum number boundary of range
 * @param  { number } max Maximum number boundary of range
 * @return { number } Returns random number within range, or zero if bad input
 */
var getRandomIncrement = function ( min, max ) {
    var min = parseFloat( min );
    var max = max ? parseFloat( max ) : min;
    return min && max ? Math.floor( Math.random( ) * ( max - min ) ) + min : 0;
};

/**
 * Formats number to string with commas for thousands
 *
 * @param  { number } number The number to format
 * @return { string } Returns string of number formatted to thousands
 */
var formatNumber = function ( number ) {
    var number = number;

    if ( typeof number === 'string' ) {
        number = parseFloat( number.replace( /,/g, '' ) );
    }

    return number && typeof number === 'number' ? number.toString( ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' ) : '';
};


/**
 * Checks if client is a version of IE less than version, returns version if it is, false if not
 *
 * @return { number / false } Returns number or false corresponding to IE version
 */
var detectIE = function ( ) {
    var version = false;

    if ( navigator.appName === 'Microsoft Internet Explorer' ) {
        if ( navigator.userAgent.indexOf( 'MSIE' ) !== -1 ) {
            version = parseInt( navigator.userAgent.match( /MSIE ([\d.]+)/ )[ 1 ], 10 );
        }

    } else if ( navigator.appName === 'Netscape' ) {
        if ( navigator.userAgent.indexOf( 'Trident' ) !== -1 ) {
            version = parseInt( navigator.userAgent.match( /Trident\/7.0;.*rv:([\d.]+)/ )[ 1 ], 10 );
        } else if ( navigator.userAgent.indexOf( 'Edge' ) !== -1 ) {
            version = parseInt( navigator.userAgent.match( /Edge\/([\d.]+)/ )[ 1 ], 10 );
        }
    }

    return version;
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
var getData = function ( endpoint, callback, property, cache ) {

    /* Response callbacks */
    var error = function ( error ) {
        callback( false );
    };

    var success = function ( data ) {
        var data = data;

        try {
            data = JSON.parse( data );
        } catch ( error ) { };

        /* Success */
        if ( data ) {
            if ( data.hasOwnProperty( property ) ) {

                /* Return specific value */
                callback( data[ property ] );

            } else {

                /* No property - return object */
                callback( data );
            }
        }
    };

    var request = function ( endpoint, success, error ) {
        var hostname = window.location.hostname;

        /* Instruct jQuery to use crossOrigin */
        if ( endpoint.indexOf( hostname === -1 ) ) {
            var crossDomain = true;
            $.support.cors  = true;
        }

        /* Add extra cache-busting */
        endpoint = endpoint + ( ( /\?/ ).test( endpoint ) ? '&' : '?' ) + ( new Date( ) ).getTime( );

        var versionIE = detectIE( );

        if ( crossDomain === true && versionIE && versionIE < 10 ) {

            /* IE8 & 9 only Cross domain JSON GET request */
            if ( 'XDomainRequest' in window && window.XDomainRequest !== null ) {

                var protocol = window.location.protocol;

                /* Requires data source to share the same protocol */
                if ( endpoint.indexOf( protocol ) < 0 ) {
                    endpoint = endpoint.replace( /^http[s]?\:/, protocol );
                }

                var xdr = new XDomainRequest( );

                xdr.open( 'GET', endpoint );

                xdr.onload = function ( ) {
                    var dom = new ActiveXObject( 'Microsoft.XMLDOM' );
                    var data = xdr.responseText;

                    dom.async = false;

                    if ( data === null || typeof data === 'undefined' ) {
                        data = $.parseJSON( data );
                        data = data.firstChild.textContent;
                    }

                    success( data );
                };

                xdr.onerror = function ( ) {
                    error( );
                };

                /* Prevents IE from timing out mid-transit */
                xdr.onprogress = function ( ) {};
                xdr.ontimeout = function ( ) {};

                setTimeout(
                    function ( ) {
                        xdr.send( );
                    },
                    0
                );

            } else if ( versionIE < 8 ) {
                /* IE7 and lower can't do cross domain */
                error( 'IE 8 and below do not support Cross-Origin requests' );
            }

        } else {

            /* Primary request */
            $.ajax( {
                url: endpoint,
                crossDomain: crossDomain ? crossDomain : false,
                method: 'GET',
                cache: cache ? cache : false,
                dataType: 'json',
                success: success,
                error: error
            } );
        }
    };

    /* Send request */
    request( endpoint, success, error );
};

/**
 * Converts string to symbol-cued ms integer
 *
 * @param  { string } time Should contain a number, and if it contains letters,
 *                         it will read as different time units
 * @return { return } Returns number ( ms )
 */
/**
 * Get random number in range
 *
 * @param  { number } min Minimum number boundary of range
 * @param  { number } max Maximum number boundary of range
 * @return { number } Returns random number within range, or zero if bad input
 */
var getRandomIncrement = function ( min, max ) {
    var min = parseFloat( min );
    var max = max ? parseFloat( max ) : min;
    return min && max ? Math.floor( Math.random( ) * ( max - min ) ) + min : 0;
};

/**
 * Formats number to string with commas for thousands
 *
 * @param  { number } number The number to format
 * @return { string } Returns string of number formatted to thousands
 */
var toMs = function ( time ) {
    var time = time;

    if ( typeof time === 'number' ) {
        time = time.toString( );
    }

    if ( typeof time === 'string' ) {
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

    } else {
        return 0;
    }
};

module.exports = {
    getRandomIncrement: getRandomIncrement,
    formatNumber: formatNumber,
    detectIE: detectIE,
    getData: getData,
    toMs: toMs
};
