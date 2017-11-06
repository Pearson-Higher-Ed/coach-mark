// NOTE: There is no need to rename this file.
// In React, an owner is the component that sets the props of other components, if desired.
// See https://facebook.github.io/react/docs/multiple-components.html for composability.

import React from 'react';
import { messages } from './defaultMessages';

class ComponentOwner extends React.Component {

	constructor(props) {
		super(props);
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

	extraOptions() {
		const gotItText = this.props.opts.gotItText ? this.props.opts.gotItText : messages.gotIt.defaultMessage;

		if(this.props.opts.gotIt) {
			return (
				<button className="o-coach-mark__got-it pe-label" onClick={(event) => this.props.removeCoachMark(event)}>
					{gotItText}
				</button>
			);
		}

		if(this.props.opts.currentCM && this.props.opts.totalCM) {
			const opts = this.props.opts;
			let backButton = '';
			let nextText = opts.closeText ? opts.closeText : messages.close.defaultMessage;
			const prevText = opts.previousText ? opts.previousText : messages.back.defaultMessage;
			const noBack = {
				paddingLeft: '107px'
			};
			const backEvent = (event) => {
				this.props.removeCoachMark(event);
				this.triggerEvent('previous', 'o-cm-previous-clicked');
				event.preventDefault();
			}
			const nextEvent = (event) => {
				this.props.removeCoachMark(event);
				this.triggerEvent('next', 'o-cm-next-clicked');
				event.preventDefault();
			}
			if(opts.currentCM > 1 && opts.totalCM > 1) {
				backButton = (
					<button className="o-coach-mark__button-space pe-btn pe-btn--link" onClick={backEvent}>
						<span>{prevText}</span>
					</button>
				);
				noBack.paddingLeft = '';
			}
			if(opts.currentCM < opts.totalCM) {
				nextText = opts.nextText ? opts.nextText : messages.close.defaultMessage;
			}

			return (
				<div className="o-coach-mark__back-next pe-copy--small">
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
		const extras = this.extraOptions();
		const meatball = this.addMeatball();
		const meatballTitleStyle = {};
		// if there is a meatball then we need to change the title text padding to line up properly
		if(meatball !== '') {
			meatballTitleStyle.paddingTop = '24px'
		}

		const { removeCoachMark, opts, placement } = this.props;

		return (
			<div id={opts.id} className="o-coach-mark__container"  style={{ zIndex: opts.zIndex || 1200 }}>
				<div className="o-coach-mark__content-container">
					<div className={`o-coach-mark__content ${placement}`}>
						<div>
							{meatball}
							<div className="o-coach-mark__title pe-label--bold" style={meatballTitleStyle}>
								{opts.title}
							</div>
							<p className="o-coach-mark__paragraph pe-label">
								{opts.text}
							</p>
						</div>
						{extras}
					</div>
						<button
							className="o-coach-mark__close-icon"
							onClick={(event) => removeCoachMark(event)}
							style={meatballTitleStyle}
						>
							<svg role="img"
							   aria-labelledby="r2"
							   focusable="false"
							   className="pe-icon--remove-sm-18">
							<title id="r2">Close dialog</title>
							<use xlinkHref="#remove-sm-18"></use>
						  </svg>
						</button>
				</div>
			</div>
		);
	}
}

export default ComponentOwner;
