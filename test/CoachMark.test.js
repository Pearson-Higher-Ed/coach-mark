/*global describe, it, beforeEach, afterEach*/

import expect from 'expect.js';
import CoachMark from './../src/js/CoachMark';

describe('CoachMark', () => {
	let element = null;
	let footer = null;
	let mark = null;

	beforeEach(() => {
		element = document.createElement('div');
		element.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
		element.style.top = '200px';
		element.style.position = 'absolute';
		element.style.width = '60%';
		element.style.margin = 'auto';
		footer = document.createElement('div');
		footer.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
		footer.style.top = '600px';
		footer.style.width = '60%';
		footer.style.position = 'absolute';
		document.body.appendChild(element);
		document.body.appendChild(footer);
	});

	afterEach(() => {
		document.body.removeChild(element);
		document.body.removeChild(footer);
		if(document.querySelector('.o-coach-mark__container')) {
			const ct = document.querySelector('.o-coach-mark__container');
			ct.parentNode.removeChild(ct);
		}
	});

	function clickOnDiv(element) {
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window);
		element.dispatchEvent(ev);
	}

	it('should initialize', () => {
		mark = new CoachMark(element, {
			placement: 'top',
			title: 'bar',
			text: 'baz',
			id: 'sjsdflkjsdlkfj'
		}, function () {
			console.log('test');
		});
		expect(mark).to.be.an('object');
	});

	it('should throw an Error if no parent element', () => {
		expect(function () {
			new CoachMark(null , {
					placement: 'top',
					title: 'foo',
					text: 'bar',
					id: 'sjsdflkjsdlkfj'
				}, function () {
					console.log('test');
				})}).to.throwError();
	});

	it('should throw an Error if there is no text', () => {
		expect(function () {
			new CoachMark(element , {
					placement: 'top',
					title: 'bar',
					id: 'sjsdflkjsdlkfj'
				}, function () {
					console.log('test');
				})
			}).to.throwError();
	});

	it('should default to bottom if there is no placement', () => {
		mark = new CoachMark(element, {
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function () {
		});
		expect(mark.opts.placement).to.be('bottom');
	});

	it('should correctly calculate placement if placed above the feature', () => {
		mark = new CoachMark(element, {
			placement: 'top',
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function () {});
		const pos = document.querySelector('.o-coach-mark__container')
			.getBoundingClientRect();
		expect(pos.top<200).to.be(true);
	});

	it('should correctly calculate placement if placed below the feature', () => {
		mark = new CoachMark(element, {
			placement: 'bottom',
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function () {});
		const pos = document.querySelector('.o-coach-mark__container')
			.getBoundingClientRect();
		expect(pos.top<50).to.be(true);
	});

	it('should correctly calculate placement if placed left of the feature', () => {
		mark = new CoachMark(element, {
			placement: 'left',
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function () {});
		const pos = document.querySelector('.o-coach-mark__container')
			.getBoundingClientRect();
		expect(pos.left<100).to.be(true);
	});

	it('should correctly calculate placement if placed right of the feature', () => {
		mark = new CoachMark(element, {
			placement: 'right',
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function () {});
		const pos = document.querySelector('.o-coach-mark__container')
			.getBoundingClientRect();
		expect(pos.left>200).to.be(true);
	});

	it('should call the callback when dismissed', () => {
		let called = false;
		mark = new CoachMark(element, {
			placement: 'right',
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function() { called = true; });
		const button = document.querySelector('.o-coach-mark__container button');
		clickOnDiv(button);
		expect(called).to.be(true);
	});

	it('should call the callback when liked', () => {
		let called = false;
		let matched = false;
		let data = {type: "like",
			id: "sjsdflkjsdlkfj",
			payload: undefined
		};

		document.addEventListener('o-cm-like-clicked', (event) => {
			called = true;
			matched = JSON.stringify(data) === JSON.stringify(event.data);
		});

		mark = new CoachMark(element, {
			like: true,
			placement: 'right',
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function() {});
		const anchor = document.querySelectorAll('.o-coach-mark__content div a')[1];
		clickOnDiv(anchor);
		expect(called).to.be(true);
		expect(matched).to.be(true);
	});

	it('should call the event when next button is clicked', () => {
		let fired = false;
		mark = new CoachMark(element, {
			placement: 'right',
			title: 'foo',
			text: 'bar',
			hasNext: true,
			id: 'sjsdflkjsdlkfj'
		});

		const button = document.querySelector('.o-coach-mark__container button.o-coach-mark__next-button');
		button.addEventListener('click', () => {
			fired = true;
		});
		clickOnDiv(button);
		expect(fired).to.be(true);
	});

	it('should call the event when back button is clicked', () => {
		let fired = false;
		mark = new CoachMark(element, {
			placement: 'bottom',
			title: 'foo',
			text: 'bar',
			hasBack: true,
			id: 'sjsdflkjsdlkfj'
		});

		const button = document.querySelector('.o-coach-mark__container button.o-coach-mark__button-space');
		button.addEventListener('click', () => {
			fired = true;
		});
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent('click', true, true, window);
		button.dispatchEvent(ev);
		expect(fired).to.be(true);
	});

	it('should call the events when back button and next button are clicked', () => {
		let firedBackButton = false;
		let firedNextButton = false;
		mark = new CoachMark(element, {
			placement: 'bottom',
			title: 'foo',
			text: 'bar',
			hasBack: true,
			hasNext: true,
			id: 'sjsdflkjsdlkfj'
		});

		const backButton = document.querySelector('.o-coach-mark__container button.o-coach-mark__button-space');
		backButton.addEventListener('click', () => {
			firedBackButton = true;
		});
		const eventIs = document.createEvent("MouseEvent");
		eventIs.initMouseEvent('click', true, true, window);
		backButton.dispatchEvent(eventIs);
		const nextButton = document.querySelector('.o-coach-mark__container button.o-coach-mark__next-button');
		nextButton.addEventListener('click', () => {
			firedNextButton = true;
		});
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent('click', true, true, window);
		nextButton.dispatchEvent(ev);
		expect(firedNextButton).to.be(true);
		expect(firedBackButton).to.be(true);
	});

	it('should check for the total navigable coachmarks on back button ', () => {
		mark = new CoachMark(element, {
			placement: 'left',
			title: 'foo',
			text: 'bar',
			hasBack: true,
			currentCM: '2',
			totalCM: '2',
			id: 'sjsdflkjsdlkfj'
		});

		const total = document.querySelector('span.o-coach-mark__total-coachmarks');

		expect(total.innerText).to.be('2/2');
	});

	it('should check for the total navigable coachmarks on next button ', () => {
		mark = new CoachMark(element, {
			placement: 'right',
			title: 'foo',
			text: 'bar',
			hasNext: true,
			currentCM: '1',
			totalCM: '2',
			id: 'sjsdflkjsdlkfj'
		});

		const total = document.querySelector('span.o-coach-mark__total-coachmarks');

		expect(total.innerText).to.be('1/2');
	});

});
