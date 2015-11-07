'use strict';
/**
 * Created by aperkin on 12/12/2014.
 */

var documentModule = require( './doc-shim' );

module.exports = {
    init: function ( config ) {
        documentModule.init( config );
        return this.getWindow( config );
    },

    getWindow: function () {
        var winShim = {};
        winShim.document = documentModule.getDocument();
        return winShim;
    }
};