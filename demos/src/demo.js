/*global require*/

document.addEventListener('DOMContentLoaded', function() {
	const CoachMark = require('../../main');
	const bottom = document.getElementById('cm-bottom');
	const top = document.getElementById('cm-top');
	const left = document.getElementById('cm-left');
	const right = document.getElementById('cm-right');

	new CoachMark(bottom, {
		placement: 'bottom',
		title: 'Coach Mark Below Feature',
		text: 'Some text explaining to the user why you changed their interface'
	}, function () {
		console.log('Callback executed on exit');
	});

	new CoachMark(top, {
		placement: 'top',
		title: 'Coach Mark Above Feature',
		text: 'Some text explaining to the user why you changed their interface'
	}, function () {
		console.log('Callback executed on exit');
	});

	new CoachMark(left, {
		placement: 'left',
		title: 'Coach Mark Left of Feature',
		text: 'Some text explaining to the user why you changed their interface'
	}, function () {
		console.log('Callback executed on exit');
	});

	new CoachMark(right, {
		placement: 'right',
		title: 'Coach Mark Right of Feature',
		text: 'Some text explaining to the user why you changed their interface'
	}, function () {
		console.log('Callback executed on exit');
	});

});
