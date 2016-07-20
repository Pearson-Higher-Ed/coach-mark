import componentHandler from '@pearson-components/component-handler';

export default class CoachMark {

	constructor(element, opts, callback) {


		this.element = element;
		this.opts = opts;
		this.callback = callback;

		//Check options
		if(!this.opts)
			throw new Error('missing required parameter:' +
				' you must include an options object');

		if(!opts.text)
			throw new Error('missing required option: ' +
				'you must specify text for the coach mark');

		if (!opts.id) {
			throw new Error('missing required option: you must specify a unique id for the coach mark')
		}

		// check other args
		if (!element) {
			throw new Error('missing required option: element')
		}

		if (typeof opts.currentCM !== 'undefined') {
			if (typeof opts.totalCM === 'undefined') {
				throw new Error('you must include totalCM if currentCM is specified')
			}
		}

		if (opts.gotIt && opts.totalCM) {
			throw new Error('cannot display "Got it" along with numbered coach marks (totalCM)')
		}

		if (typeof opts.totalCM !== 'undefined') {
			if (typeof opts.currentCM === 'undefined') {
				throw new Error('you must include currentCM if totalCM is specified')
			}
		}

		if (typeof opts.disableShadow === 'string' || typeof opts.disableShadow === 'boolean') {
			opts.disableShadow = (opts.disableShadow.toString().toLowerCase() === 'true');
		}

		if (typeof opts.disablePointer === 'string' || typeof opts.disablePointer === 'boolean') {
			this.disablePointer = (opts.disablePointer.toString().toLowerCase() === 'true');
		}

		const placement = function placement() {
			let modifier = '';
			// get window geometry - this is how jQuery does it
			const body = document.body,
				html = document.documentElement,
				height = Math.max(
					body.scrollHeight,
					body.offsetHeight,
					html.clientHeight),
				rect = element.getBoundingClientRect(),
				// 50 is close enough. This is very browser-specific
				touch_bottom = rect.bottom - rect.height + 50 + window.pageYOffset > height/2,
				leftCenterLine = rect.left + rect.width/2 < window.innerWidth/2;

			// this will follow the 50% rule, but for now, just return bottom
			if (touch_bottom) {
				modifier = 'top';
			} else {
				modifier = 'bottom';
			}

			if(leftCenterLine) {
				modifier += '-left';
			}

			return modifier;
		}();

		element.scrollIntoView(false);

		if (!opts.disableShadow) {
			addClass(element, 'o-coach-mark__hole');
		}

		//Build html
		const container = document.createElement('div'),
			close = document.createElement('button'),
			closeSpan = document.createElement('span'),
			closeDiv = document.createElement('div'),
			screenReader = document.createElement('span'),
			titleBar = document.createElement('div'),
			titleText = document.createElement('div'),
			content = document.createElement('div'),
			contentContainer = document.createElement('div'),
			paragraph = document.createElement('p'),
			meatball = document.createElement('div'),
			gotIt = document.createElement('a'),
			internalText = ('textContent' in titleText) ? 'textContent' : 'innerText';

		// save these for use during callbacks
		opts.coachMark = container;
		opts.element = element;
		opts.callback = callback;

		titleText.className = 'o-coach-mark__title pe-label pe-label--bold';
		titleBar.appendChild(meatball);
		titleBar.appendChild(titleText);

		if (opts.title) titleText[internalText] = opts.title;

		container.className = 'o-coach-mark__container';
		container.style.visibility = 'hidden';
		container.style.display = 'block';
		container.style.position = 'absolute';
		content.style.margin = '0';
		content.className = 'o-coach-mark__content';
		if (!opts.disablePointer) {
			content.className += ' o-coach-mark--' + placement;
		}
		content.appendChild(titleBar);
		paragraph.className = 'pe-copy--small o-coach-mark__paragraph';
		paragraph[internalText] = opts.text;

		content.appendChild(paragraph);

		if (typeof opts.gotIt !== 'undefined') {
			const gotItDiv = document.createElement('div');
			gotItDiv.className = 'pe-copy--small';
			gotItDiv.appendChild(gotIt);
			gotIt[internalText] = 'Got it';
			gotIt.className = 'o-coach-mark__got-it';
			gotIt.setAttribute('href', '#');
			content.appendChild(gotItDiv);
		}

		if (typeof opts.currentCM !== 'undefined') {
			const backNextDiv = document.createElement('div'),
				back = document.createElement('a'),
				backSpan = document.createElement('span'),
				next = document.createElement('a'),
				nextSpan = document.createElement('span'),
				totalOfCoachMarksSpan = document.createElement('span');

			back.className = 'o-coach-mark__button-space';

			if (opts.currentCM > 1 && opts.totalCM > 1) {
				backSpan[internalText] = 'previous';
				back.setAttribute('href', '#');
				back.setAttribute('tabindex', '2');
				back.appendChild(backSpan);
			}

			//build next button
			next.className = 'o-coach-mark__next-button';
			next.setAttribute('href','#');
			next.setAttribute('tabindex', '1');
			next[internalText] = 'next';

			totalOfCoachMarksSpan.className = 'o-coach-mark__total-coachmarks pe-label pe-label--small';
			if (opts.currentCM && opts.totalCM) {
				if (opts.currentCM < opts.totalCM) {
					next.appendChild(nextSpan);
				}
				totalOfCoachMarksSpan[internalText] = opts.currentCM + ' of ' + opts.totalCM;
				if (opts.currentCM == opts.totalCM) {
					// change this to a close link
					next[internalText] = 'close';
				}
				// draw meatball
				meatball[internalText] = opts.currentCM;
				meatball.className = 'o-coach-mark__meatball';
				// lower title
				titleText.style.paddingTop = '24px';
			}
			backNextDiv.appendChild(next);

			if (opts.currentCM > 1 && opts.totalCM > 1) {
				backNextDiv.appendChild(back);
			} else {
				totalOfCoachMarksSpan.style.paddingLeft = '107px';
			}

			backNextDiv.appendChild(totalOfCoachMarksSpan);
			backNextDiv.className = 'o-coach-mark__back-next pe-copy--small';
			content.appendChild(backNextDiv);
			//IIFE to create event for back and next buttons based on the current and total
			((back, next, opts) => {
				back.onclick = (event) => {
					closeCoachMark(event);
					triggerEvent('previous', 'o-cm-previous-clicked');
					event.preventDefault();
				};
				next.onclick = (event) => {
					closeCoachMark(event);
					triggerEvent('next', 'o-cm-next-clicked');
					event.preventDefault();
				};
			})(back, next, opts);
		}
		content.style.position = 'relative';

		screenReader.className="o-coach-mark__sr-hidden";
		screenReader[internalText] = opts.srText || "close this coach mark";
		close.appendChild(screenReader);
		closeDiv.className = 'o-coach-mark__close-div';
		close.className = 'o-coach-mark__close-icon';
		close.setAttribute('tabindex', '3');
		closeSpan.className = 'pe-icon--times pe-color(gray-no-1) pe-label';
		closeSpan.setAttribute('aria-hidden', 'true');
		close.appendChild(closeSpan);
		closeDiv.appendChild(close);

		contentContainer.className = 'o-coach-mark__content-container';
		contentContainer.appendChild(content);
		contentContainer.appendChild(closeDiv);
		container.appendChild(contentContainer);

		function triggerEvent(elementClickedIS, eventIs, payload) {
			let event;
			if (document.createEvent) {
				event = document.createEvent('HTMLEvents');
				event.initEvent(eventIs, true, true);
			} else {
				event = document.createEventObject();
				event.eventType = eventIs;
			}

			event.eventName = eventIs;
			event.data = {
				type: elementClickedIS,
				id: opts.id,
				payload: payload
			};

			if (document.createEvent) {
				element.dispatchEvent(event);
			} else {
				element.fireEvent("on" + event.eventType, event);
			}
		}


		function resetPosition() {

			const featurePosition = {
					top: element.offsetTop,
					left: element.offsetLeft,
					bottom: element.offsetTop + element.offsetHeight,
					right: element.offsetLeft + element.offsetWidth},
				markHeight = content.offsetHeight + 30,
				horizontal_center = ((featurePosition.right - featurePosition.left) / 2 + featurePosition.left),
				vertical_center = ((featurePosition.bottom - featurePosition.top)/2 + featurePosition.top) + window.pageYOffset;
			var top, left;

			var bodyWidth = document.body.offsetWidth;

			if (bodyWidth > 480) {
				left = horizontal_center - 280;
			} else {
				const relativeOffset = container.getBoundingClientRect().left - container.offsetLeft;
				left = (bodyWidth - 320) / 2 - relativeOffset;
			}

			if (placement.indexOf('bottom') > -1) {
				top = featurePosition.bottom + 5;
			}

			if (placement.indexOf('top') > -1) {
				top = featurePosition.top - markHeight - 15 - container.offsetHeight;
			}

			if (typeof opts.offsetX !== 'undefined') {
				container.style.left = left + opts.offsetX + 'px';
			} else {
				container.style.left = left + 'px';
			}

			if (typeof opts.offsetY !== 'undefined') {
				container.style.top = top + opts.offsetY + 'px';
			} else {
				container.style.top = top + 'px';
			}

			let rect = contentContainer.getBoundingClientRect();
			if (rect.left < 0) {
				container.style.left = container.offsetLeft - rect.left + 'px';
			}

		}

		//Inject html - use classes to position
		element.parentNode.insertBefore(container, element.nextSibling);

		// temporarily show for measuring
		container.style.visibility = 'visible';

		resetPosition();

		window.addEventListener("resize", resetPosition);

		close.addEventListener('click', closeCoachMark);
		gotIt.addEventListener('click', closeCoachMark);

		function closeCoachMark(event) {
			opts.coachMark.parentElement.removeChild(opts.coachMark);
			removeClass(opts.element, 'o-coach-mark__hole');
			if (typeof callback !== 'undefined') {
				callback(opts.id, event);
			}
		}

		function hasClass(el, className) {
			if (el.classList)
				return el.classList.contains(className);
			else
				return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
		}

		function addClass(el, className) {
			if (el.classList)
				el.classList.add(className);
			else if (!hasClass(el, className)) el.className += " " + className
		}

		function removeClass(el, className) {
			if (el.classList)
				el.classList.remove(className);
			else if (hasClass(el, className)) {
				var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
				el.className = el.className.replace(reg, ' ');
			}
		}

		// removed for now, but leave code in case it comes back. Feedback does not make sense until you have used a feature.
		//if (opts.like) {
		//
		//	let likeDiv;
		//	let feedBack;
		//
		//	this.appendAnchor = (parent, upDown, text, like) => {
		//		const link = document.createElement('a');
		//		link.onclick = function(event) {
		//			triggerEvent(like, 'o-cm-like-clicked');
		//			likeDiv.style.display = 'none';
		//			feedBack.style.display = 'block';
		//			event.preventDefault();
		//		};
		//		link.innerHTML = text;
		//		link.className = 'o-coach-mark--link-text';
		//		link.setAttribute('href', '#');
		//		const likeImg = document.createElement('i');
		//		likeImg.className = 'o-coach-mark--icons fa fa-thumbs-o-' + upDown;
		//		likeImg.setAttribute('aria-hidden', 'true');
		//		link.insertBefore(likeImg, link.childNodes[0]);
		//		parent.appendChild(link);
		//	};
		//
		//	const hr = document.createElement('hr'),
		//		form = document.createElement('textarea'),
		//		buttonBar = document.createElement('div'),
		//		submit = document.createElement('button'),
		//		question = document.createElement('p'),
		//		instructions = document.createElement('p'),
		//		cancel = document.createElement('a');
		//
		//	hr.className = 'o-coach-mark--hr';
		//	content.appendChild(hr);
		//
		//	likeDiv = document.createElement('div');
		//	likeDiv.className = 'o-coach-mark__like-div';
		//	question.innerHTML = 'What do you think of this change?';
		//	likeDiv.appendChild(question);
		//	content.appendChild(likeDiv);
		//	this.appendAnchor(likeDiv, 'down', 'Not Great', 'dislike');
		//	this.appendAnchor(likeDiv, 'up', 'I Like It', 'like');
		//	feedBack = document.createElement('div');
		//	feedBack.className = 'o-coach-mark__feedback';
		//	instructions.innerHTML = 'Thanks! Care to tell us more?';
		//	feedBack.appendChild(instructions);
		//	submit.innerHTML = 'submit';
		//	submit.onclick = () => {
		//		triggerEvent('submit', 'o-cm-submit-clicked', form.value);
		//	};
		//	cancel.innerHTML = 'cancel';
		//	cancel.setAttribute('href', '#');
		//	cancel.onclick = () => {
		//		triggerEvent('cancel', 'o-cm-cancel-clicked');
		//		likeDiv.style.display = 'block';
		//		feedBack.style.display = 'none';
		//	};
		//	feedBack.appendChild(form);
		//	buttonBar.appendChild(submit);
		//	buttonBar.appendChild(cancel);
		//	feedBack.appendChild(buttonBar);
		//	content.appendChild(feedBack);
		//}
	}
}

componentHandler.register({
	constructor: CoachMark,
	classAsString: 'CoachMark',
	cssClass: 'o-coach-mark'
});
