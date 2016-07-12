/*global describe, it, beforeEach, afterEach*/

import expect from 'expect.js';
import CoachMark from './../src/js/CoachMark';

describe('CoachMark', () => {
	let element = null;
	let footer = null;
	let mark = null;

	beforeEach(() => {
		element = document.createElement('div');
		element.innerText = '1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
		element.style.top = '200px';
		element.style.position = 'absolute';
		element.style.width = '60%';
		element.style.margin = 'auto';
		footer = document.createElement('div');
		footer.innerText = '2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
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
		if (document.querySelector('div')) {
			const ct = document.querySelector('div');
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
					title: 'bar',
					id: 'sjsdflkjsdlkfj'
				}, function () {
					console.log('test');
				})
			}).to.throwError();
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

	// this feature has been commented out of the code, since we might add this back later
	//it('should call the callback when liked', () => {
	//	let called = false;
	//	let matched = false;
	//	let data = {type: "like",
	//		id: "sjsdflkjsdlkfj",
	//		payload: undefined
	//	};
    //
	//	document.addEventListener('o-cm-like-clicked', (event) => {
	//		called = true;
	//		matched = JSON.stringify(data) === JSON.stringify(event.data);
	//	});
    //
	//	mark = new CoachMark(element, {
	//		like: true,
	//		placement: 'right',
	//		title: 'foo',
	//		text: 'bar',
	//		id: 'sjsdflkjsdlkfj'
	//	}, function() {});
	//	const anchor = document.querySelectorAll('.o-coach-mark__content div a')[1];
	//	clickOnDiv(anchor);
	//	expect(called).to.be(true);
	//	expect(matched).to.be(true);
	//});

	it('should call the event when next button is clicked', (done) => {
		let fired = false;
		mark = new CoachMark(element, {
			placement: 'right',
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj',
			currentCM: 1,
			totalCM: 2
		});

		const button = document.querySelector('a.o-coach-mark__next-button');
		button.addEventListener('click', () => {
			fired = true;
		});
		clickOnDiv(button);
		expect(fired).to.be(true);
		done();
	});

	it('should call the event when back button is clicked', () => {
		let fired = false;
		mark = new CoachMark(element, {
			placement: 'bottom',
			title: 'foo',
			text: 'bar',
			currentCM: 2,
			totalCM: 3,
			id: 'sjsdflkjsdlkfj'
		});

		const button = document.querySelector('.o-coach-mark__container a.o-coach-mark__button-space');
		button.addEventListener('click', () => {
			fired = true;
		});
		const ev = document.createEvent("MouseEvent");
		ev.initMouseEvent('click', true, true, window);
		button.dispatchEvent(ev);
		expect(fired).to.be(true);
	});


	it('should check for the total navigable coachmarks on back button ', () => {
		mark = new CoachMark(element, {
			placement: 'left',
			title: 'foo',
			text: 'bar',
			currentCM: '2',
			totalCM: '2',
			id: 'sjsdflkjsdlkfj'
		});

		const total = document.querySelector('span.o-coach-mark__total-coachmarks');

		expect(total.innerText).to.be('2 of 2');
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

		expect(total.innerText).to.be('1 of 2');
	});

});


describe('CoachMark', () => {
	let header = null,
		footer = null,
		left = null,
		right = null,
		mark = null,
		leftRights = [];

	beforeEach(() => {
		header = document.createElement('div');
		header.innerText = 'header Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
		document.body.appendChild(header);

		(count) => {

			// make sure we are touching the bottom of the viewport by adding a ton of stuff
			while (--count > 0) {
				left = document.createElement('div');
				left.innerText = 'left ' + count + ' Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
				left.style.width = '50%';
				left.style.float = 'left';
				leftRights.push(left);
				document.body.appendChild(left);

				right = document.createElement('div');
				right.innerText = 'right Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
				right.style.width = '50%';
				right.style.float = 'right';
				leftRights.push(right);
				document.body.appendChild(right);
			}
		} (100);

		footer = document.createElement('div');
		footer.innerText = 'footer Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
		footer.style.clear = 'both';

		document.body.appendChild(footer);
	});

	afterEach(() => {
		document.body.removeChild(header);
		document.body.removeChild(footer);
		leftRights.forEach((item) => {
			document.body.removeChild(item);
		});
		leftRights = [];
		if(document.querySelector('.o-coach-mark__container')) {
			const ct = document.querySelector('.o-coach-mark__container');
			ct.parentNode.removeChild(ct);
		}
	});

	//it('should attach to the bottom of the header', () => {
	//	mark = new CoachMark(header , {
	//		title: 'foo',
	//		text: 'bar',
	//		id: 'sjsdflkjsdlkfj'
	//	}, function () {
	//		console.log('test');
	//	});
	//	const cm = document.querySelector('.o-coach-mark__container');
	//	expect(cm).to.not.be.null;
	//	const cmTop = cm.getBoundingClientRect().top;
	//	expect(cmTop).to.be(header.getBoundingClientRect().bottom);
	//});

	it('should attach to the top of the footer', () => {
		mark = new CoachMark(footer , {
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function () {
			console.log('test');
		});
		const cm = document.querySelector('.o-coach-mark__container');
		expect(cm).to.not.be.null;
		const cmBottom = cm.getBoundingClientRect().bottom;
		expect(Math.abs(cmBottom - footer.getBoundingClientRect().top) < 20).to.be.true;
	});

	it('should attach to the right of an element touching the left side of viewport', () => {

		mark = new CoachMark(left, {
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function () {
			console.log('test');
		});
		const cm = document.querySelector('.o-coach-mark__container');
		expect(cm).to.not.be.null;
		const cmLeft = cm.getBoundingClientRect().left;
		expect(Math.abs(cmLeft - left.getBoundingClientRect().left) < 20).to.be.true;
	});

	it('should attach to the left of an element touching the right side of viewport', () => {

		mark = new CoachMark(right, {
			title: 'foo',
			text: 'bar',
			id: 'sjsdflkjsdlkfj'
		}, function () {
			console.log('test');
		});
		const cm = document.querySelector('.o-coach-mark__container');
		expect(cm).to.not.be.null;
		const cmRight = cm.getBoundingClientRect().right;
		expect(Math.abs(cmRight - right.getBoundingClientRect().left) < 20).to.be.true;
	});

});
