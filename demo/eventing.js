import ReactDOM from 'react-dom';
import React    from 'react';

import { default as Component } from '../index';


document.body.addEventListener('o.InitComponent', e => {
  ReactDOM.render(
    React.createElement(Component, e.detail.props, e.detail.props.children)
    , document.getElementById(e.detail.elementId)
  );
});
