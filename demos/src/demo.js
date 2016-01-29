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
		text: 'Some text explaining to the user why you changed their interface',
		id: '9834893498',
	}, function (id) {
		console.log('Callback executed on exit '+ id);
	});

	new CoachMark(top, {
		placement: 'top',
		title: 'Coach Mark Above Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '9837494320',
		hasNext:true
	}, function (id) {
		console.log('Callback executed on exit of ' + id);
	});

	new CoachMark(left, {
		like: true,
		placement: 'left',
		title: 'Coach Mark Left of Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '9892387492098',
		hasBack:true
	}, function (id) {
		console.log('Callback executed on exit '+ id);
	});

	new CoachMark(right, {
		like: true,
		placement: 'right',
		title: 'Coach Mark Right of Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '29874209280'
	}, function (id) {
		console.log('Callback executed on exit of ' + id);
	});

	document.addEventListener('o-cm-like-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
	document.addEventListener('o-cm-submit-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type + " and commented: " + event.data.payload));
	document.addEventListener('o-cm-cancel-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
	document.addEventListener('o-cm-backNext-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));

});
