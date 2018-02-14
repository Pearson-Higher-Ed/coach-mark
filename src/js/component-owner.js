import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../scss/component-owner.scss';

class ComponentOwner extends Component {
  static propTypes = {
    target: PropTypes.object.isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.string,
    onClose: PropTypes.func,
    srCloseText: PropTypes.string,
    gotIt: PropTypes.bool,
		gotItText: PropTypes.string,
    disableShadowing: PropTypes.bool,
    disablePointer: PropTypes.bool,
		offsetX: PropTypes.number,
		offsetY: PropTypes.number,
		zIndex: PropTypes.number,
		forceAbove: PropTypes.bool,
    forceBelow: PropTypes.bool,
		stopScroll: PropTypes.bool
  };
  
  static defaultProps = {
    gotItText: 'Got it',
    offsetX: 0,
    offsetY: 0,
    srCloseText: 'Close dialog',
		zIndex: 1200
  };
  
  componentWillMount() {
    if (!this.props.disableShadowing) {
      this.props.target.classList.add('o-coach-mark__hole');
    }
  
    if (!this.props.stopScroll) {
      this.props.target.scrollIntoView(false);
    }
    window.addEventListener('resize', this.resetPosition);
  }
  
  componentDidMount() {
    this.resetPosition();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.resetPosition);
    this.props.target.classList.remove('o-coach-mark__hole');
  }

  resetPosition = () => {
    const { target } = this.props;
    // this is called on draw and redraw
    const elementPosition = {
        top: target.offsetTop,
        left: target.offsetLeft,
        bottom: target.offsetTop + target.offsetHeight,
        right: target.offsetLeft + target.offsetWidth
      },
      horizontal_center = ((elementPosition.right - elementPosition.left) / 2 + elementPosition.left);
    
    const centerOnDiv = () => {
      return horizontal_center - (this.content.className.includes('-left') ? 60 : 280);
    };
    
    const centerOnScreen = () => {
      // take horizontal scroll into account
      const relativeOffset = this.container.getBoundingClientRect().left - this.container.offsetLeft;
      return window.innerWidth / 2 - relativeOffset - 150;
    };
    // center pointer on div if wider than 480, otherwise center on screen
    const left = (window.innerWidth > 480) ? centerOnDiv() : centerOnScreen();
  
    const placement = this.getPlacement();
  
    const top = placement.includes('bottom')
      ? elementPosition.bottom + 2
      : elementPosition.top - this.container.scrollHeight;
    
    // allow consumer to specify an offset (side effect: this adds 'px' regardless)
    this.container.style.left = left + this.props.offsetX + 'px';
    this.container.style.top = top + this.props.offsetY + 'px';
  
    // push right if we are off-screen to the left
    const rect = this.contentContainer.getBoundingClientRect();
    if (rect.left < 0) {
      this.container.style.left = target.offsetLeft - rect.left + 'px';
    }
  };
  
  getPlacement = () => {
    if (this.props.disablePointer) {
      return '';
    }
    
    // get window geometry - this is how jQuery does it
    const rect = this.props.target.getBoundingClientRect(),
      isBottomHalf = rect.bottom - rect.height + 50 + window.pageYOffset > window.innerHeight/2,
      leftCenterLine = rect.left + rect.width/2 < window.innerWidth/2
    ;
    
    let placement;
    if (this.props.forceAbove) {
      placement = 'o-coach-mark--top';
    } else if (this.props.forceBelow) {
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
			<div ref={(node) => {this.container = node}} id={this.props.id} className="o-coach-mark__container"  style={{ zIndex: this.props.zIndex }}>
				<div ref={(node) => {this.contentContainer = node}} className="o-coach-mark__content-container">
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
					<div ref={(node) => {this.content = node}} className={`o-coach-mark__content ${placement}`}>
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

export default ComponentOwner;
