/*global require*/
import './demo.scss';
import CoachMark from '../../main';

document.addEventListener('DOMContentLoaded', function() {

	new CoachMark(document.getElementById('top'), {
		title: 'Coach Mark Below Feature with Got It',
		text: 'Some text explaining to the user why you changed their interface',
		gotIt: true,
		id: '9834893449'
	}, function (id) {
		new CoachMark(document.getElementById('cm-left'), {
			title: 'Coach Mark Below Feature',
			text: 'Some text explaining to the user why you changed their interface',
			id: '9834893498'
		}, function (id) {
			new CoachMark(document.getElementById('cm-right-1'), {
				title: 'Coach Mark Above Feature',
				text: 'Some text explaining to the user why you changed their interface',
				id: '9837494320',
				currentCM: '1',
				totalCM: '2'
			}, function (id) {
				new CoachMark(document.getElementById('cm-bottom'), {
					like: true,
					title: 'No pointer. This is a long title that wraps three lines wraps three lines and looks fine',
					text: 'Some text explaining to the user why you changed their interface',
					id: '9892387492098',
					currentCM: '2',
					totalCM: '2',
					disablePointer: true
				}, function (id) {
					console.log('Callback executed on exit '+ id);
					// Demo eventing API
					const element = document.getElementById('top');
					document.body.dispatchEvent(new CustomEvent('o.InitCoachMark', {
						detail: {
							element: element,
							opts: {
								title: 'Eventing API. Also, no shadow box.',
								text: 'This demos the Event API - see demo.js file',
								id: 'lskdjflkjsd',
								disableShadow: true,
								offsetX: 50,
								offsetY: 50
							},
							callback: function (id) {
								"use strict";
								console.log('api closed');
							}
						}
					}));

				});
			});
		});
	});



	document.addEventListener('o-cm-like-clicked', (event) => {
		console.log("user clicked " + event.data.id + " " + event.data.type)
	});
	document.addEventListener('o-cm-submit-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type + " and commented: " + event.data.payload));
	document.addEventListener('o-cm-cancel-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
	document.addEventListener('o-cm-previous-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
	document.addEventListener('o-cm-next-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
});
