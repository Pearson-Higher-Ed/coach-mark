import CoachMark from '../index';

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
  new CoachMark({
    elementId: 'demo-target1',
    opts: {
      title: 'Default Coach Mark',
      text: 'Some text explaining to the user why you changed their interface',
      disablePointer: true,
      forceAbove: true,
      disableShadowing: true
    }
  });
};

export const showSecond = () => {
  new CoachMark({
    elementId: 'demo-target2',
    opts: {
      title: 'Default Coach Mark',
      text: 'Some text explaining to the user why you changed their interface',
      forceAbove: true,
      disableShadowing: true
    }
  });
};

