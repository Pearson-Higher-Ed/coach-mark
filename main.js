// bundled component styling
import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import ComponentOwner from './src/js/component-owner';

export default class CoachMark {

	constructor(config) {

		if (!config.opts.id) {
			throw new Error('missing required option: you must specify a unique id for the coach mark')
		}

		if (config.opts.currentCM !== undefined && config.opts.totalCM === undefined) {
			throw new Error('you must include totalCM if currentCM is specified')
		}

		if (config.opts.gotIt && config.opts.totalCM) {
			throw new Error('cannot display "Got it" along with numbered coach marks (totalCM)')
		}

		this.config = config;
		this.target = document.getElementById(config.elementId);
		this.container = document.createElement('div');
		this.target.parentNode.insertBefore(this.container, this.target.nextSibling);
		this.init();
		this.createEvents();
	}

	createEvents() {
		if(!this.config.opts.disableShadowing) {
			this.target.classList.add('o-coach-mark__hole');
		}
		this.resetPosition();

		if(!this.config.opts.stopScroll) {
			this.target.scrollIntoView(false);
		}

		window.addEventListener('resize', () => this.resetPosition());
	}

	removeCoachMark(event) {
		this.target.classList.remove('o-coach-mark__hole');
		window.removeEventListener('resize', () => this.resetPosition());
		if(this.config.callback) {
			this.config.callback(this.config.opts.id, event);
		}
		this.container.parentElement.removeChild(this.container);
	}

	resetPosition() {
		const element = this.target;
		const container = document.getElementById(this.config.opts.id);
		const content = container.childNodes[0].childNodes[0];
		const contentContainer = container.childNodes[0];
		// this is called on draw and redraw
		const featurePosition = {
			top: element.offsetTop,
			left: element.offsetLeft,
			bottom: element.offsetTop + element.offsetHeight,
			right: element.offsetLeft + element.offsetWidth
		},
		markHeight = content.offsetHeight + 30,
		horizontal_center = ((featurePosition.right - featurePosition.left) / 2 + featurePosition.left);

		const centerOnDiv = () => {
			let left = horizontal_center - 280;
			if (content.className.indexOf('-left') > -1) {
					// push to the right because pointer is on the left side
					left += 220;
			}
			return left;
		};

		const centerOnScreen = () => {
			// take horizontal scroll into account
			const relativeOffset = container.getBoundingClientRect().left - container.offsetLeft;
			return document.body.offsetWidth / 2 - relativeOffset - 150;
		};
		// center pointer on div if wider than 480, otherwise center on screen
		const left = (document.body.offsetWidth > 480) ? centerOnDiv() : centerOnScreen();

		let top = 0;
		const placement = this.getPlacement();
		if (placement.indexOf('bottom') > -1) {
			top = featurePosition.bottom + 5;
		}
		if (placement.indexOf('top') > -1) {
			top = featurePosition.top - markHeight - 15 - container.offsetHeight;
		}

		// allow consumer to specify an offset (side effect: this adds 'px' regardless)
		container.style.left = (typeof this.config.opts.offsetX !== 'undefined') ? left + this.config.opts.offsetX + 'px' : left + 'px';
		container.style.top = (typeof this.config.opts.offsetY !== 'undefined') ? top + this.config.opts.offsetY + 'px' : top + 'px';

		// push right if we are off-screen to the left
		const rect = contentContainer.getBoundingClientRect();
		if (rect.left < 0) {
			container.style.left = element.offsetLeft - rect.left + 'px';
		}
	}

	getPlacement() {
		let placement = 'o-coach-mark--';

		// get window geometry - this is how jQuery does it
		const body = document.body,
			html = document.documentElement,
			height = Math.max(
				body.scrollHeight,
				body.offsetHeight,
				html.clientHeight),
			rect = this.target.getBoundingClientRect(),
			// 50 is close enough. This is very browser-specific
			bottomHalf = rect.bottom - rect.height + 50 + window.pageYOffset > height/2,
			leftCenterLine = rect.left + rect.width/2 < window.innerWidth/2;

		if(this.config.opts.forceAbove) {
			placement += 'top';
		} else if(this.config.opts.forceBelow) {
			placement += 'bottom';
		} else {
			placement += bottomHalf ? 'top' : 'bottom';
		}




		if(leftCenterLine) {
			placement += '-left';
		}

		return placement;
	}

	init() {
		if (!document.getElementById('pe-icons-sprite')) {
			const pe_ajax=new XMLHttpRequest();
			pe_ajax.open("GET", "/icons/p-icons-sprite-1.1.svg", true);
			pe_ajax.responseType="document";
			pe_ajax.onload=function() {
				document.body.insertBefore(
					pe_ajax.responseXML.documentElement,
					document.body.childNodes[0]
				);
			};
			pe_ajax.onerror=function() {
				console.log('Icon sprite not loaded...icons not available');
			};
			pe_ajax.send();
		}

		ReactDOM.render(
			<ComponentOwner
			  removeCoachMark={() => this.removeCoachMark()}
				target={this.target}
				opts={this.config.opts}
				callback={this.config.callback}
				placement={!this.config.opts.disablePointer ? this.getPlacement() : ''} />,
			this.container
		);
	}
}

//
// For events, use the Origami naming convention of pre-pending with 'o.'
//
document.body.addEventListener('o.InitCoachMark', e => new CoachMark(e.detail));
