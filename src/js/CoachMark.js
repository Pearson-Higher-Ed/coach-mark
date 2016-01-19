import componentHandler from 'o-component-handler';

export default class CoachMark {

	constructor(element, opts, callback) {
		this.element = element;
		this.opts = opts;
		this.callback = callback;
		let count;
		let trackButton = 0;
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
		positioner.style.position = 'relative'; 
		positioner.style.display = 'inline-block';
		buildHtml(element,opts);
		let back;
		let close;
		let next;
		//Build html
		function buildHtml(element, opts) {
			count = 0;
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
			if (trackButton > 0 || opts.hasBack || opts.hasNext) {
				//build back button
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

				// Total number of back and next buttons eg:2/1 
				totalOfCoachMarksSpan[internalText] = backNextButtonTracking('hasBack', opts, count) + '/' + backNextButtonTracking('hasNext', opts, count);
				totalOfCoachMarksSpan.setAttribute('aria-hidden', 'true');
				totalOfCoachMarksSpan.style.paddingLeft = '60px';

				content.appendChild(back);
				content.appendChild(next);
				content.appendChild(totalOfCoachMarksSpan);
			}
			content.style.position = 'relative';
			container.appendChild(content);

			//Inject html - use classes to position
			positioner.appendChild(container);
			element.parentNode.insertBefore(positioner, element.nextSibling);
			
			// Disable the back and next button if there are not elements and opts in hasBack or hasNext attribute
			let backElement = opts.hasBack ? opts.hasBack.element : null;
			let backOpts = opts.hasBack ? opts.hasBack.opts : null;
			back.disabled = !opts.hasBack ? true : false;

			let nextElement = opts.hasNext ? opts.hasNext.element : null;
			let nextOpts = opts.hasNext ? opts.hasNext.opts : null;
			next.disabled = !opts.hasNext ? true : false;
			
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
			back.addEventListener('click', function(event) {
				trackButton++
				container.style.visibility = 'hidden';
				buildHtml(backElement, backOpts);
				callback(event);
			});
			next.addEventListener('click', function(event) {
				trackButton++;
				container.style.visibility = 'hidden';
				buildHtml(nextElement, nextOpts);
				callback(event);
			});
		}
		// Function to track the number of back and next buttons for each coachmark
		function backNextButtonTracking(property, opts, count) {
			for (let opt in opts) {
				if (opt === property) {
					count++;
					if (property === 'hasNext')
						count = backNextButtonTracking(property, opts.hasNext.opts, count);
					else if (property === 'hasBack')
						count = backNextButtonTracking(property, opts.hasBack.opts, count);
				}
			}
			return count;
		}
	}
}

componentHandler.register({
	constructor: CoachMark,
	classAsString: 'CoachMark',
	cssClass: 'o-coach-mark'
});
