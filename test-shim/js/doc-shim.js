'use strict';
/**
 * Created by aperkin on 12/12/2014.
 */

var doc;

var createDoc = function ( sandbox ) {
    return {
        addEventListener: sandbox.stub(),
        appendChild: sandbox.stub(),
        getElementById: sandbox.stub(),
        getElementsByClassName: sandbox.stub(),
        getElementsByTagName: sandbox.stub(),
        insertBefore: sandbox.stub(),
        insertAfter: sandbox.stub(),
        body: {},
        focus: sandbox.stub(),
        querySelector: sandbox.stub(),
        querySelectorAll: sandbox.stub(),
        removeAttribute: sandbox.stub(),
        removeChild: sandbox.stub(),
        removeEventListener: sandbox.stub(),
        replaceChild: sandbox.stub(),
        cloneNode: sandbox.stub(),
        createElement: sandbox.stub(),
        createAttribute: sandbox.stub(),
        scroll: sandbox.stub(),
        setAttribute: sandbox.stub()
    };
};

module.exports = {

    init: function ( config ) {
        var sandbox = config.sinon;
        doc = createDoc( sandbox );
    },

    getDocument: function () {
        if ( !doc ) {
            throw new Error( 'Document object is empty!' );
        }
        return doc;
    }
};