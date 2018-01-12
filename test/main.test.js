import React from 'react';
import CoachMark from '../main';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';


// These tests are kind of "hacky"  I'm mocking out a lot of things that should be able to "rewired" but isn't doing it
// properly.  So i took a different approach at it.  They work, but i do not suggest testing anything insde of the constructor
describe('CoachMark', () => {

	let config = {
		elementId: 'testId',
	    opts: {
	      title: 'Coach Mark Above Feature',
	      text: 'Some text explaining to the user why you changed their interface',
	      currentCM: '1',
	      totalCM: '2'
	    },
	    callback: function() {

	    }
	};
	let coachMark;

	describe('config errors', function() {
		beforeEach(function() {
			let body = document.body;
			let div = document.createElement('div');
			div.id = 'testId';
			body.appendChild(div);
		});

		// just cleaning up
		afterEach(function() {
			let body = document.body;
			let div = document.getElementById('testId');
			div.parentElement.removeChild(div);
		});

		it('should throw an error if id does not exist', function() {
			let config = {
				elementId: 'testId',
			    opts: {
			      title: 'Coach Mark Above Feature',
			      text: 'Some text explaining to the user why you changed their interface',
			      currentCM: '1',
			      totalCM: '2'
			    },
			    callback: function() {

			    }
			}
			expect(() => { new CoachMark(config); }).toThrow();

		});

		it('should throw an error if currentCm exists and totalCM does not exist', function() {
			let config = {
				elementId: 'testId',
			    opts: {
			      id: 1,
			      title: 'Coach Mark Above Feature',
			      text: 'Some text explaining to the user why you changed their interface',
			      currentCM: '1'
			    },
			    callback: function() {

			    }
			}
			expect(() => { new CoachMark(config); }).toThrow();

		});

		it('should throw an error if gotIt exists and totalCM both exist', function() {
			let config = {
				elementId: 'testId',
			    opts: {
			      id: 1,
			      title: 'Coach Mark Above Feature',
			      text: 'Some text explaining to the user why you changed their interface',
			      totalCM: '1',
			      gotIt: 'got it'
			    },
			    callback: function() {

			    }
			}
			expect(() => { new CoachMark(config); }).toThrow();

		});
	});

	describe('resize event setup', function() {
		beforeEach(function() {
			let body = document.body;
			let div = document.createElement('div');
			div.id = 'testId';
			body.appendChild(div);
			config.opts.id = '1';
			coachMark = new CoachMark(config);
		});

		// just cleaning up
		afterEach(function() {
			coachMark.removeCoachMark();
			let body = document.body;
			let div = document.getElementById('testId');
			div.parentElement.removeChild(div);
		});

		it('should fire resetPositionFunction', function() {
			let resetPostionCalled = false;
			coachMark.resetPosition = function() {
				resetPostionCalled = true;
			}
			window.dispatchEvent(new Event('resize'));
			expect(resetPostionCalled).toBe(true);
		});
	});

	describe('removeCoachMark', function() {
		beforeEach(function() {
			let body = document.body;
			let div = document.createElement('div');
			div.id = 'testId';
			body.appendChild(div);
			config.opts.id = '2';
			coachMark = new CoachMark(config);
		});

		afterEach(function() {
			let body = document.body;
			let div = document.getElementById('testId');
			div.parentElement.removeChild(div);
		});

		//no need to clean up because the test is making sure it cleans up...

		it('should not call resetPosition and also remove class to the target', function() {
			let resetPostionCalled = false;
			let callbackCalled = false;
			coachMark.resetPosition = function() {
				resetPostionCalled = true;
			};
			config.callback = function() {
				callbackCalled = true;
			};
			coachMark.removeCoachMark();

			let div = document.getElementById('testId');
			expect(resetPostionCalled).toBe(false);
			expect(callbackCalled).toBe(true);
			expect(div.classList.length).toBe(0);
			expect(document.getElementById('2')).toBe(null);
		});

	});

	// describe('resetPosition', function() {
	// 	beforeEach(function() {
	// 		let body = document.body;
	// 		let div = document.createElement('div');
	// 		div.id = 'testId';
	// 		body.appendChild(div);
	// 		config.opts.id = '3';
	// 	});
	//
	// 	afterEach(function() {
	// 		let body = document.body;
	// 		let div = document.getElementById('testId');
	// 		div.parentElement.removeChild(div);
	// 	});
	// 	// IMPORTANT: This is a brittle test because of the way coach mark is designed.  Any change to the logic
	// 	// may could break this test
	// 	it('should place the coachmark depending on body viewport', function() {
	// 		// we are going to place the target element at a specific location and the creation of the coachmark
	// 		// should always be at the same place that proves that no change in the logic changed the placement
	// 		let div = document.getElementById('testId');
	// 		div.style.position = 'absolute';
	// 		div.style.left = '-20px';
	// 		div.style.top = '30px';
	// 		// setting body offsetWidth to be mobile size
	// 		document.body.style.width = '200px';
	// 		coachMark = new CoachMark(config);
	//
	// 		let container = document.getElementById('3');
	//
	// 		expect(container.style.left).toBe('-50px');
	// 		expect(container.style.top).toBe('35px');
	//
	// 		// resize so that the window and body is greater than mobile
	// 		document.body.style.width = '1000px';
	// 		window.dispatchEvent(new Event('resize'));
	// 		expect(container.style.left).toBe('-80px');
	//
	// 		coachMark.removeCoachMark();
	// 	});
	//
	// });

// 	describe('getPlacement', function() {
//
// 		beforeEach(function() {
// 			let body = document.body;
// 			let div = document.createElement('div');
// 			div.id = 'testId';
// 			body.appendChild(div);
// 		});
//
// 		afterEach(function() {
// 			let body = document.body;
// 			let div = document.getElementById('testId');
// 			div.parentElement.removeChild(div);
// 		});
//
// 		it('should return o-coach-mark--top', function() {
// 			let div = document.getElementById('testId');
// 			div.style.position = 'absolute';
// 			div.style.top = '500px';
// 			div.style.left = '500px';
// 			div.style.width = '500px';
// 			div.style.height = '500px';
// 			coachMark = new CoachMark(config);
// 			expect(coachMark.getPlacement()).toBe('o-coach-mark--top');
// 			coachMark.removeCoachMark();
//
// 		});
//
// 		it('should return o-coach-mark--bottom', function() {
// 			let div = document.getElementById('testId');
// 			div.style.position = 'absolute';
// 			div.style.left = '500px';
// 			div.style.width = '500px';
// 			coachMark = new CoachMark(config);
// 			expect(coachMark.getPlacement()).toBe('o-coach-mark--bottom');
// 			coachMark.removeCoachMark();
//
// 		});
//
// 		it('should return left of the centerLine', function() {
// 			let div = document.getElementById('testId');
// 			div.style.position = 'absolute';
// 			coachMark = new CoachMark(config);
// 			expect(coachMark.getPlacement()).toBe('o-coach-mark--bottom-left');
// 			coachMark.removeCoachMark();
// 		});
// 	});
//
});
