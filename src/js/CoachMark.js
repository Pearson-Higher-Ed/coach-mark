import componentHandler from 'o-component-handler';

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


		const placement = function placement() {
			if (element.getBoundingClientRect().left == 0) {
				return 'right';
			}
			if (element.getBoundingClientRect().bottom == window.innerHeight) {
				return 'top';
			}
			if (element.getBoundingClientRect().right == window.innerWidth) {
				return 'left';
			}
			return 'bottom';
		}();


		// create relative parent for simplified positioning
		const positioner = document.createElement('div');
		positioner.style.position = 'relative'; 
		positioner.style.display = 'inline-block';

		//Build html
		const container = document.createElement('div');
		const close = document.createElement('button');
		const closeSpan = document.createElement('span');
		const screenReader = document.createElement('span');
		const titleText = document.createElement('div');
		
		titleText.className = 'o-coach-mark__title';
		const internalText = ('textContent' in titleText) ? 'textContent' : 'innerText';

		if (opts.title) titleText[internalText] = opts.title;

		//close.setAttribute('aria-label', 'close');
		close.className = 'o-coach-mark__close-icon';

		closeSpan[internalText] = '✕';
		closeSpan.setAttribute('aria-hidden', 'true');
		close.appendChild(closeSpan);

		screenReader.className="o-coach-mark__sr-hidden";
		screenReader[internalText] = opts.srText || "close this coach mark";
		close.appendChild(screenReader);

		container.className = 'o-coach-mark__container';
		container.style.visibility = 'hidden';
		container.style.display = 'block';
		container.style.position = 'absolute';
		const content = document.createElement('div');
		content.style.margin = '0';
		content.className = 'o-coach-mark__content';
		content.className += ' o-coach-mark--' + opts.placement;
		content.appendChild(close);
		content.appendChild(titleText);
		const paragraph = document.createElement('p');
		paragraph[internalText] = opts.text;

		content.appendChild(paragraph);
		if (opts.hasBack || opts.hasNext) {
			const backNextDiv = document.createElement('div');
			const back = document.createElement('button');
			const backSpan = document.createElement('span');
			const next = document.createElement('button');
			const nextSpan = document.createElement('span');
			const totalOfCoachMarksSpan = document.createElement('span');

			back.setAttribute('type', 'button');
			back.className = 'o-coach-mark__button-space';

			backSpan[internalText] = 'Back';
			back.appendChild(backSpan);
			//build next button
			next.setAttribute('type', 'button');
			next.className = 'o-coach-mark__next-button';

			nextSpan[internalText] = 'Next';
			next.appendChild(nextSpan);
			
			totalOfCoachMarksSpan.className = 'o-coach-mark__total-coachmarks';
			totalOfCoachMarksSpan[internalText] = opts.currentCM + '/' + opts.totalCM;

			backNextDiv.appendChild(back);
			backNextDiv.appendChild(next);
			backNextDiv.appendChild(totalOfCoachMarksSpan);
			content.appendChild(backNextDiv);
			eventOnClick(back);
			eventOnClick(next);

			function eventOnClick(parent) {
				const buttonIs = opts.hasNext ? 'nextButton' : 'backButton';
				parent.onclick = function(event) {
					triggerEvent(buttonIs, 'o-cm-backNext-clicked');
					event.preventDefault();
				};
			}
		}
		content.style.position = 'relative';
		container.appendChild(content);

		if (opts.like) {

			let likeDiv;
			let feedBack;
			
			this.appendAnchor = (parent, upDown, text, like) => {
				const link = document.createElement('a');
				link.onclick = function(event) {
					triggerEvent(like, 'o-cm-like-clicked');
					likeDiv.style.display = 'none';
					feedBack.style.display = 'block';
					event.preventDefault();
				};
				link.innerHTML = text;
				link.className = 'o-coach-mark--link-text';
				link.setAttribute('href', '#');
				const likeImg = document.createElement('i');
				likeImg.className = 'o-coach-mark--icons fa fa-thumbs-o-' + upDown;
				likeImg.setAttribute('aria-hidden', 'true');
				link.insertBefore(likeImg, link.childNodes[0]);
				parent.appendChild(link);
			};

			const hr = document.createElement('hr');
			hr.className = 'o-coach-mark--hr';
			content.appendChild(hr);

			likeDiv = document.createElement('div');
			likeDiv.className = 'o-coach-mark__like-div';
			const question = document.createElement('p');
			question.innerHTML = 'What do you think of this change?';
			likeDiv.appendChild(question);
			content.appendChild(likeDiv);
			this.appendAnchor(likeDiv, 'down', 'Not Great', 'dislike');
			this.appendAnchor(likeDiv, 'up', 'I Like It', 'like');
			feedBack = document.createElement('div');
			feedBack.className = 'o-coach-mark__feedback';
			const instructions = document.createElement('p');
			instructions.innerHTML = 'Thanks! Care to tell us more?';
			feedBack.appendChild(instructions);
			const form = document.createElement('textarea');
			const buttonBar = document.createElement('div');
			const submit = document.createElement('button');
			submit.innerHTML = 'submit';
			submit.onclick = () => {
				triggerEvent('submit', 'o-cm-submit-clicked', form.value);
			};
			const cancel = document.createElement('a');
			cancel.innerHTML = 'cancel';
			cancel.setAttribute('href', '#');
			cancel.onclick = () => {
				triggerEvent('cancel', 'o-cm-cancel-clicked');
				likeDiv.style.display = 'block';
				feedBack.style.display = 'none';
			};
			feedBack.appendChild(form);
			buttonBar.appendChild(submit);
			buttonBar.appendChild(cancel);
			feedBack.appendChild(buttonBar);
			content.appendChild(feedBack);
		}

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
			const featurePosition = element.getBoundingClientRect();
			const featureHeight = element.offsetHeight;

			const markHeight = content.offsetHeight + 10;
			const markWidth = container.offsetWidth;

			container.style.visibility = 'hidden';

			switch (placement) {
				case 'bottom':
					container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
					break;
				case 'top':
					container.style.top = ((featureHeight + markHeight) * -1) + 'px';
					container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
					break;
				case 'right':
					container.style.top = (featureHeight * -1) + 'px';
					container.style.left = (featurePosition.right + window.pageXOffset) + 'px';
					break;
				case 'left':
					container.style.top = ((featurePosition.bottom - featurePosition)/2 + featurePosition) + 'px';
					container.style.left = (featurePosition.left + window.pageXOffset - markWidth) + 'px';
					break;
			}

			//if (placement === 'bottom') {
			//	container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
			//}
			//else if (placement === 'top') {
			//	if (featurePosition.top > markHeight) {
			//		container.style.top = ((featureHeight + markHeight) * -1) + 'px';
			//		container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
			//	} else {
			//		throw new Error('insufficient room for coach mark placement');
			//	}
			//} else if (placement === 'left') {
			//	if (window.innerWidth - featurePosition.left > markWidth) {
			//		container.style.top = (featureHeight * -1) + 'px';
			//		container.style.left = (featurePosition.left + window.pageXOffset - markWidth) + 'px';
			//	} else {
			//		throw new Error('insufficient room for coach mark placement');
			//	}
			//} else if (placement === 'right') {
			//	if (window.innerWidth - featurePosition.right > markWidth) {
			//		container.style.top = (featureHeight * -1) + 'px';
			//		container.style.left = (featurePosition.right + window.pageXOffset) + 'px';
			//	} else {
			//		throw new Error('insufficient room for coach mark placement');
			//	}
			//}
			container.style.visibility = 'visible';

		}

		//Inject html - use classes to position
		positioner.appendChild(container);
		element.parentNode.insertBefore(positioner, element.nextSibling);

		// temporarily show for measuring
		container.style.visibility = 'visible';

		resetPosition();

		window.onresize = function(event) {
			resetPosition();
		};


		//const featurePosition = element.getBoundingClientRect();
		//const featureHeight = element.offsetHeight;
        //
		//const markHeight = content.offsetHeight + 10;
		//const markWidth = container.offsetWidth;
        //
		//container.style.visibility = 'hidden';
        //
		//if (opts.placement === 'bottom') {
		//	if (window.innerHeight - featurePosition.bottom > markHeight) {
		//		container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
		//	} else {
		//		throw new Error('insufficient room for coach mark placement');
		//	}
		//} else if (opts.placement === 'top') {
		//	if (featurePosition.top > markHeight) {
		//		container.style.top = ((featureHeight + markHeight) * -1) + 'px';
		//		container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
		//	} else {
		//		throw new Error('insufficient room for coach mark placement');
		//	}
		//} else if (opts.placement === 'left') {
		//	if (window.innerWidth - featurePosition.left > markWidth) {
		//		container.style.top = (featureHeight * -1) + 'px';
		//		container.style.left = (featurePosition.left + window.pageXOffset - markWidth) + 'px';
		//	} else {
		//		throw new Error('insufficient room for coach mark placement');
		//	}
		//} else if (opts.placement === 'right') {
		//	if (window.innerWidth - featurePosition.right > markWidth) {
		//		container.style.top = (featureHeight * -1) + 'px';
		//		container.style.left = (featurePosition.right + window.pageXOffset) + 'px';
		//	} else {
		//		throw new Error('insufficient room for coach mark placement');
		//	}
		//}
		//container.style.visibility = 'visible';

		close.addEventListener('click', function(event) {
			container.style.visibility = 'hidden';
			callback(opts.id, event);
		});
	}
}

componentHandler.register({
	constructor: CoachMark,
	classAsString: 'CoachMark',
	cssClass: 'o-coach-mark'
});
