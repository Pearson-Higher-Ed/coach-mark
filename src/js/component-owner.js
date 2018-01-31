// NOTE: There is no need to rename this file.
// In React, an owner is the component that sets the props of other components, if desired.
// See https://facebook.github.io/react/docs/multiple-components.html for composability.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { messages } from './defaultMessages';
import '../scss/component-specific.scss';

class CoachMark extends Component {
  static propTypes = {
    elementId: PropTypes.string.isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
    gotIt: PropTypes.bool,
    disableShadowing: PropTypes.bool,
    disablePointer: PropTypes.bool,
    id: PropTypes.string.isRequired,
    callback: PropTypes.func
  };
  
	constructor(props) {
		super(props);
    
    // if (!props.id) {
    //   throw new Error('missing required option: you must specify a unique id for the coach mark')
    // }
    
    // if (props.currentCM !== undefined && config.totalCM === undefined) {
    //   throw new Error('you must include totalCM if currentCM is specified')
    // }
    
    // if (props.gotIt && props.totalCM) {
    //   throw new Error('cannot display "Got it" along with numbered coach marks (totalCM)')
    // }
   // this.props = config;
    this.target = document.getElementById(props.elementId);
    this.container = document.createElement('div');
    this.target.parentNode.insertBefore(this.container, this.target.nextSibling);
  //  this.init();
//    this.createEvents();
//    this.resetPosition();
  }
  
  // createEvents = () => {
  //   if(!this.props.disableShadowing) {
  //     this.target.classList.add('o-coach-mark__hole');
  //   }
  //
  //   if(!this.props.stopScroll) {
  //     this.target.scrollIntoView(false);
  //   }
  //
  //   window.addEventListener('resize', this.resetPosition);
  // };
  
  removeCoachMark = (event) => {
		debugger;
    this.target.classList.remove('o-coach-mark__hole');
    window.removeEventListener('resize', this.resetPosition);
    if (this.props.callback) {
      this.props.callback(this.props.id, event);
    }
    this.container.parentElement.removeChild(this.container);
  };
  
  resetPosition = () => {
    const element = this.target;
    const container = document.getElementById(this.props.id) || this.container;
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
      top = featurePosition.bottom + 2;
    }
    if (placement.indexOf('top') > -1) {
      top = featurePosition.top - markHeight - 31 - container.offsetHeight;
    }
  
    // allow consumer to specify an offset (side effect: this adds 'px' regardless)
    container.style.left = (typeof this.props.offsetX !== 'undefined') ? left + this.props.offsetX + 'px' : left + 'px';
    container.style.top = (typeof this.props.offsetY !== 'undefined') ? top + this.props.offsetY + 'px' : top + 'px';
  
    // push right if we are off-screen to the left
    const rect = contentContainer.getBoundingClientRect();
    if (rect.left < 0) {
      container.style.left = element.offsetLeft - rect.left + 'px';
    }
  };
  
  getPlacement = () => {
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
    
    if(this.props.forceAbove) {
      placement += 'top';
    } else if(this.props.forceBelow) {
      placement += 'bottom';
    } else {
      placement += bottomHalf ? 'top' : 'bottom';
    }
    
    if(leftCenterLine) {
      placement += '-left';
    }
    
    return placement;
  };
  
	triggerEvent = (elementClickedIS, eventIs, payload) => {
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
			id: this.props.id,
			payload: payload
		};

		if (document.createEvent) {
			this.props.target.dispatchEvent(event);
		} else {
			// IE9
			this.props.target.fireEvent("on" + event.eventType, event);
		}
	};

	extraOptions = () => {
		const gotItText = this.props.gotItText ? this.props.gotItText : messages.gotIt.defaultMessage;

		if (this.props.gotIt) {
			return (
				<button className="o-coach-mark__got-it pe-label" onClick={(event) => this.removeCoachMark(event)}>
					{gotItText}
				</button>
			);
		}

		if (this.props.currentCM && this.props.totalCM) {
			const opts = this.props.opts;
			let backButton = '';
			let nextText = closeText ? closeText : messages.close.defaultMessage;
			const prevText = previousText ? previousText : messages.back.defaultMessage;
			const noBack = {
				paddingLeft: '107px'
			};
			const backEvent = (event) => {
				this.props.removeCoachMark(event);
				this.triggerEvent('previous', 'o-cm-previous-clicked');
				event.preventDefault();
			};
			const nextEvent = (event) => {
				this.props.removeCoachMark(event);
				this.triggerEvent('next', 'o-cm-next-clicked');
				event.preventDefault();
			};
			if(currentCM > 1 && totalCM > 1) {
				backButton = (
					<button className="o-coach-mark__button-space pe-btn pe-btn--link" onClick={backEvent}>
						<span>{prevText}</span>
					</button>
				);
				noBack.paddingLeft = '';
			}
			if(currentCM < totalCM) {
				nextText = nextText ? nextText : messages.close.defaultMessage;
			}

			return (
				<div className="o-coach-mark__back-next pe-copy--small">
					{backButton}
					<span className="o-coach-mark__total-coachmarks pe-label pe-label--small" style={noBack}>
						{currentCM}/{totalCM}
					</span>
					<button className="o-coach-mark__next-button pe-btn pe-btn--link" onClick={nextEvent}>
						<span>{nextText}</span>
					</button>
				</div>
			);
		}

		return '';
	};

	addMeatball = () => {
		if(this.props.currentCM && this.props.totalCM) {
			return (
				<div className="o-coach-mark__meatball">
					{this.props.currentCM}
				</div>
			);
		}
		return '';
	};

	render() {
		const extras = this.extraOptions();
		const meatball = this.addMeatball();
		const meatballTitleStyle = {};
		// if there is a meatball then we need to change the title text padding to line up properly
		if(meatball !== '') {
			meatballTitleStyle.paddingTop = '24px'
		}

		const { removeCoachMark, placement = '' } = this.props;

		return (
			<div id={this.props.id} className="o-coach-mark__container"  style={{ zIndex: this.props.zIndex || 1200 }}>
				<div className="o-coach-mark__content-container">
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
					<div className={`o-coach-mark__content ${placement}`}>
						<div>
							{meatball}
							<div className="o-coach-mark__title pe-label--bold" style={meatballTitleStyle}>
								{this.props.title}
							</div>
							<p className="o-coach-mark__paragraph pe-label">
								{this.props.text}
							</p>
						</div>
						{extras}
					</div>

				</div>
			</div>
		);
	}
}

export default CoachMark;
