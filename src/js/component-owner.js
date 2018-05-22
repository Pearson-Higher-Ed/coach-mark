import React, { Component, Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';

import PropTypes from 'prop-types';

class ComponentOwner extends Component {
  static propTypes = {
    target: PropTypes.object.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.string,
    onClose: PropTypes.func,
    srCloseText: PropTypes.string,
    animate: PropTypes.bool,
    gotIt: PropTypes.bool,
    gotItText: PropTypes.string,
    disableShadowing: PropTypes.bool,
    disablePointer: PropTypes.bool,
    showClose: PropTypes.bool,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    zIndex: PropTypes.number,
    forceAbove: PropTypes.bool,
    forceBelow: PropTypes.bool,
    forceRight: PropTypes.bool,
    forceLeft: PropTypes.bool,
    stopScroll: PropTypes.bool
  };

  static defaultProps = {
    gotItText: 'Got it',
    offsetX: 0,
    offsetY: 0,
    srCloseText: 'Close dialog',
    zIndex: 1200,
    type: 'default',
    animate: false,
    showClose: true,
    closeOnBodyClick: false,
    disableShadowing: true
  };

  constructor(props) {
    super(props);
    this.state = {
      animate: null
    };
    this.closeCoach = this.closeCoach.bind(this);
    this.closeOnBodyClick = this.closeOnBodyClick.bind(this);
  }
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
    if (this.props.animate === true) {
      this.setState({ animate: true });
    }

    if (this.props.closeOnBodyClick === true) {
      // set a split second timeout to avoid capture of click outside the coachmark
      setTimeout(() => {
        document.addEventListener('click', this.closeOnBodyClick);
      }, 1);
    }
    this.resetPosition();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetPosition);
    this.props.target.classList.remove('o-coach-mark__hole');

    if (this.props.closeOnBodyClick === true) {
      document.removeEventListener('click', this.closeOnBodyClick);
    }
  }

  closeOnBodyClick(event) {
    if (event.target.closest('.o-coach-mark__content-container') === null) {
      this.closeCoach();
    }
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
      horizontal_center =
        (elementPosition.right - elementPosition.left) / 2 +
        elementPosition.left;

    const centerOnDiv = () => {
      return (
        horizontal_center -
        (this.content.className.includes('-left') ? 60 : 280)
      );
    };

    const centerOnScreen = () => {
      // take horizontal scroll into account
      const relativeOffset =
        this.container.getBoundingClientRect().left - this.container.offsetLeft;
      return window.innerWidth / 2 - relativeOffset - 150;
    };
    // center pointer on div if wider than 480, otherwise center on screen
    const left = window.innerWidth > 480 ? centerOnDiv() : centerOnScreen();

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
      isBottomHalf =
        rect.bottom - rect.height + 50 + window.pageYOffset >
        window.innerHeight / 2,
      leftCenterLine = rect.left + rect.width / 2 < window.innerWidth / 2;

    let placement;
    if (this.props.forceAbove) {
      placement = 'o-coach-mark--top';
    } else if (this.props.forceBelow) {
      placement = 'o-coach-mark--bottom';
    } else if (this.props.forceRight) {
      placement = 'o-coach-mark--right';
    } else if (this.props.forceLeft) {
      placement = 'o-coach-mark--left';
    } else {
      placement = isBottomHalf ? 'o-coach-mark--top' : 'o-coach-mark--bottom';
    }
    if (leftCenterLine) {
      return `${placement}-left`;
    }
    return placement;
  };

  closeCoach() {
    if (this.props.animate === true) {
      this.setState({ animate: false });
      setTimeout(() => {
        this.props.onClose();
      }, 500);
    } else {
      this.props.onClose();
    }
  }

  render() {
    const placement = this.getPlacement();
    return (
      <Fragment>
        <div
          ref={node => {
            this.container = node;
          }}
          id={this.props.id}
          className={
            this.state.animate === true
              ? 'o-coach-mark__container animated fadeIn'
              : this.state.animate === false
                ? 'o-coach-mark__container animated fadeOut'
                : 'o-coach-mark__container'
          }
          style={{ zIndex: this.props.zIndex }}
        >
          <div
            ref={node => {
              this.contentContainer = node;
            }}
            className={
              this.props.type === 'info'
                ? 'o-coach-mark__content-container info'
                : this.props.type === 'generic'
                  ? 'o-coach-mark__content-container generic'
                  : 'o-coach-mark__content-container default'
            }
          >
            {this.props.showClose ? (
              <button
                type="button"
                className="o-coach-mark__close-icon"
                onClick={this.closeCoach}
              >
                <svg
                  role="img"
                  aria-labelledby="r2"
                  focusable="false"
                  className="pe-icon--remove-sm-18"
                >
                  <title id="r2">{this.props.srCloseText}</title>
                  <use xlinkHref="#remove-sm-18" />
                </svg>
              </button>
            ) : (
              <div />
            )}
            <div
              ref={node => {
                this.content = node;
              }}
              className={`o-coach-mark__content ${placement}`}
            >
              <div className="o-coach-mark__title pe-label--bold">
                {ReactHtmlParser(this.props.title)}
              </div>
              <p className="o-coach-mark__paragraph pe-label">
                {ReactHtmlParser(this.props.text)}
              </p>
              {this.props.gotIt && (
                <button
                  className="o-coach-mark__got-it pe-label"
                  onClick={this.closeCoach}
                >
                  {ReactHtmlParser(this.props.gotItText)}
                </button>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default ComponentOwner;
