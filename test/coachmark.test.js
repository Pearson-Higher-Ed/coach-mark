import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import CoachMark from '../src/js/component-owner';


describe('Component Owner Suite', () => {
  let renderer;
  let config = {
    opts: {
      title: 'Coach Mark Above Feature',
      text: 'Some text explaining to the user why you changed their interface',
      id: '9837494320',
      currentCM: '1',
      totalCM: '2'
    },
    callback: function() {
      console.log('callback');
    }
  };

  beforeEach(() => {
    renderer = createRenderer();
  });

  it('should render component', () => {

    let body = document.body;
    let element = body.appendChild(document.createElement('div'));
    let component;
    const container = renderer.render(
       <CoachMark
         ref={(c) => component = c.refs.wrappedInstance}
         removeCoachMark={() => { console.log('done'); }}
         target={element}
         opts={config.opts}
         callback={config.callback} />
    );

    expect(true).toBe(true);
  });

});
