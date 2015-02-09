/*global describe, it*/
'use strict';

var expect = require('expect.js');

var Foo = require('./../src/js/foo');

describe('Foo', function() {

	it('should initialise', function() {
		expect(Foo()).to.be('bar');
	});
});
