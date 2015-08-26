/*global describe, it*/
'use strict';

var expect = require('expect.js');

var foo = require('./../src/js/foo');

describe('Foo', function() {

	it('should initialise', function() {
		expect(foo()).to.be('bar');
	});
});
