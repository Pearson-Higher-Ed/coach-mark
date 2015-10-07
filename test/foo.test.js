/*global describe, it*/

import expect from 'expect.js';
import Foo from './../src/js/Foo';

describe('Foo', () => {

	it('should initialize', () => {
		expect(new Foo().bar()).to.be('bar');
	});

});
