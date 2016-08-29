import MyComponent from '../main'; // to demo direct API usage

// When available on npm, consumer usage would be similar to:
// import MyComponent from '@pearson-components/[component-name]'

function init() {
  // Demo direct API
  new MyComponent({
    elementId: 'top',
    opts: {
      title: 'Coach Mark Below Feature with Got It',
      text: 'Some text explaining to the user why you changed their interface',
      gotIt: true,
      zIndex: 994,
      id: '9834893449'
    },
    callback: function (id) {
      new MyComponent({
        elementId: 'cm-left',
        opts: {
          title: 'Coach Mark Below Feature',
          text: 'Some text explaining to the user why you changed their interface',
          id: '9834893498'
        },
        callback: function() {
          new MyComponent({
            elementId: 'cm-right-1',
            opts: {
              title: 'Coach Mark Above Feature',
              text: 'Some text explaining to the user why you changed their interface',
              id: '9837494320',
              currentCM: '1',
              totalCM: '2'
            },
            callback: function() {
              new MyComponent({
                elementId: 'cm-left-1',
                opts: {
                  title: 'Coach Mark top left Feature',
                  text: 'Some text explaining to the user why you changed their interface',
                  id: '9837494321',
                  currentCM: '1',
                  totalCM: '2'
                },
                callback: function() {
                  new MyComponent({
                    elementId: 'cm-bottom',
                    opts: {
                      like: true,
                      title: 'No pointer. This is a long title that wraps three lines wraps three lines and looks fine',
                      text: 'Some text explaining to the user why you changed their interface',
                      id: '9892387492098',
                      currentCM: '2',
                      totalCM: '2',
                      disablePointer: true
                    },
                    callback: function() {
                      new MyComponent({
                        elementId: 'cm-bottom',
                        opts: {
                          like: true,
                          title: 'No pointer. This is a long title that wraps three lines wraps three lines and looks fine',
                          text: 'Some text explaining to the user why you changed their interface',
                          id: '9892387492098',
                          currentCM: '2',
                          totalCM: '3',
                          disablePointer: true,
                          nextText: 'ncustom',
                          previousText: 'pcustom'
                        },
                        callback: function() {
                          new MyComponent({
                            elementId: 'cm-bottom',
                            opts: {
                              title: 'overridden prev and next text',
                              text: 'Previous and Next text has been overridden with localized text',
                              id: '9892387492098a',
                              currentCM: '2',
                              totalCM: '3',
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
                                    title: 'Eventing API. Also, no shadow box.',
                                    text: 'This demos the Event API - see demo.js file',
                                    id: 'lskdjflkjsd',
                                    disableShadowing: true,
                                    offsetX: 50,
                                    offsetY: 50
                                  },
                                  callback: function (id) {
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
