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

		if(!opts.placement) opts.placement = "bottom";

		if(opts.placement !== 'left' &&
			opts.placement !== 'right' &&
			opts.placement !== 'top' &&
			opts.placement !== 'bottom')
			throw new Error('invalid value for opts.placement: ' +
			'must be one of the following - left, right, top, or bottom');

		if(!opts.text)
			throw new Error('missing required option: ' +
			'you must specify text for the coach mark');

		// create relative parent for simplified positioning
		const positioner = document.createElement('div');
		positioner.style.position = 'absolute'; 
		positioner.style.display = 'inline-block';
		let back;
		let close;
		let next;
		//Build html
		
		const container = document.createElement('div');
		close = document.createElement('button');
		const closeSpan = document.createElement('span');
		const titleText = document.createElement('div');
		back = document.createElement('button');
		const backSpan = document.createElement('span');
		next = document.createElement('button');
		const nextSpan = document.createElement('span');
		const totalOfCoachMarksSpan = document.createElement('span');

		titleText.className = 'o-coach-mark__title';
		const internalText = ('textContent' in titleText) ? 'textContent' : 'innerText';

		if (opts.title) titleText[internalText] = opts.title;

		close.setAttribute('type', 'button');
		close.setAttribute('aria-label', 'close');
		close.className = 'o-coach-mark__close-icon';

		closeSpan[internalText] = '✕';
		closeSpan.setAttribute('aria-hidden', 'true');
		close.appendChild(closeSpan);

		container.className = 'o-coach-mark__container';
		container.style.visibility = 'hidden';
		container.style.display = 'block';
		container.style.position = 'absolute';
		const content = document.createElement('div');
		content.style.margin = '0';
		content.className = 'o-coach-mark__content';
		content.className += ' o-coach-mark--' + opts.placement;
		content.appendChild(close)
		content.appendChild(titleText);
		const paragraph = document.createElement('p');
		paragraph[internalText] = opts.text;

		content.appendChild(paragraph);
		if (opts.hasBack || opts.hasNext) {
			//build back button

			let buttonClicked = (backNextbutton) => {
				let event;
				if (document.createEvent) {
					event = document.createEvent('HTMLEvents');
					event.initEvent('o-cm-backNext-clicked', true, true);
				} else {
					event = document.createEventObject();
					event.eventType = 'o-cm-backNext-clicked';
				}

				event.eventName = 'o-cm-backNext-clicked';
				event.data = {
					type: backNextbutton,
					id: opts.id
				}

				if (document.createEvent) {
					element.dispatchEvent(event);
				} else {
					element.fireEvent("on" + event.eventType, event);
				}
			};

			const backNextDiv = document.createElement('div');
			back.setAttribute('type', 'button');
			back.setAttribute('aria-label', 'back');
			back.className = 'o-coach-mark__button-space';

			backSpan[internalText] = 'Back';
			backSpan.setAttribute('aria-hidden', 'true');
			back.appendChild(backSpan);
			//build next button
			next.setAttribute('type', 'button');
			next.setAttribute('aria-label', 'next');

			nextSpan[internalText] = 'Next';
			nextSpan.setAttribute('aria-hidden', 'true');
			next.appendChild(nextSpan);
			back.disabled = opts.hasNext;
			next.disabled = opts.hasBack;
			totalOfCoachMarksSpan.setAttribute('aria-hidden', 'true');
			totalOfCoachMarksSpan.style.paddingLeft = '60px';
			totalOfCoachMarksSpan[internalText] = opts.hasNext ? '1/2' : '2/2';

			backNextDiv.appendChild(back);
			backNextDiv.appendChild(next);
			backNextDiv.appendChild(totalOfCoachMarksSpan);
			content.appendChild(backNextDiv);
			hideCMOnClick(back);
			hideCMOnClick(next);

			function hideCMOnClick(parent) {
				var button = opts.hasNext ? 'nextButton' : 'backButton';
				parent.onclick = function(event) {
					buttonClicked(button);
					container.style.visibility = 'hidden';
					event.preventDefault();
				};
			};
		}
		content.style.position = 'relative';
		container.appendChild(content);

		//Inject html - use classes to position
		positioner.appendChild(container);
		element.parentNode.insertBefore(positioner, element.nextSibling);

		// temporarily show for measuring
		container.style.visibility = 'visible';

		const featurePosition = element.getBoundingClientRect();
		const featureHeight = element.offsetHeight;

		const markHeight = content.offsetHeight + 10;
		const markWidth = container.offsetWidth;

		container.style.visibility = 'hidden';

		if (opts.placement === 'bottom') {
			if (window.innerHeight - featurePosition.bottom > markHeight) {
				container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'top') {
			if (featurePosition.top > markHeight) {
				container.style.top = ((featureHeight + markHeight) * -1) + 'px';
				container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'left') {
			if (window.innerWidth - featurePosition.left > markWidth) {
				container.style.top = (featureHeight * -1) + 'px';
				container.style.left = (featurePosition.left + window.pageXOffset - markWidth) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'right') {
			if (window.innerWidth - featurePosition.right > markWidth) {
				container.style.top = (featureHeight * -1) + 'px';
				container.style.left = (featurePosition.right + window.pageXOffset) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		}
		container.style.visibility = 'visible';

		close.addEventListener('click', function(event) {
			container.style.visibility = 'hidden';
			callback(event);
		});
	}
}

componentHandler.register({
	constructor: CoachMark,
	classAsString: 'CoachMark',
	cssClass: 'o-coach-mark'
});
