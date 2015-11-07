/**
    Polyfills for REI.com
    Below are the polyfill implementations for unsupported ECMA Script
    specs for various browsers.

    The hope is that we end up deleting these polyfills as browsers that need
    them are no longer supported by REI.com.
*/
'use strict';

module.exports.init = function init () {
    var FUNCTION = 'function';

    function isFunction ( obj ) {
        return FUNCTION === typeof obj;
    }

    // via MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
    if ( !isFunction( Array.prototype.indexOf ) ) {
        Array.prototype.indexOf = function ( searchElement, fromIndex ) {
            if ( this === undefined || this === null ) {
                throw new TypeError( '"this" is null or not defined' );
            }

            var length = this.length >>> 0; // Hack to convert object.length to a UInt32

            fromIndex = +fromIndex || 0;

            if ( Math.abs( fromIndex ) === Infinity ) {
                fromIndex = 0;
            }

            if ( fromIndex < 0 ) {
                fromIndex += length;
                if ( fromIndex < 0 ) {
                    fromIndex = 0;
                }
            }

            for ( ; fromIndex < length; ++fromIndex ) {
                if ( this[ fromIndex ] === searchElement ) {
                    return fromIndex;
                }
            }

            return -1;
        };
    }

    // via MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Polyfill
    if ( !isFunction( Array.prototype.reduce ) ) {
        Array.prototype.reduce = function(callback, optionalInitialValue) {
            if ( null === this || 'undefined' === typeof this ) {
                // At the moment all modern browsers, that support strict mode, have
                // native implementation of Array.prototype.reduce. For instance, IE8
                // does not support strict mode, so this check is actually useless.
                throw new TypeError(
                    'Array.prototype.reduce called on null or undefined');
            }
            if ( !isFunction( callback ) ) {
                throw new TypeError(callback + ' is not a function');
            }
            var index, value;
            var length = this.length >>> 0;
            var isValueSet = false;
            if ( 1 < arguments.length ) {
                value = optionalInitialValue;
                isValueSet = true;
            }
            for ( index = 0; length > index; ++index ) {
                if ( this.hasOwnProperty( index ) ) {
                    if ( isValueSet ) {
                        value = callback( value, this[ index ], index, this );
                    } else {
                        value = this[ index ];
                        isValueSet = true;
                    }
                }
            }
            if ( !isValueSet ) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            return value;
        };
    }

    // via MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Compatibility
    if ( !isFunction( String.prototype.trim ) ) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    // via MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
    if ( !isFunction( Object.create ) ) {
        Object.create = (function () {
            var Object = function () {};

            return function  ( prototype ) {
                if ( arguments.length > 1 ) {
                    throw Error( 'Second argument not supported' );
                }
                if ( typeof prototype !== 'object' ) {
                    throw new TypeError( 'Argument must be an object' );
                }
                Object.prototype = prototype;
                var result = new Object();
                Object.prototype = null;
                return result;
            };
        })();
    }

    // via MDN https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
    if ( !isFunction( Function.prototype.bind ) ) {
        Function.prototype.bind = function( oThis ) {
            if ( typeof this !== 'function' ) {

                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            var aArgs   = Array.prototype.slice.call( arguments, 1 );
            var fToBind = this;
            var FNOP    = function() {};
            var fBound  = function() {
                return fToBind.apply(
                    this instanceof FNOP && oThis ? this : oThis,
                    aArgs.concat( Array.prototype.slice.call( arguments ) )
                );
            };

            FNOP.prototype = this.prototype;
            fBound.prototype = new FNOP();

            return fBound;
        };
    }

    /*
     * classList.js: Cross-browser full element.classList implementation.
     * 2014-07-23
     *
     * By Eli Grey, http://eligrey.com
     * Public Domain.
     * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
     */

    /*global self, document, DOMException */

    /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

    // self reference is undefined in Node
    if (typeof self !== 'undefined' && 'document' in self) {

    // Full polyfill for browsers with no classList support
    if (!("classList" in document.createElement("_"))) {

    (function (view) {

    "use strict";

    if (!('Element' in view)) return;

    var
    	  classListProp = "classList"
    	, protoProp = "prototype"
    	, elemCtrProto = view.Element[protoProp]
    	, objCtr = Object
    	, strTrim = String[protoProp].trim || function () {
    		return this.replace(/^\s+|\s+$/g, "");
    	}
    	, arrIndexOf = Array[protoProp].indexOf || function (item) {
    		var
    			  i = 0
    			, len = this.length
    		;
    		for (; i < len; i++) {
    			if (i in this && this[i] === item) {
    				return i;
    			}
    		}
    		return -1;
    	}
    	// Vendors: please allow content code to instantiate DOMExceptions
    	, DOMEx = function (type, message) {
    		this.name = type;
    		this.code = DOMException[type];
    		this.message = message;
    	}
    	, checkTokenAndGetIndex = function (classList, token) {
    		if (token === "") {
    			throw new DOMEx(
    				  "SYNTAX_ERR"
    				, "An invalid or illegal string was specified"
    			);
    		}
    		if (/\s/.test(token)) {
    			throw new DOMEx(
    				  "INVALID_CHARACTER_ERR"
    				, "String contains an invalid character"
    			);
    		}
    		return arrIndexOf.call(classList, token);
    	}
    	, ClassList = function (elem) {
    		var
    			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
    			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
    			, i = 0
    			, len = classes.length
    		;
    		for (; i < len; i++) {
    			this.push(classes[i]);
    		}
    		this._updateClassName = function () {
    			elem.setAttribute("class", this.toString());
    		};
    	}
    	, classListProto = ClassList[protoProp] = []
    	, classListGetter = function () {
    		return new ClassList(this);
    	}
    ;
    // Most DOMException implementations don't allow calling DOMException's toString()
    // on non-DOMExceptions. Error's toString() is sufficient here.
    DOMEx[protoProp] = Error[protoProp];
    classListProto.item = function (i) {
    	return this[i] || null;
    };
    classListProto.contains = function (token) {
    	token += "";
    	return checkTokenAndGetIndex(this, token) !== -1;
    };
    classListProto.add = function () {
    	var
    		  tokens = arguments
    		, i = 0
    		, l = tokens.length
    		, token
    		, updated = false
    	;
    	do {
    		token = tokens[i] + "";
    		if (checkTokenAndGetIndex(this, token) === -1) {
    			this.push(token);
    			updated = true;
    		}
    	}
    	while (++i < l);

    	if (updated) {
    		this._updateClassName();
    	}
    };
    classListProto.remove = function () {
    	var
    		  tokens = arguments
    		, i = 0
    		, l = tokens.length
    		, token
    		, updated = false
    		, index
    	;
    	do {
    		token = tokens[i] + "";
    		index = checkTokenAndGetIndex(this, token);
    		while (index !== -1) {
    			this.splice(index, 1);
    			updated = true;
    			index = checkTokenAndGetIndex(this, token);
    		}
    	}
    	while (++i < l);

    	if (updated) {
    		this._updateClassName();
    	}
    };
    classListProto.toggle = function (token, force) {
    	token += "";

    	var
    		  result = this.contains(token)
    		, method = result ?
    			force !== true && "remove"
    		:
    			force !== false && "add"
    	;

    	if (method) {
    		this[method](token);
    	}

    	if (force === true || force === false) {
    		return force;
    	} else {
    		return !result;
    	}
    };
    classListProto.toString = function () {
    	return this.join(" ");
    };

    if (objCtr.defineProperty) {
    	var classListPropDesc = {
    		  get: classListGetter
    		, enumerable: true
    		, configurable: true
    	};
    	try {
    		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    	} catch (ex) { // IE 8 doesn't support enumerable:true
    		if (ex.number === -0x7FF5EC54) {
    			classListPropDesc.enumerable = false;
    			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    		}
    	}
    } else if (objCtr[protoProp].__defineGetter__) {
    	elemCtrProto.__defineGetter__(classListProp, classListGetter);
    }

    }(self));

    } else {
    // There is full or partial native classList support, so just check if we need
    // to normalize the add/remove and toggle APIs.

    (function () {
    	"use strict";

    	var testElement = document.createElement("_");

    	testElement.classList.add("c1", "c2");

    	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
    	// classList.remove exist but support only one argument at a time.
    	if (!testElement.classList.contains("c2")) {
    		var createMethod = function(method) {
    			var original = window.DOMTokenList.prototype[method];

    			window.DOMTokenList.prototype[method] = function(token) {
    				var i, len = arguments.length;

    				for (i = 0; i < len; i++) {
    					token = arguments[i];
    					original.call(this, token);
    				}
    			};
    		};
    		createMethod('add');
    		createMethod('remove');
    	}

    	testElement.classList.toggle("c3", false);

    	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    	// support the second argument.
    	if (testElement.classList.contains("c3")) {
    		var _toggle = DOMTokenList.prototype.toggle;

    		window.DOMTokenList.prototype.toggle = function(token, force) {
    			if (1 in arguments && !this.contains(token) === !force) {
    				return force;
    			} else {
    				return _toggle.call(this, token);
    			}
    		};

    	}

    	testElement = null;
    }());

    }

    }
};
