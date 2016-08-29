// NOTE: There is no need to rename this file.
//
// In React, an owner is the component that sets the props of other components, if desired.
// See https://facebook.github.io/react/docs/multiple-components.html for composability.
//

import React, {PropTypes} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import {messages} from './defaultMessages';

class ComponentOwner extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if(!this.props.opts.disableShadowing) {
			this.props.target.classList.add('o-coach-mark__hole');
		}
		this.resetPosition();
		this.props.target.scrollIntoView(false);
		window.addEventListener('resize', this.resetPosition.bind(this));
	}

	closeCoachMark(event) {
		this.props.target.classList.remove('o-coach-mark__hole');
		window.removeEventListener('resize', this.resetPosition.bind(this));
		if(this.props.callback) {
			this.props.callback(this.props.opts.id, event);
		}
		this.props.removeCoachMark();

	}

	triggerEvent(elementClickedIS, eventIs, payload) {
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
			id: this.props.opts.id,
			payload: payload
		};

		if (document.createEvent) {
			this.props.target.dispatchEvent(event);
		} else {
			// IE9
			this.props.target.fireEvent("on" + event.eventType, event);
		}
	}
	
	// may need to move this to somewhere else.  We don't actually want a redraw to happen we just want to move
	// items around.  So it maybe worthwhile to do this up a level
	resetPosition() {
		const element = this.props.target;
		const container = document.getElementById(this.props.opts.id);
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
				horizontal_center = ((featurePosition.right - featurePosition.left) / 2 + featurePosition.left),
				vertical_center = ((featurePosition.bottom - featurePosition.top) / 2 + featurePosition.top) + window.pageYOffset;

		const centerOnDiv = () => {
				var left = horizontal_center - 280;
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
		container.style.left = (typeof this.props.opts.offsetX !== 'undefined') ? left + this.props.opts.offsetX + 'px' : left + 'px';
		container.style.top = (typeof this.props.opts.offsetY !== 'undefined') ? top + this.props.opts.offsetY + 'px' : top + 'px';

		// push right if we are off-screen to the left
		let rect = contentContainer.getBoundingClientRect();
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
			rect = this.props.target.getBoundingClientRect(),
			// 50 is close enough. This is very browser-specific
			bottomHalf = rect.bottom - rect.height + 50 + window.pageYOffset > height/2,
			leftCenterLine = rect.left + rect.width/2 < window.innerWidth/2;

		if (bottomHalf) {
			placement += 'top';
		} else {
			placement += 'bottom';
		}

		if(leftCenterLine) {
			placement += '-left';
		}
		
		return placement;
	}

	extraOptions() {
		const {formatMessage} = this.props.intl;

		if(this.props.opts.gotIt) {
			return (
				<div className="pe-copy--small">
					<button className="o-coach-mark__got-it pe-btn pe-btn--link" onClick={ (event) => this.closeCoachMark(event) }>
						{this.props.opts.gotItText || formatMessage(messages.gotIt)}
					</button>
				</div>
			);
		} 

		if(this.props.opts.currentCM && this.props.opts.totalCM) {
			const opts = this.props.opts;
			let backButton = '';
			let nextText = opts.closeText || formatMessage(messages.close);
			const noBack = {
				paddingLeft: '107px'
			};
			const backEvent = (event) => {
				this.closeCoachMark(event);
				this.triggerEvent('previous', 'o-cm-previous-clicked');
				event.preventDefault();
			}
			const nextEvent = (event) => {
				this.closeCoachMark(event);
				this.triggerEvent('next', 'o-cm-next-clicked');
				event.preventDefault();
			}
			if(opts.currentCM > 1 && opts.totalCM > 1) {
				backButton = (
					<button className="o-coach-mark__button-space pe-btn pe-btn--link" onClick={backEvent}>
						<span>{opts.previousText || formatMessage(messages.back)}</span>
					</button>
				);
				noBack.paddingLeft = '';
			}
			if(opts.currentCM < opts.totalCM) {
				nextText = opts.nextText || formatMessage(messages.next);
			}

			return (
				<div className="o-coach-mark__back-next pe-copy--small" tabindex="2">
					{backButton}
					<span className="o-coach-mark__total-coachmarks pe-label pe-label--small" style={noBack}>
						{opts.currentCM}/{opts.totalCM}
					</span>
					<button className="o-coach-mark__next-button pe-btn pe-btn--link" onClick={nextEvent}>
						<span>{nextText}</span>
					</button>
				</div>
			);
		}

		return '';
	}

	addMeatball() {
		if(this.props.opts.currentCM && this.props.opts.totalCM) {
			return (
				<div className="o-coach-mark__meatball">
					{this.props.opts.currentCM}
				</div>
			);
		}
		return '';
	}

	render() {
		const placement = this.props.opts.disablePointer ? '' : this.getPlacement();
		const extras = this.extraOptions();
		const meatball = this.addMeatball();
		const meatballTitleStyle = {};
		// if there is a meatball then we need to change the title text padding to line up properly
		if(meatball !== '') {
			meatballTitleStyle.paddingTop = '24px'
		}

		return (
			<div id={this.props.opts.id} className="o-coach-mark__container" style={{ zIndex: 990 }}>
				<div className="o-coach-mark__content-container">
					<div className={`o-coach-mark__content ${placement}`}>
						{/*titlebar*/}
						<div>
							{meatball}
							<div className="o-coach-mark__title pe-label pe-label--bold" style={meatballTitleStyle}> 
								{this.props.opts.title}
							</div>
							<p className="pe-copy--small o-coach-mark__paragraph"> 
								{this.props.opts.text}
							</p>
						</div>
						{extras}						
					</div>
					<div className="o-coach-mark__close-div"> 
						<button className="o-coach-mark__close-icon" tabindex="3" onClick={ (event) => this.closeCoachMark(event) }>
							<span className="o-coach-mark__sr-hidden"> </span>
							<span className="pe-icon--times pe-color(gray-no-1) pe-label" aria-hidden> </span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default injectIntl(ComponentOwner); // Inject this.props.intl into the component context
