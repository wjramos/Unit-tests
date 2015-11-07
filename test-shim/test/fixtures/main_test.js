'use strict';

// Dependencies
var win = require( 'rei-browser-shim' ).win;
var doc = win.document;
var $ = win.jQuery = require( 'jquery2' );
var module2 = require( './main_test2' );

// test doc stub
var func1 = function () {
    var x = $( 'something' );
    x.css();
    return doc.getElementById( 'someId' );
};

var func2 = function () {
    return module2.init();
};

// test jquery stubbing
var func3 = function () {
    return $( 'selector' ).css();
};

module.exports = {
    func1: func1,
    func2: func2,
    func3: func3
};