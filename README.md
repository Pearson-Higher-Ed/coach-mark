# coach-mark [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/coach-mark.svg?branch=master)](https://travis-ci.org/Pearson-Higher-Ed/coach-mark)

Simple popover to explain new features to users

## Usage

## How to Consume in an Application

Platform requirements: npm 2+ and the [Elements SDK](https://www.npmjs.com/package/pearson-elements)

	> npm i --save @pearson-components/coach-mark

### Constructor

`CoachMark(element, opts, callback)`

Initializes coach mark pointing to the specified element, given an options object,
with a callback to be executed when the user dismisses the coach mark.  

Special Case: Have a wrapper div as a specified element if the coachmark pointing element is not a block level element,this 
will allow to adjust css in cases of long texts that needs to be wrapped on two lines and still have proper highlight in smaller screens or mobile views.

```

Options are the following

Option         | Type    | Required | Notes
-------------------------------------------
title          | text    | no       | The title
text           | text    | yes      | The body of the coach mark
srText         | text    | no       | The screen reader text that calls out the close button (default is "close this coach mark")
id             | text    | yes      | unique identifier - can be anything as long as no other HTML element has this value as an id
currentCM      | text    | no       | keeps track of current coachmark where the user navigated
totalCM        | text    | no       | keeps track of total number of coachmarks
offsetX        | int     | no       | moves the mark left/right
offsetY        | int     | no       | moves the mark up/down
disableShadow  | boolean | no       | Prevents the darkening of the rest of the page when an element is highlighted. Default is false
disablePointer | boolean | no       | Disables the pointer which indicates which element the coach mark is attached to. Default is false
gotIt          | boolean | no       | display "Got it" on bottom-right
previousText   | text    | no       | Overrides the "previous" text
nextText       | text    | no       | Overrides the "next" text
gotItText      | text    | no       | Overrides the "Got it" text
closeText      | text    | no       | Overrides the "close" text
zIndex		   | int     | no       | keeps coachmark on top or below other HTML elements,based on the requirement.Default is 1010 
locale		   | string  | no 		| Set the language for coach mark (only fr and english right now)

```

For the back/next buttons, listen for an event called 'o-cm-previous-clicked' and 'o-cm-next-clicked' and you will get a data object identifying which link was clicked.

See the Demo to see the features in action.

```sh
$ npm run dev
```

If the coach mark is attached to a div that has an ancestor that is opacity < 1, then it should be reset to 1 prior to
displaying the coach mark and return to original opacity in the close callback function.


#### Example Usage

```js
const element = document.getElementById('awesome_featureId');

new CoachMark({
	elementId: 'id of element to attach to'
	currentCM: '2',
	totalCM: '2',
	title: 'Optional Title',
	text: 'Required text explaining to the user why you changed their interface',
	id: 23098402384,
	locale: 'internationalization'
}, function (id) {
	console.log('Callback executed on exit of id:' + id);
});

document.addEventListener('o-cm-previous-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
document.addEventListener('o-cm-next-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));

```


## Contributing

### Quick Start

See the project working before changing anything!

In your local repo:

    npm install
    npm run dev

Navigate to **localhost:8081/demo** - the bundle is served in memory, which is why you may not see the file in /build.

**Hot module replacement** is activated in the webpack dev server; saved changes to src are automatically reloaded in the
browser.

### Test

The project is wired to unit test with Karma launching the tests against PhantomJS.

	npm test

## License

This software is published by Pearson Education under the [MIT license](LICENSE).


## Next Step

If you are a consumer of this component, see guidance on [usage](README.usage.md).

If you are a contributor to this component's development, see guidance on [contributing](README.contribute.md).
