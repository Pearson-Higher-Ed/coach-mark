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
	hasBack: {
		element: left,
		opts: {
			placement: 'left',
			title: 'Coach Mark Below Feature',
			text: 'Some text explaining to the user why you changed their interface',
			hasBack: {
				element: right,
				opts: {
					placement: 'right',
					title: 'Coach Mark Right Feature',
					text: 'Some text explaining to the user why you changed their interface',
				hasBack: {
				element: top,
				opts: {
					placement: 'top',
					title: 'Coach Mark Top Feature ',
					text: 'Some text explaining to the user why you changed their interface'
						}
					}
				}
			},
			hasNext: {
				element: left,
				opts: {
					placement: 'left',
					title: 'Coach Mark Left Feature ',
					text: 'Some text explaining to the user why you changed their interface'
				}
			}
		}
	},
	hasNext: {
		element: bottom,
		opts: {
			placement: 'bottom',
			title: 'Coach Mark Below Feature inside parent hasnext',
			text: 'Some text explaining to the user why you changed their interface',
			hasBack: {
				element: left,
				opts: {
					placement: 'top',
					title: 'Coach Mark Below Feature inside child hasback of parent hasnext',
					text: 'Some text explaining to the user why you changed their interface'
				}
			},
			hasNext: {
				element: left,
				opts: {
					placement: 'left',
					title: 'Coach Mark Left Feature ',
					text: 'Some text explaining to the user why you changed their interface'
				}
			}
		}
	}
	}, function () {
		console.log('Callback executed on exit');
	});
});
