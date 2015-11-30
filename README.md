# o-coach-mark [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/o-coach-mark.svg?branch=master)](https://travis-ci.org/Pearson-Higher-Ed/o-coach-mark)

Simple popover to explain new features to users

## API

### Constructor

`CoachMark(element, opts, callback)`

Initializes coach mark pointing to the specified element, given an options object, with a callback to be executed when the user dismisses the coach mark.  

#### Use

```js
const element = document.getElementById('awesome_featureId');

new CoachMark(element, {
	placement: 'bottom',
	title: 'Optional Title',
	text: 'Required text explaining to the user why you changed their interface'
}, function () {
	console.log('Callback executed on exit');
});
```

## License

This software is published by Pearson Education under the [MIT license](LICENSE).
