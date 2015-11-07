'use strict';

// dependencies
var testShim = require( '../js/main' );

// module under test
var moduleUnderTest;

// assertion lib
var expect = testShim.expect;

describe( 'Test1', function () {

    beforeEach( function () {
        moduleUnderTest = testShim.init( '../test/fixtures/main_test', {
            './main_test2': {}
        } );
    } );

    afterEach( function () {
        testShim.restore();
    } );

    it( 'should initialize required modules', function () {
        moduleUnderTest = testShim.init( '../test/fixtures/main_test', {
            './main_test2': {
                init: function () {
                    return 'init';
                }
            }
        } );
        expect( moduleUnderTest.func2() ).to.equal( 'init' );
    } );

    it( 'DOM methods should be pre-stubbed/spied (sinon)', function () {
        var doc = testShim.getDoc();
        expect( testShim.isStub( doc.getElementById ) ).to.equal( true );
    } );

    it( 'should return an empty spy', function () {
        var spy = testShim.spy();
        expect( testShim.isSpy( spy ) ).to.equal( true );
    } );

    it( 'should return an empty stub', function () {
        var stub = testShim.stub();
        expect( testShim.isStub( stub ) ).to.equal( true );
    } );

    it( 'should return dom/jquery stubs on demand', function () {
        moduleUnderTest.func1();
        var testStub = testShim.getStub( 'getElementById' );
        expect( testStub ).to.be.a( 'function' );
        expect( testStub.called ).to.equal( true );
    } );

    it( 'should allow modification of DOM stubs/spys', function () {
        var testStub = testShim.getStub( 'getElementById' );
        testStub.returns( 1 );
        expect( moduleUnderTest.func1() ).to.equal( 1 );
    } );

    it( 'should allow modification of jquery stubs/spys', function () {
        var testStub = testShim.getStub( 'css' );
        testStub.returns( 1 );
        expect( testShim.isStub( testStub ) ).to.equal( true );
        expect( moduleUnderTest.func3() ).to.equal( 1 );
    } );

    it( 'should initialize with chai assertion library by default', function () {
        expect( testShim.expect ).to.be.a( 'function' );
        expect( testShim.assert ).to.be.a( 'function' );
    } );

    it( 'should reset dom stubs on init.', function () {

        moduleUnderTest.func1();
        var testStub = testShim.getStub( 'getElementById' );
        expect( testStub.called ).to.equal( true );

        moduleUnderTest = testShim.init( '../test/fixtures/main_test', {
            './main_test2': {}
        } );

        testStub = testShim.getStub( 'getElementById' );
        expect( testStub.called ).to.equal( false );
    } );
} );