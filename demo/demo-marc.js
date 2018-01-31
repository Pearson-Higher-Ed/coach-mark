import { CoachMark } from '../index';

// When available on npm, consumer usage would be similar to:
// import CoachMark from '@pearson-components/[component-name]'

function init() {
  // Demo direct API
  new CoachMark({
    elementId: 'top',
    opts: {
      title: 'Coach Mark below feature /w Got It',
      text: 'Some text explaining to the user why you changed their interface',
      gotIt: true,
      disableShadowing: true,
      id: '9834893449'
    },
    callback: function (id) {
      new CoachMark({
        elementId: 'cm-left',
        opts: {
          title: 'Coach Mark above feature',
          text: 'Some text explaining to the user why you changed their interface',
          gotItText: 'Custom gotItText',
          gotIt: true,
          forceAbove: true,
          disableShadowing: true,
          id: '9834893498'
        },
        callback: function() {
          new CoachMark({
            elementId: 'cm-right-1',
            opts: {
              title: 'Coach Mark above feature',
              text: 'Some text explaining to the user why you changed their interface',
              nextText: 'Next',
              id: '9837494320',
              currentCM: '1',
              totalCM: '2',
              disableShadowing: true,
              stopScroll: true
            },
            callback: function() {
              new CoachMark({
                elementId: 'cm-left-1',
                opts: {
                  title: 'Coach Mark top left feature',
                  text: 'Some text explaining to the user why you changed their interface',
                  nextText: 'Next',
                  id: '9837494321',
                  currentCM: '1',
                  totalCM: '2'
                },
                callback: function() {
                  new CoachMark({
                    elementId: 'cm-bottom',
                    opts: {
                      like: true,
                      title: 'No pointer. This is a long title that wraps three lines and looks fine wooo!',
                      text: 'Some text explaining to the user why you changed their interface',
                      id: '9892387492098',
                      previousText: 'previous',
                      currentCM: '2',
                      totalCM: '2',
                      disablePointer: true
                    },
                    callback: function() {
                      new CoachMark({
                        elementId: 'cm-bottom',
                        opts: {
                          like: true,
                          title: 'No pointer. This is a long title that wraps three lines and looks fine wooo!',
                          text: 'Some text explaining to the user why you changed their interface',
                          id: '9892387492098',
                          currentCM: '2',
                          totalCM: '3',
                          disablePointer: true,
                          nextText: 'ncustom',
                          previousText: 'pcustom'
                        },
                        callback: function() {
                          new CoachMark({
                            elementId: 'cm-bottom',
                            opts: {
                              title: 'overridden prev and next text',
                              text: 'Previous and Next text has been overridden with localized text',
                              previousText: 'go back',
                              nextText: 'go forward',
                              id: '9892387492098a',
                              currentCM: '2',
                              totalCM: '3'
                            },
                            locale: 'fr',
                            callback: function() {
                              console.log('here');
                              console.log('Callback executed on exit '+ id);
                              // Demo eventing API
                              document.body.dispatchEvent(new CustomEvent('o.InitCoachMark', {
                                detail: {
                                  elementId: 'top',
                                  opts: {
                                    title: 'Eventing API.',
                                    text: 'This demos the Event API - see demo.js file',
                                    id: 'lskdjflkjsd',
                                    disableShadowing: true,
                                    offsetX: 50,
                                    offsetY: 50
                                  },
                                  callback: function () {
                                    "use strict";
                                    console.log('api closed');
                                  }
                                }
                              }));
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });

}

window.onload = init;
