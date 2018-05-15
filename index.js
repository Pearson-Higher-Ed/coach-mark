import React from 'react';
import ReactDOM from 'react-dom';
import ComponentOwner from './src/js/component-owner';

export default class CoachMark {

  constructor(config) {
    this.config = config;
    const target = document.getElementById(config.elementId);
    this.container = document.createElement('div');
    target.parentNode.insertBefore(this.container, target.nextSibling);

    ReactDOM.render(
      <ComponentOwner
        target={target}
        onClose={this.removeCoachMark}
        {...config.opts}
      />,
      this.container
    );
  }

  removeCoachMark = (event) => {
    if (!('remove' in Element.prototype)) {
      Element.prototype.remove = function() {
        if (this.parentNode) {
          this.parentNode.removeChild(this);
        }
      };
    }
    ReactDOM.unmountComponentAtNode(this.container);
    this.container.remove();
    if (this.config.callback) {
      this.config.callback(this.config.opts.id, event);
    }
  }

}
