/* global describe it expect */

import React from 'react';
import {IntlProvider} from 'react-intl';
import TestUtils from 'react-addons-test-utils';
import ComponentOwner from '../src/js/component-owner';


describe('Component Owner Suite', () => {
  let renderer;
  let intlProvider;
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
    renderer = TestUtils.createRenderer();
    intlProvider = new IntlProvider({locale: 'en'}, {});
  });

  it('this is freaking stupid', () => {

    // const {intl} = intlProvider.getChildContext();
    const locale = 'en';
    const translations = {
      'en' : {}
    };
    let body = document.body;
    let element = body.appendChild(document.createElement('div'));
    let component;
    const container = TestUtils.renderIntoDocument(
     <IntlProvider locale={locale} messages={translations[locale]}>
       <ComponentOwner 
         ref={(c) => component = c.refs.wrappedInstance}
         removeCoachMark={() => { console.log('done'); }} 
         target={element} 
         opts={config.opts} 
         callback={config.callback} />
     </IntlProvider>
    );
    console.log(component);
    const exists = TestUtils.findRenderedDOMComponentWithClass(container, 'o-coach-mark__container');
    console.log(exists);
    // const exists = TestUtils.findRenderedDOMComponentWithClass(container, 'o-coach-mark__container');
    
    // const button = TestUtils.findRenderedDOMComponentWithTag(container, 'button');
    // const input =  TestUtils.findRenderedDOMComponentWithTag(container, 'input');
    // TestUtils.Simulate.click(button);
    expect(true).toBe(true);
  });

});
