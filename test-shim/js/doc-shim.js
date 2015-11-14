'use strict';
/**
 * Created by aperkin on 12/12/2014.
 */

var doc;

var elementStub = function ( sandbox ) {
    return [ {
        addEventListener       : sandbox.stub(),
        getAttribute           : sandbox.stub(),
        getElementsByClassName : sandbox.stub(),
        getElementsByTagName   : sandbox.stub(),
        matches                : sandbox.stub(),
        querySelector          : sandbox.stub(),
        querySelectorAll       : sandbox.stub(),
        removeAttribute        : sandbox.stub(),
        setAttribute           : sandbox.stub()
    } ]
};

var createDoc = function ( sandbox ) {
    return {
        getElementById         : sandbox.stub().returns( elementStub( sandbox )[ 0 ] ),
        querySelector          : sandbox.stub().returns( elementStub( sandbox )[ 0 ] ),
        getElementsByClassName : sandbox.stub().returns( elementStub( sandbox ) ),
        getElementsByTagName   : sandbox.stub().returns( elementStub( sandbox ) ),
        querySelectorAll       : sandbox.stub().returns( elementStub( sandbox ) ),
        addEventListener       : sandbox.stub(),
        appendChild            : sandbox.stub(),
        insertBefore           : sandbox.stub(),
        insertAfter            : sandbox.stub(),
        focus                  : sandbox.stub(),
        removeAttribute        : sandbox.stub(),
        removeChild            : sandbox.stub(),
        removeEventListener    : sandbox.stub(),
        replaceChild           : sandbox.stub(),
        cloneNode              : sandbox.stub(),
        createElement          : sandbox.stub(),
        createAttribute        : sandbox.stub(),
        scroll                 : sandbox.stub(),
        setAttribute           : sandbox.stub(),
        body                   : {}
    };
};

module.exports = {

    init: function ( config ) {
        var sandbox = config.sinon;
        doc         = createDoc( sandbox );
    },

    getDocument: function () {
        if ( !doc ) {
            throw new Error( 'Document object is empty!' );
        }

        return doc;
    }
};