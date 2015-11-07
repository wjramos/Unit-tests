'use strict';

// Dependencies
var win = require( 'rei-browser-shim' ).win;
var doc = win.document;
var $ = win.jQuery = require( 'jquery2' );

var init = function () {
    doc.getElementById( 'someId' );
};

module.exports = {
    init: init
};