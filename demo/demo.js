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
      text: 'Assuming the consumer only passes in .title and .text',
    }
  });
};

export const showSecond = () => {
  new CoachMark({
    elementId: 'demo-target2',
    opts: {
      title: 'Coach Mark Above',
      text: 'Consumer passes in .forceAbove, .disableShadowing, and .gotIt',
      gotIt: true,
      forceAbove: true,
      disableShadowing: true
    }
  });
};

export const showThird = () => {
  new CoachMark({
    elementId: 'demo-target3',
    opts: {
      title: 'Coach Mark w/No Pointer',
      text: 'Consumer passes in .disablePointer and a callback',
      disablePointer: true,
    },
    callback: () => showFirst()
  });
};