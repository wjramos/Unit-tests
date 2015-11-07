'use strict';

/**
 *
 * Unit test shim
 *
 * Module to simplify writing unit tests in REI's environment.
 *
 * Goals:
 * - stub dom/jq api (add methods as needed) in main module.
 * - on-the-fly stubbing of dom/jq methods.
 * - same config api as proxyquire.
 * - support sinon's api by default. (same spy/stub/mock method signatures).
 * - sandboxes tests.
 *
 * Usage:  See unit tests (/test/test-shim-spec.js)
 *
 * Todo:  Add mocks. Update package.json.
 *
 */

var sinon = require( 'sinon' );
var proxyquire = require( 'proxyquire' ).noCallThru();
var _ = require( 'lodash-compat' );
var chai = require( 'chai' );
var winModule = require( './win-shim' );
var sandbox = sinon.sandbox.create();
var browserConfig;
var jqModule = require( './jquery-shim' );

/**
 * Create proxyquire config for browser (DOM and JQuery).
 * @returns {Object} Config object with browser shim and jquery shims.
 */
var createBrowserConfig = function ( win, jq ) {
    return {
        'rei-browser-shim': {
            win: win
        },
        'jquery2': jq
    };
};

var isDocument = function ( obj ) {
    return obj && typeof obj.body === 'object';
};

var isWindow = function ( obj ) {
    return obj && typeof obj.document === 'object';
};

// adds dom/jq stubs to dependency modules.
var domifyConfig = function ( moduleFile, conf ) {
    var newConf = {};
    var moduleConf = _.clone( conf );
    var domifiedConf;

    for ( var moduleName in moduleConf ) {
        domifiedConf = _.extend( browserConfig, moduleConf[moduleName] );
        moduleConf[moduleName] = domifiedConf;
    }

    newConf[moduleFile] = moduleConf;

    return _.extend( conf, browserConfig );
};

var callProxyquire = function ( moduleFile, config ) {

    // add browser/jq proxyquire config
    var newConf = domifyConfig( moduleFile, config );

    newConf = _.extend( newConf, browserConfig );

    return proxyquire( moduleFile, newConf );
};

var callSinonAPI = function ( method, args ) {
    var stubbedMethod = args[1];
    var win = winModule.getWindow();
    var doc = win.document;

    // call stub/spy
    var stubSpy = sandbox[method].apply( sandbox, args );

    // add stubbed version to doc.
    if ( isDocument( args[0] ) ) {
        doc[stubbedMethod] = stubSpy;
    }

    // add stubbed version to doc.
    if ( isWindow( args[0] ) ) {
        win[stubbedMethod] = stubSpy;
    }

    return stubSpy;
};

var mod = {

    config: {},

    restore: function () {
        sandbox.restore();
    },

    sandbox: {},

    win: {},

    // config is passed in shimmed modules (excuding any dom, jquery)
    init: function ( moduleFilePath, config ) {

        this.sandbox = sandbox;

        // reset the win/dom stub cache
        var win = this.win = winModule.init( {
            sinon: sandbox
        } );

        // get the jquery function stub.
        var jq = jqModule.init( {
            sinon: sandbox
        } );

        // create browser config. (need the sinon sandbox to do this)
        browserConfig = createBrowserConfig( win, jq );

        // this.config is the original passed in config.
        this.config = _.clone( config );

        return callProxyquire( moduleFilePath, config );
    },

    expect: chai.expect,

    assert: chai.assert,

    getDoc: function () {
        return winModule.getWindow().document;
    },

    isSpy: function ( method ) {
        if ( method ) {
            return method.called !== undefined && method.returns === undefined;
        }
    },

    isStub: function ( method ) {
        if ( method ) {
            return method.returns !== undefined;
        }
    },

    getStub: function ( name ) {
        var objects = [browserConfig.jquery2(), this.win.document, this.win];
        var found = _.find( objects, function ( obj ) {
            return obj[name] !== undefined;
        } );

        return found && found[name];
    },

    // should conform to sinon's api
    stub: function () {
        var args = Array.prototype.slice.call( arguments );
        return callSinonAPI( 'stub', args );
    },

    // should conform to sinon's api
    spy: function () {
        var args = Array.prototype.slice.call( arguments );
        return callSinonAPI( 'spy', args );
    }
};

module.exports = mod;