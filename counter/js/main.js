'use strict';
// var document = require( 'rei-browser-shim' ).win.doc;
var Counter = require( './counter' );

/* Create new counter instances */
var init = function( selector ) {
  var elements = document.querySelectorAll( selector );
  var i = 0;

  while( i < elements.length ) {
      new Counter( elements[ i ] );
      i++;
  }
}

module.exports = {
    init: init
};
