// Use jsdom as an in-JavaScript implementation of the DOM. That means we don’t have to capture a browser in order to
// unit test, a la Karma. This script is loaded by Mocha at run-time.
// Credit for this script goes to http://jaketrent.com/post/testing-react-with-jsdom/.

import jsdom from 'jsdom';

// setup the simplest document possible
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// get the window object out of the document
const win = doc.defaultView;

// set globals for mocha that make access to document and window feel 
// natural in the test environment
global.document = doc;
global.window = win;

// take all properties of the window object and also attach it to the 
// mocha global object
propagateToGlobal(win);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  }
}
