/* global describe it expect */

import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import {IntlProvider} from 'react-intl';
import TestUtils from 'react-addons-test-utils';
import ComponentOwner from '../src/js/component-owner';

expect.extend(expectJSX);

describe('Component Owner Suite', () => {
  let renderer;
  let intlProvider;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
    intlProvider = new IntlProvider({locale: 'en'}, {});
  });

  it('shallowly renders the component owner using React TestUtils', () => {

    const {intl} = intlProvider.getChildContext();
    const targetData = {
      elementId: 'test-target',
      greeting: 'Hello world!'
    };

    renderer.render(
      <ComponentOwner.WrappedComponent
        data={targetData}
        intl={intl} />
      , {intl}
    );

    expect(renderer.getRenderOutput()).toEqualJSX(
      <div className="pe-inlineblock"><button className="pe-btn pe-btn--primary" onClick={function noRefCheck() {}}>say hello</button>
        &nbsp;
        <span className="pe-input"><input type="text" value="" placeholder="placeholder" /></span>
      </div>
    );
  });

  it('renders the correct text when the button is clicked, in a document provided by jsdom', () => {

    const {intl} = intlProvider.getChildContext();
    const targetData = {
      elementId: 'test-target',
      greeting: 'Hello test!'
    };
    const locale = 'en';
    const translations = {
      'en' : {}
    };

    const container = TestUtils.renderIntoDocument(<IntlProvider locale={locale} messages={translations[locale]}><ComponentOwner data={targetData} intl={intl} /></IntlProvider>);
    const button = TestUtils.findRenderedDOMComponentWithTag(container, 'button');
    const input =  TestUtils.findRenderedDOMComponentWithTag(container, 'input');
    TestUtils.Simulate.click(button);
    expect(input.value).toEqual('Hello test!');
  });

});
