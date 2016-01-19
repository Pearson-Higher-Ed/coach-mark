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

		if (!opts.id) {
			throw new Error('missing required option: you must specify an id for the coach mark')
		}

		// create relative parent for simplified positioning
		const positioner = document.createElement('div');
		positioner.style.position = 'relative';
		positioner.style.display = 'inline-block';

		//Build html
		const container = document.createElement('div');
		const close = document.createElement('button');
		const closeSpan = document.createElement('span');
		const titleText = document.createElement('div');

		titleText.className = 'o-coach-mark__title';
		const internalText=('textContent' in titleText)?'textContent':'innerText';

		if(opts.title) titleText[internalText] = opts.title;

		close.setAttribute('type','button');
		close.setAttribute('aria-label','close');
		close.className = 'o-coach-mark__close-icon';

		closeSpan[internalText] = '✕';
		closeSpan.setAttribute('aria-hidden','true');
		close.appendChild(closeSpan);

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
		content.style.position = 'relative';
		container.appendChild(content);

		if (opts.like) {
			let likeClicked = (like) => {
				let event;
				if (document.createEvent) {
					event = document.createEvent('HTMLEvents');
					event.initEvent('o-cm-like-clicked', true, true);
				} else {
					event = document.createEventObject();
					event.eventType = 'o-cm-like-clicked';
				}

				event.eventName = 'o-cm-like-clicked';
				event.data = {
					type: like,
					id: opts.id
				}

				if (document.createEvent) {
					element.dispatchEvent(event);
				} else {
					element.fireEvent("on" + event.eventType, event);
				}
			};

			this.appendAnchor = function appendAnchor(parent, upDown, text, like) {
				const link = document.createElement('a');
				link.onclick = function(event) {
					likeClicked(like);
					event.preventDefault();
				};
				link.innerHTML = text;
				link.className = 'o-coach-mark--link-text';
				link.setAttribute('href', '#');
				const likeImg = document.createElement('i');
				likeImg.className = 'o-coach-mark--icons fa fa-thumbs-o-' + upDown;
				likeImg.setAttribute('aria-hidden', 'true');
				// likeImg.width = '20';
				link.insertBefore(likeImg, link.childNodes[0]);
				parent.appendChild(link);
			};

			const likeDiv = document.createElement('div');
			const hr = document.createElement('hr');
			hr.className = 'o-coach-mark--hr';
			likeDiv.appendChild(hr);
			const question = document.createElement('p');
			question.innerHTML = 'What do you think of this change?';
			likeDiv.appendChild(question);
			content.appendChild(likeDiv);
			this.appendAnchor(likeDiv, 'down', 'Not Great', 'dislike');
			this.appendAnchor(likeDiv, 'up', 'I Like It', 'like');
		}

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

		if(opts.placement === 'bottom') {
			if(window.innerHeight-featurePosition.bottom > markHeight) {
					container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'top') {
			if(featurePosition.top > markHeight) {
				container.style.top = ((featureHeight + markHeight) * -1) + 'px';
				container.style.left = (featurePosition.left + window.pageXOffset) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'left') {
			if(window.innerWidth - featurePosition.left > markWidth) {
				container.style.top = (featureHeight * -1) + 'px';
				container.style.left = (featurePosition.left + window.pageXOffset - markWidth) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		} else if (opts.placement === 'right'){
			if(window.innerWidth - featurePosition.right > markWidth) {
				container.style.top = (featureHeight * -1) + 'px';
				container.style.left = (featurePosition.right + window.pageXOffset) + 'px';
			} else {
				throw new Error('insufficient room for coach mark placement');
			}
		}

		container.style.visibility = 'visible';

		close.addEventListener('click', function (event) {
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
