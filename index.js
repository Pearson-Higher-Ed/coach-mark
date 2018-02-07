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
        targetId={config.elementId}
        onClose={this.removeCoachMark}
        {...config.opts}
      />,
      this.container
    );
  }
  
  removeCoachMark = (event) => {
    if (this.config.callback) {
      this.config.callback(this.config.opts.id, event);
    }
    ReactDOM.unmountComponentAtNode(this.container);
    this.container.remove();
  }

}
//
// For events, use the Origami naming convention of pre-pending with 'o.'
//
//document.body.addEventListener('o.InitCoachMark', e => new CoachMark(e.detail));
