import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import ComponentOwner from './src/js/component-owner';

export default class CoachMark {
  constructor(config) {
    this.config = config;
    const target = document.getElementById(config.elementId);

    // check to see how many coachmarks with the data id exist in the document
    const coachId = '[data-id="' + config.elementId + '"]';
    const coachEl = document.querySelectorAll(coachId);
    const coachAll = document.querySelectorAll('[data-id]');

    // if no coachmarks exist render
    if (coachEl.length === 0) {
      this.container = document.createElement('div');
      this.container.setAttribute('data-id', config.elementId);

      // Fix for positioning in a container that position:relative and overflow:scroll or overflow:hidden
      // move the node to the body tag instead of inside the parent container.
      // target.parentNode.insertBefore(this.container, target.nextSibling);
      document.body.appendChild(this.container);

      // check to see if any coaches are open, if they are, remove.
      Array.prototype.forEach.call(coachAll, coach => {
        ReactDOM.unmountComponentAtNode(coach);
        coach.remove();
      });

      ReactDOM.render(
        <ComponentOwner
          target={target}
          onClose={this.removeCoachMark}
          {...config.opts}
        />,
        this.container
      );
    } else {
      // if coachmark is rendered return
      return null;
    }
  }

  removeCoachMark = event => {
    ReactDOM.unmountComponentAtNode(this.container);
    this.container.remove();
    if (this.config.callback) {
      this.config.callback(this.config.opts.id, event);
    }
  };
}
