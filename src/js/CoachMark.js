import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../scss/coachmark.scss';

class CoachMark extends Component {
  static propTypes = {
    targetId: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    srCloseText: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    gotIt: PropTypes.bool,
		gotItText: PropTypes.string,
    disableShadowing: PropTypes.bool,
    disablePointer: PropTypes.bool,
		offsetX: PropTypes.number,
		offsetY: PropTypes.number,
		zIndex: PropTypes.number,
		placement: PropTypes.oneOf(['top', 'bottom']),
		stopScroll: PropTypes.bool
  };
  
  static defaultProps = {
    gotItText: 'Got it',
    offsetX: 0,
    offsetY: 0,
    srCloseText: 'Close dialog',
		zIndex: 1200
  };
  
  constructor(props) {
    super(props);
    this.target = document.getElementById(props.targetId);
  
    if (!this.props.disableShadowing) {
      this.target.classList.add('o-coach-mark__hole');
    }
    
    if (!this.props.stopScroll) {
      this.target.scrollIntoView(false);
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.resetPosition);
  }
  
  componentDidMount() {
    this.resetPosition();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.resetPosition);
    this.target.classList.remove('o-coach-mark__hole');
  }

  resetPosition = () => {
    const element = this.target;
    const container = this.myRef;
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
      return horizontal_center - (content.className.includes('-left') ? 60 : 280);
    };
    
    const centerOnScreen = () => {
      // take horizontal scroll into account
      const relativeOffset = container.getBoundingClientRect().left - container.offsetLeft;
      return document.body.offsetWidth / 2 - relativeOffset - 150;
    };
    // center pointer on div if wider than 480, otherwise center on screen
    const left = (document.body.offsetWidth > 480) ? centerOnDiv() : centerOnScreen();
  
    const placement = this.getPlacement();
  
    const top = placement.includes('bottom')
      ? featurePosition.bottom + 2
      : featurePosition.top - markHeight - 31 - container.offsetHeight;
    
    // allow consumer to specify an offset (side effect: this adds 'px' regardless)
    container.style.left = left + this.props.offsetX + 'px';
    container.style.top = top + this.props.offsetY + 'px';
  
    // push right if we are off-screen to the left
    const rect = contentContainer.getBoundingClientRect();
    if (rect.left < 0) {
      container.style.left = element.offsetLeft - rect.left + 'px';
    }
  };
  
  getPlacement = () => {
    // get window geometry - this is how jQuery does it
    const body = document.body,
      html = document.documentElement,
      height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight),
      rect = this.target.getBoundingClientRect(),
      // 50 is close enough. This is very browser-specific
      isBottomHalf = rect.bottom - rect.height + 50 + window.pageYOffset > height/2,
      leftCenterLine = rect.left + rect.width/2 < window.innerWidth/2
    ;
    
    let placement;
    if (this.props.placement === 'top') {
      placement = 'o-coach-mark--top';
    } else if (this.props.placement === 'bottom') {
      placement = 'o-coach-mark--bottom';
    } else {
      placement = isBottomHalf ? 'o-coach-mark--top' : 'o-coach-mark--bottom'
    }
    if (leftCenterLine) {
      return `${placement}-left`;
    }
    return placement;
  };
	
	render() {
	  const placement = this.getPlacement();
		return (
			<div ref={(node) => {this.myRef = node}} className="o-coach-mark__container"  style={{ zIndex: this.props.zIndex }}>
				<div className="o-coach-mark__content-container">
					<button
						type="button"
						className="o-coach-mark__close-icon"
						onClick={this.props.onClose}
					>
						<svg role="img"
							 aria-labelledby="r2"
							 focusable="false"
							 className="pe-icon--remove-sm-18">
						<title id="r2">{this.props.srCloseText}</title>
						<use xlinkHref="#remove-sm-18"></use>
						</svg>
					</button>
					<div className={`o-coach-mark__content ${placement}`}>
            <div className="o-coach-mark__title pe-label--bold">
              {this.props.title}
            </div>
            <p className="o-coach-mark__paragraph pe-label">
              {this.props.text}
            </p>
						{this.props.gotIt &&
							<button className="o-coach-mark__got-it pe-label" onClick={this.props.onClose}>
								{this.props.gotItText}
							</button>
						}
					</div>

				</div>
			</div>
		);
	}
}

export default CoachMark;
