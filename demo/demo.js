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
      elementId="demo-target1"
      title="This is my title"
      text="This is the text"
      gotIt={true}
      disableShadowing={true}
      disablePointer={true}
      id="first-coachmark-id"
      callback={() => alert('Toodles!')}
    />,
    document.getElementById('coachmark-container')
  );
};

