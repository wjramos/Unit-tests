'use strict';

// object the jquery function returns
var jqObj = {};

// init calls createJQObject
// getJQObject just returns reference to jqObject so can update its stubs as needed during testing.
// init returns the jq function that returns jqObject.

var createJQueryObject = function ( sandbox ) {
    var ret = {};
    var methods = ['after', 'addClass', 'animate', 'append', 'ajax', 'attr', 'before', 'bind', 'change', 'css',
        'data', 'delegate', 'each', 'eq', 'fadeIn', 'fadeOut', 'fadeTo', 'find', 'get', 'grep', 'height', 'hide', 'html', 'off',
        'on', 'position', 'post', 'prepend', 'removeClass', 'replaceAll', 'replaceWith', 'serialize', 'siblings',
        'slideToggle', 'slideUp', 'slideDown', 'text', 'toggle', 'unbind', 'val', 'width'];

    methods.forEach( function ( method ) {
        ret[method] = sandbox.stub();
    } );
    return ret;
};

module.exports = {

    init: function ( config ) {
        var sandbox = config.sinon;
        jqObj = createJQueryObject( sandbox );

        return function () {
            return jqObj;
        };
    }
};