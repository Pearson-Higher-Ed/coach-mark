/*eslint-env node*/

module.exports = {
	options: {
		sass: 'demos/src/demo.scss',
		js: 'demos/src/demo.js'
	},
	demos: [
		{
			name: 'demo',
			template: 'demos/src/demo.mustache'
		}
	]
};
