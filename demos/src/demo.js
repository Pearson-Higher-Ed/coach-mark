/*global require*/

document.addEventListener('DOMContentLoaded', function() {
	const CoachMark = require('../../main');
	new CoachMark(document.getElementById('top'), {
		title: 'Coach Mark Below Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '9834893449'
	}, function (id) {
		console.log('Callback executed on exit '+ id);
	});

	new CoachMark(document.getElementById('cm-left'), {
		title: 'Coach Mark Right of Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '9834893498'
	}, function (id) {
		console.log('Callback executed on exit '+ id);
	});

	new CoachMark(document.getElementById('cm-right-1'), {
		title: 'Coach Mark Left of Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '9837494320',
		currentCM: '1',
		totalCM: '2',
		hasNext:true
	}, function (id) {
		console.log('Callback executed on exit of ' + id);
	});

	new CoachMark(document.getElementById('cm-bottom'), {
		like: true,
		title: 'Coach Mark Above Feature',
		text: 'Some text explaining to the user why you changed their interface',
		id: '9892387492098',
		currentCM: '2',
		totalCM: '2',
		hasBack:true
	}, function (id) {
		console.log('Callback executed on exit '+ id);
	});


	////Disabling back button for the left placement coachmark just for the demo purposes
	//document.evaluate('/html/body/div[3]/div/div/div/div[2]/button[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.disabled = true;
	////Disabling next button for the top placement coachmark just for the demo purposes
	//document.evaluate('/html/body/div[4]/div/div/div/div[2]/button[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.disabled = true;
	//document.addEventListener('o-cm-like-clicked', (event) => {
	//	console.log("user clicked " + event.data.id + " " + event.data.type)
	//});
	//document.addEventListener('o-cm-submit-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type + " and commented: " + event.data.payload));
	//document.addEventListener('o-cm-cancel-clicked', (event) => console.log("user clicked " + event.data.id + " " + event.data.type));
	//document.addEventListener('o-cm-backNext-clicked', (event) => {
	//	//hiding the coachmarks for demo purposes
	//	(() => {
	//		if (event.data.type === 'nextButton') {
	//			return document.evaluate('/html/body/div[3]/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.visibility = 'hidden';
	//		}
	//		return document.evaluate('/html/body/div[4]/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.visibility = 'hidden';
	//	})(event.data.type);
	//	console.log("user clicked " + event.data.id + " " + event.data.type);
	//});
});

