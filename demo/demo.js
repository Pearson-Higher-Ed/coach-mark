import React     from 'react';
import ReactDOM  from 'react-dom';
import { CoachMark } from '../index';

// import { addLocaleData, IntlProvider } from 'react-intl';
//
// // Import Translations...
// import frJson       from './translations/fr.json';
// import frLocaleData from 'react-intl/locale-data/fr';
//
// import enUSJson       from './translations/en-US.json';
// import enUSLocaleData from 'react-intl/locale-data/en';
//
// // Associate Language Abbreviation with json filename...
// const translations = {
//   'fr'    : frJson,
//   'en-US' : enUSJson
// };
//
// // Add Language
// addLocaleData(frLocaleData);
// addLocaleData(enUSLocaleData);
//
// // Determining the User's Locale
// const locale = (navigator.language) ? navigator.language : navigator.browserLanguage;

export const showFirst = () => {
  ReactDOM.render(
    <CoachMark
      targetId="demo-target1"
      title="Coach Mark auto-positioned"
      text="Some text explaining to the user why you changed their interface"
      id="demo-coachmark-1"
      onClose={() => ReactDOM.unmountComponentAtNode(document.getElementById('coachmark-container'))}
    />,
    document.getElementById('coachmark-container')
  );
};

