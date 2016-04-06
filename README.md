# o-coach-mark [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/o-coach-mark.svg?branch=master)](https://travis-ci.org/Pearson-Higher-Ed/o-coach-mark)

Simple popover to explain new features to users

## API

### Constructor

`CoachMark(element, opts, callback)`

Initializes coach mark pointing to the specified element, given an options object, 
with a callback to be executed when the user dismisses the coach mark.  

```

Options are the following

Option    | Type    | Required | Notes
--------------------------------------
like      | boolean | no       | determines if this coachmark will show Like/Dislike links
title     | text    | no       |
text      | text    | yes      |
srText    | text    | no       | The screen reader text that calls out the close button (default is "close this coach mark")
id        | text    | yes      | unique identifier
hasBack	  | boolean	| no       | determines if this coachmark will have back coachmark
hasNext	  | boolean | no       | determines if this coachmark will have next coachmark	
currentCM | text	| no       | keeps track of current coachmark where the user navigated
totalCM	  | text    | no       | keeps track of total number of coachmarks 

```

For the like/dislike links, listen for an event called 'o-cm-like-clicked' and you will get a data
object identifying which link was clicked.

For the back/next buttons, listen for an event called 'o-cm-backNext-clicked' and you will get a data object identifying which link was clicked.

For the feedback feature, listen to an event called 'o-cm-submit-clicked' and you will get a data object identifying the id and the feedback text.

If the user clicks the cancel link, the event called 'o-cm-cancel-clicked' is fired.

See the Origami Demo to see the features in action.

#### Use

```js
const element = document.getElementById('awesome_featureId');

new CoachMark(element, {
	like: false,
	hasBack/hasNext: true,
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

## License

This software is published by Pearson Education under the [MIT license](LICENSE).
