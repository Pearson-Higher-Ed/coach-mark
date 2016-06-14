import componentHandler from '@pearson-components/component-handler';

export default class CoachMark {

	constructor(element, opts, callback) {


		this.element = element;
		this.opts = opts;
		this.callback = callback;
		//Check options
		if(!opts)
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

		if (typeof opts.totalCM !== 'undefined') {
			if (typeof opts.currentCM === 'undefined') {
				throw new Error('you must include currentCM if totalCM is specified')
			}
		}
		const placement = function placement() {
			// get window geometry - this is how jQuery does it
			const body = document.body,
				html = document.documentElement,
				height = Math.max(
					body.scrollHeight,
					body.offsetHeight,
					html.clientHeight),
				rect = element.getBoundingClientRect(),
				// 50 is close enough. This is very browser-specific
				touch_top = rect.top < 50,
				touch_left = rect.left < 50,
				touch_right = window.innerWidth - rect.right < 50,
				touch_bottom = rect.bottom + 50 + window.pageYOffset > height;

			if (touch_top) return 'bottom';
			if (touch_bottom) return 'top';
			if (touch_left && touch_right) return 'bottom';
			if (touch_right) return 'left';
			if (touch_left) return 'right';
			return 'bottom';
		}();

		element.scrollIntoView(false);

		addClass(element, 'o-coach-mark__hole');

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
		content.className += ' o-coach-mark--' + placement;
		content.appendChild(titleBar);
		paragraph.className = 'pe-copy--small o-coach-mark__paragraph';
		paragraph[internalText] = opts.text;

		content.appendChild(paragraph);
		if (typeof opts.currentCM !== 'undefined') {
			const backNextDiv = document.createElement('div'),
				back = document.createElement('a'),
				backSpan = document.createElement('span'),
				next = document.createElement('a'),
				nextSpan = document.createElement('span'),
				totalOfCoachMarksSpan = document.createElement('span');

			back.className = 'o-coach-mark__button-space';

			backSpan[internalText] = 'previous';
			if (opts.currentCM > 1 && opts.totalCM > 1) {
				back.appendChild(backSpan);
			}

			//build next button
			next.className = 'o-coach-mark__next-button';

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

			backNextDiv.appendChild(back);
			backNextDiv.appendChild(totalOfCoachMarksSpan);
			backNextDiv.appendChild(next);
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
		closeSpan.className = 'pe-icon--times pe-color(gray-no-1) pe-label';
		closeSpan.setAttribute('aria-hidden', 'true');
		close.appendChild(closeSpan);
		closeDiv.appendChild(close);

		contentContainer.className = 'o-coach-mark__content-container';
		contentContainer.appendChild(content);
		contentContainer.appendChild(closeDiv);
		container.appendChild(contentContainer);

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

			const featurePosition = element.getBoundingClientRect(),
				markWidth = container.offsetWidth,
				markHeight = content.offsetHeight + 30,
				horizontal_center = ((featurePosition.right + featurePosition.left) / 2 + featurePosition.left),
				vertical_center = ((featurePosition.bottom - featurePosition.top)/2 + featurePosition.top) + window.pageYOffset;
			var top, left;

			switch (placement) {
				case 'bottom':
					top = featurePosition.bottom;
					left = horizontal_center;
					break;
				case 'top':
					top = (featurePosition.top + window.pageYOffset - markHeight);
					left = horizontal_center;
					break;
				case 'right':
					top = vertical_center - 60;
					left = (featurePosition.right + window.pageXOffset);
					break;
				case 'left':
					top = vertical_center - 60;
					left = (featurePosition.left + window.pageXOffset - markWidth);
					break;
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


			const rect = contentContainer.getBoundingClientRect();
			if (rect.left < 0) {
				container.style.left = 0;
			}
			if (rect.right > 0 && rect.right > window.innerWidth) {
				container.style.left = window.innerWidth - contentContainer.clientWidth - 20 + 'px';
			}

		}

		//Inject html - use classes to position
		element.parentNode.insertBefore(container, element.nextSibling);

		// temporarily show for measuring
		container.style.visibility = 'visible';

		resetPosition();

		window.addEventListener("resize", resetPosition);

		close.addEventListener('click', closeCoachMark);

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
	}
}

componentHandler.register({
	constructor: CoachMark,
	classAsString: 'CoachMark',
	cssClass: 'o-coach-mark'
});


