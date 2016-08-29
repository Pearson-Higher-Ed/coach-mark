//
// Change all references to 'MyComponent' in this file to your real component name!
//

// bundled component styling
import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import ComponentOwner from './src/js/component-owner';

// i18n, set up for French out-of-the-box
import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import frJson from './translations/fr.json';
const translations = {
	'fr' : frJson
};

export default class CoachMark {

	constructor(config) {

		addLocaleData(frLocaleData);
		if (!config.opts.id) {
            throw new Error('missing required option: you must specify a unique id for the coach mark')
        }

        if (config.opts.currentCM !== undefined && config.opts.totalCM === undefined) {
            throw new Error('you must include totalCM if currentCM is specified')
        }

        if (config.opts.gotIt && config.opts.totalCM) {
            throw new Error('cannot display "Got it" along with numbered coach marks (totalCM)')
        }
		this.init(config);
	}

	removeCoachMark() {
        this.container.parentElement.removeChild(this.container);
	}

	init(config) {

		const locale = config.locale ? config.locale : 'en';
		const dom = document.getElementById(config.elementId);
		this.container = document.createElement('div');
		dom.parentNode.insertBefore(this.container, dom.nextSibling);

		ReactDOM.render(
			<IntlProvider locale={locale} messages={translations[locale]}>
				<ComponentOwner 
					removeCoachMark={() => this.removeCoachMark()} 
					target={dom} 
					element={this.container}
					opts={config.opts} 
					callback={config.callback} />
			</IntlProvider>,
			this.container
		);
	}

}

//
// For events, use the Origami naming convention of pre-pending with 'o.'
//
document.body.addEventListener('o.InitCoachMark', e => new CoachMark(e.detail));
