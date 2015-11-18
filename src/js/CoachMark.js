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

		//Add style to parent
		element.style.position = 'relative';

		//Build html
		const container = document.createElement('div');
		const close = document.createElement('a');
		const titleText = document.createElement('div');

		titleText.className = 'title';
		if(opts.title) titleText.innerText = opts.title;

		close.innerText = '✕';
		close.href = '#';
		close.className = 'close_icon';

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
		paragraph.innerText = opts.text;
		content.appendChild(paragraph);
		content.style.position = 'relative';
		container.appendChild(content);

		//Inject html - use classes to position
		element.parentNode.insertBefore(container, element.nextSibling);

		const featurePosition = element.getBoundingClientRect();
		const markHeight = container.offsetHeight;
		const markWidth = container.offsetWidth;

		if(opts.placement === 'bottom') {
			if(window.innerHeight-featurePosition.bottom > markHeight) {
					container.style.top = (featurePosition.bottom) + 'px';
					container.style.left = featurePosition.left + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'top') {
			if(featurePosition.top > markHeight) {
				container.style.top = (featurePosition.top - markHeight) + 'px';
				container.style.left = featurePosition.left + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'left') {
			if(window.innerWidth - featurePosition.left > markWidth) {
				container.style.top = featurePosition.top + 'px';
				container.style.left = (featurePosition.left - markWidth) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'right'){
			if(window.innerWidth - featurePosition.right > markWidth) {
				container.style.top = featurePosition.top + 'px';
				container.style.left = (featurePosition.right) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		}

		container.style.visibility = 'visible';

		close.addEventListener('click', function (event) {
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
