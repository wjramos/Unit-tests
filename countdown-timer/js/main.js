'use strict';

var Timer = require( './timer' );

/* Create new timer instances */
var init = function( selector ) {
  var elements = document.querySelectorAll( selector );
  var i = 0;

  while( i < elements.length ) {
      new Timer( elements[ i ] );
      i++;
  }
}

module.exports = {
    init: init
};
