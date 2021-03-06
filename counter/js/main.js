'use strict';

var util   = require( './utils' );
var STRING = require( './strings' );

function Counter( element ) {
    this.element   = element;
    this.counter   = null; // The count timer
    this.heartbeat = null; // The update interval
    this.badCalls  = 0;
    this.settings  = {
        property : null,
        endpoint : null,
        speed    : 8000,
        update   : 15000
    };

    this.count = {
        current : 0,
        updated : 0
    };

    this.init( );
};

/* Initiate the counter */
Counter.prototype.init = function( ) {
    var _this    = this;
    var settings = _this.settings;

    // Get configuration from html data attributes
    _this.getSettings( );

    // Get initial count
    _this.update( );

    // Regularly polls for new data
    _this.heartbeat = setInterval(
        function( ) {
            _this.update( );
        },
        settings.update
    );
};

/* Get settings from data attributes */
Counter.prototype.getSettings = function ( ) {
    var _this         = this;
    var settings      = _this.settings;
    var element       = _this.element;
    var countProperty = element.getAttribute( STRING.data.countProperty );
    var countSpeed    = element.getAttribute( STRING.data.countSpeed );
    var countUpdate   = element.getAttribute( STRING.data.countUpdate );
    settings.endpoint = element.getAttribute( STRING.data.endpoint );

    // Set manual count speed if configured
    if ( countSpeed ) {
        var speed = util.toMs( countSpeed );

        if ( typeof speed === 'number') {
            settings.speed = speed;
        }
    }

    // Set manual update speed if configured
    if ( countUpdate ) {
        var update = util.toMs( countUpdate );

        if ( typeof update === 'number') {
            settings.update = update;
        }
    }

    if ( countProperty ) {
        settings.property = countProperty;
    } else {
        settings.property = 'total';
    }
};

/* Update the counter */
Counter.prototype.update = function ( ) {
    var _this    = this;
    var settings = _this.settings;
    var count    = _this.count;
    var badCalls = _this.badCalls;

    /* Clear previous counter */
    clearInterval( _this.counter );

    /* Only get data if it has been able to find it */
    if ( badCalls < 3 ) {

        /* Get data and update count */
        util.getData(
            settings.endpoint,
            function( newCount ) {

                /* Request returned a number */
                if ( !isNaN( newCount ) ) {

                    /* Reset consecutive bad call count */
                    badCalls = 0;

                    _this.setInitial( newCount );

                    /* Update the count if the new count is larger */
                    if ( count.current < newCount ) {

                        count.updated = parseInt( newCount );
                    }

                    /* It will be one off by the end of the interval - the interval will continue indefinitely
                     *  if we use gt,eq so we need to adjust
                     */
                     if ( count.updated - count.current === 1 ) {
                        count.current++;
                    }

                } else {

                    /* There was some kind of error, or response was not a number */
                    badCalls++;
                }

                /* Animate count */
                _this.animate( );
            },
            settings.property
        );

    } else {

        /* Kill heartbeat if bad call threshold met */
        clearInterval( _this.heartbeat );
    }
};

/* Set incremental counter */
Counter.prototype.animate = function ( ) {
    var _this    = this;
    var count    = _this.count;
    var settings = _this.settings;

    if ( count.current < count.updated ) {

        _this.counter = setInterval(
            function( ) {
                _this.increment( );
            },

            /* Take the entire count duration */
            settings.speed / ( count.updated - count.current )
        );
    }
};

/* Increase count */
Counter.prototype.increment = function ( ) {
    var _this   = this;
    var count   = _this.count;

    /* Increment until new count has been met */
    if ( count.current < count.updated ) {
        count.current = count.current + util.getRandomIncrement( 1, Math.min( count.updated - count.current, 5 ) );

        _this.display( );

    } else {
        clearInterval( _this.counter );
    }
};

/* Show the count */
Counter.prototype.display = function ( ) {
    var _this   = this;
    var element = _this.element;
    var count   = _this.count;

    if ( element.style.visibility = 'hidden' ) {
        element.style.visibility = 'visible';
    }

    element.innerHTML = util.formatNumber( count.current );
};

/* Set the number to initially display */
Counter.prototype.setInitial = function ( initialCount ) {
    var _this   = this;
    var count   = _this.count;
    var element = _this.element;

    /* Initial count view */
    if ( count.current === 0 && initialCount > 0 ) {

        count.updated = count.current = initialCount;

    } else if ( count === 0 ) {

        /* Get HTML content and try to get a number */
        var elemCount = parseInt( element.innerHTML.replace( /,/g, '' ) );

        /* Only use the html content as initial count if it can be successfully parsed to a number */
        if ( !isNaN( elemCount ) ) {

            count.current = elemCount;

        } else {

            count.current = 0;
        }
    }

    _this.display( );
};

module.exports = Counter;
