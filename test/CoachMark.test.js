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
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window);
		button.dispatchEvent(ev);
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
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window);
		anchor.dispatchEvent(ev);
		expect(called).to.be(true);
		expect(matched).to.be(true);
	});


	it('should call the callback when disliked', () => {
		let called = false;
		let matched = false;
		let data = {type: "dislike",
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
		const anchor = document.querySelectorAll('.o-coach-mark__content div a')[0];
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window);
		anchor.dispatchEvent(ev);
		expect(called).to.be(true);
		expect(matched).to.be(true);
	});

	it('should call the callback when feedback clicked', () => {
		let called = false;
		let matched = false;
		let data = {type: "submit",
			id: "sjsdflkjsdlkfj",
			payload: 'my comment here'
		};

		document.addEventListener('o-cm-submit-clicked', (event) => {
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
		const textarea = document.querySelector('textarea');
		textarea.innerHTML = 'my comment here';

		const button = document.querySelectorAll('button')[1];
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window);
		button.dispatchEvent(ev);
		expect(called).to.be(true);
		expect(matched).to.be(true);
	});


	it('should call the callback when cancel clicked', () => {
		let called = false;
		let matched = false;
		let data = {type: "cancel",
			id: "sjsdflkjsdlkfj",
			payload: undefined
		};

		document.addEventListener('o-cm-cancel-clicked', (event) => {
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

		const anchor = document.querySelectorAll('a')[2];
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window);
		anchor.dispatchEvent(ev);
		expect(called).to.be(true);
		expect(matched).to.be(true);
	});


	it('should show like/dislike when cancel clicked', () => {
		mark = new CoachMark(element, {
			like: true,
			placement: 'right',
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function() {});

		const anchor = document.querySelectorAll('a')[2];
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent("click", true, true, window);
		anchor.dispatchEvent(ev);

		const likeDiv = document.querySelector(".o-coach-mark__like-div");
		expect(likeDiv.style.display).to.be("block");
		const feedbackDiv = document.querySelector(".o-coach-mark__feedback");
		expect(feedbackDiv.style.display).to.be("none");
	});

});
