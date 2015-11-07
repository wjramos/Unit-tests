// 'use strict';

// var sinon   = require( 'sinon' );
// var spy     = sinon.spy;

// var chai    = require( 'chai' );
// var should  = chai.should( );

// var util    = require( '../js/utils' );
// var STRING  = require( '../js/strings' );

// var Counter = require( '../js/counter.js' );


// /* Test Data */
// var selector = 'selector';
// var element  = {
//     style: null,
//     innerHTML: '600,000',
//     dataset: {
//         counterEndpoint: '',
//         counterProperty: '',
//         counterUpdate  : '',
//         counterSpeed   : ''
//     },
//     getProperty: function ( property ) {
//         var property = property.replace( 'data-', '' ).replace( /-([a-z])/g, function ( g ) { return g[ 1 ].toUpperCase( ); } );
//         return this.dataset[ property ];
//     }
// };

// /* Stubs */
// // sinon.stub( document, 'getElementById' ).withArgs( selector ).returns( element );

// var counterObj = new Counter( selector );

// counterObj.prototype.init        = sinon.spy( );
// counterObj.prototype.getSettings = sinon.spy( );
// counterObj.prototype.setInitial  = sinon.spy( );
// counterObj.prototype.update      = sinon.spy( );
// counterObj.prototype.animate     = sinon.spy( );
// counterObj.prototype.increment   = sinon.spy( );
// counterObj.prototype.display     = sinon.spy( );

