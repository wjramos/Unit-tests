'use strict';

/**
 * Formats number to a two-digit number ( ex. 9 -> 09 )
 *
 * @param  { number } number  Any number
 * @return { string } Returns 0 prefixed ( one-digit param ),
 *                    trimmed ( three-digit param ),
 *                    or same number ( two-digit param )
 *                    as string.
 */
var twoDigitFormat = function( number ) {
    return ( '0' + number ).slice( -2 );
};

/**
 * Adjusts client's datetime to consistent timezone
 *
 * @param  { number } utcOffset The UTC offset to calibrate local time to
 * @return { return } Returns Date object, adjusted to specific timezone
 */
var getCalibratedTime = function( utcOffset ) {

    var localTime   = new Date( );
    var localOffset = localTime.getTimezoneOffset( ) * 60 * 1000;
    var utcOffset   = utcOffset * 60 * 60 * 1000;

    if ( localOffset !== utcOffset ) {

        // Get UTC time
        var utc = localTime.getTime( ) - localOffset;

        // Calibrate time to a static UTC utcOffset
        var adjustedTime = new Date( utc + utcOffset );

        return adjustedTime;

    } else {

        return localTime;
    }
};


/**
 * Detects client timezone offset
 *
 * @param  { date }   date    The client's datetime
 * @return { return } Returns larger offset of Jan (northern hemisphere) or Jul (southern hemisphere)
 */
var timezoneOffset = function( date ) {
    var jan = new Date( date.getFullYear( ), 0, 1 );
    var jul = new Date( date.getFullYear( ), 6, 1 );

    return Math.max( jan.getTimezoneOffset( ), jul.getTimezoneOffset( ) );
};

/**
 * Detects if client is currently in DST
 *
 * @param  { date }   date The client date
 * @return { return } Returns T/F if client is experiencing DST
 */
var isDST = function( ) {
    var date = new Date( );
    return date.getTimezoneOffset( ) < timezoneOffset( date );
};

/**
 * Gets ms between two datetimes
 *
 * @param  { string/number } end   A parsable date string/UNIX timestamp
 * @param  { string/number } start A parsable date string/UNIX timestamp
 * @return { number } Returns the number of ms between two datetimes
 */
var getTimeDiff = function( end, start ) {
    var end       = end;
    var start     = start;

    if ( !start ) {
        start = new Date( ).getTime( );
    }

    if ( typeof end !== 'number') {
        end = Date.parse( end );
    }

    if ( typeof start !== 'number') {
        start = Date.parse( start );
    }

    var diff = end - start;

    if ( diff > 0 ) {

        return diff;

    } else {

        return 0;
    }
};

/**
 * Gets time remaining from now until a certain datetime.
 *
 * @param  { string/number } end A parsable date string/UNIX timestamp
 * @param  { number } utcOffset  A timezone offset
 * @return { object } Returns an object containing numerical date-time properties
 */
var getTimeUntil = function( end, utcOffset ) {
    var utcOffset = utcOffset;

    if ( typeof utcOffset !== 'number' ) {
        utcOffset = 7; // PST
    }

    var now      = getCalibratedTime( utcOffset ).getTime( );
    var diff     = getTimeDiff( end, now );
    var timeLeft = new Date( diff );

    // Convert to days, hours, minutes, and seconds - wait to round
    var seconds = diff    / 1000;
    var minutes = seconds / 60;
    var hours   = minutes / 60;
    var days    = hours   / 24;

    return {
        'days'   : Math.floor( days ),
        'hours'  : Math.floor( hours   % 24 ),
        'minutes': Math.floor( minutes % 60 ),
        'seconds': Math.floor( seconds % 60 ),
        'total'  : diff
    };
};

module.exports = {
    twoDigitFormat   : twoDigitFormat,
    getCalibratedTime: getCalibratedTime,
    isDST            : isDST,
    getTimeDiff      : getTimeDiff,
    getTimeUntil     : getTimeUntil
};