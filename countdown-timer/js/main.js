'use strict';

var util   = require( './utils' );
var STRING = require( './strings' );

var Timer = function ( element ) {
    this.element   = element;
    this.remaining = null;
    this.countdown = null;
    this.settings  = {
        end: null,
        display: null,
        endMessage: null,
        utcOffset: null
    };

    this.init( );
};

Timer.prototype.init = function ( ) {
    var _this    = this;
    var settings = _this.settings;
    var element  = _this.element;
    var dst      = util.isDST( );

    settings.end        = Date.parse( element.getAttribute( STRING.data.end ) );
    settings.endMessage = element.getAttribute( STRING.data.endMessage );
    settings.utcOffset  = parseInt( element.getAttribute( STRING.data.utcOffset ) );

    element.style.visibility = STRING.visibility.hidden; // Do not display until populated

    // This should be made to be the inverse, current implementation is using PDT instead of PST, so need to do it this way for now
    if ( !dst ) {
        settings.utcOffset = settings.utcOffset + 1;
    }

    if ( settings.end && settings.utcOffset ) {
        settings.display = element.innerHTML;
        _this.countdown = setInterval(
            function ( ) {
                _this.update( );
            },
            1000
        );
    }
};

Timer.prototype.update = function ( ) {
    var _this     = this
    var settings  = _this.settings;

    _this.remaining = util.getTimeUntil( settings.end, settings.utcOffset );
    _this.display( );
};

Timer.prototype.display = function ( ) {
    var _this     = this;
    var remaining = _this.remaining;
    var countdown = _this.countdown;
    var element   = _this.element;
    var display   = _this.buildDisplay( );

    element.innerHTML = display;

    if ( element.style.visibility === STRING.visibility.hidden ) {
        element.style.visibility = STRING.visibility.visible;
    }

    /* Current datetime is past end datetime */
    if ( remaining.total <= 0 ) {
        clearInterval( countdown );
    }
};

Timer.prototype.buildDisplay = function ( ) {
    var _this     = this;
    var settings  = _this.settings;
    var remaining = _this.remaining;
    var display;

    /* Current datetime is past end datetime */
    if ( remaining.total > 0 ) {

        /* Substitute number values into label */
        display = settings.display
            .replace( /{\s*?DAYS\s*?}/i   , remaining.days.toString( )          )
            .replace( /{\s*?HOURS\s*?}/i  , util.twoDigitFormat( remaining.hours   ) )
            .replace( /{\s*?MINUTES\s*?}/i, util.twoDigitFormat( remaining.minutes ) )
            .replace( /{\s*?SECONDS\s*?}/i, util.twoDigitFormat( remaining.seconds ) )
            .replace( /{\s*?DATE\s*?}/i   , new Date( settings.end ).toDateString( ) )

            // Display words following numbers as singular if they end with 's' and preceding number is 1
            .replace( /(\b0*?1\s*?(?:<.*?>)*\s+?)(\w+?)([sS]\b)/g, '$1$2' );

    } else {

        /* Display End */
        display = settings.endMessage;
    }

    return display;
}

module.exports = Timer;