/*global require*/

document.addEventListener('DOMContentLoaded', function() {
	const CoachMark = require('../../main');
	const bottom = document.getElementById('cm-bottom');
	const top = document.getElementById('cm-top');
	const left = document.getElementById('cm-left');
	const right = document.getElementById('cm-right');

	new CoachMark(right, {
		placement: 'right',
		title: 'Coach Mark Below Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '9834893498',
		hasNext: true
	}, function() {
		console.log('Callback executed on exit');
	});
	new CoachMark(bottom, {
		placement: 'bottom',
		title: 'Coach Mark Below Feature',
		text: 'Some text explaining to the user why you changed their interface',
	}, function() {
		console.log('Callback executed on exit');
	});
	new CoachMark(left, {
		placement: 'left',
		title: 'Coach Mark Below Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '9834893400',
		hasBack: true
	}, function() {
		console.log('Callback executed on exit');
	});
	document.addEventListener('o-cm-backNext-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
});
