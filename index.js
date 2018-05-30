import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import ComponentOwner from './src/js/component-owner';

import _ from 'lodash'
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
      target.parentNode.insertBefore(this.container, target.nextSibling);

      // check to see if any coaches are open, if they are, remove.
      _.forEach(coachAll, coach => {
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
      )
    } else {
      // if coachmark is rendered return
      return null
    }
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
  };
}
