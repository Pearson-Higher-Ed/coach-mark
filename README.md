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

```

Options are the following

Option    | Type    | Required | Notes
--------------------------------------
like      | boolean | no       | determines if this coachmark will show Like/Dislike links
title     | text    | no       | The title
text      | text    | yes      | The body of the coach mark
srText    | text    | no       | The screen reader text that calls out the close button (default is "close this coach mark")
id        | text    | yes      | unique identifier - can be anything as long as no other id has this value
currentCM | text	| no       | keeps track of current coachmark where the user navigated
totalCM	  | text    | no       | keeps track of total number of coachmarks

```

For the like/dislike links, listen for an event called 'o-cm-like-clicked' and you will get a data
object identifying which link was clicked.

For the back/next buttons, listen for an event called 'o-cm-backNext-clicked' and you will get a data object identifying which link was clicked.

For the feedback feature, listen to an event called 'o-cm-submit-clicked' and you will get a data object identifying the id and the feedback text.

If the user clicks the cancel link, the event called 'o-cm-cancel-clicked' is fired.

See the Origami Demo to see the features in action.

#### Example Usage

```js
const element = document.getElementById('awesome_featureId');

new CoachMark(element, {
	like: false,
	hasBack: true,
	hasNext: true,
	currentCM: '2',
	totalCM: '2',
	placement: 'bottom',
	title: 'Optional Title',
	text: 'Required text explaining to the user why you changed their interface'
}, function (id) {
	console.log('Callback executed on exit of id:' + id);
});

document.addEventListener('o-cm-like-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
document.addEventListener('o-cm-backNext-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
document.addEventListener('o-cm-submit-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type + " and commented: " + event.data.payload));
document.addEventListener('o-cm-cancel-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));

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
