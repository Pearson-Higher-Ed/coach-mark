import CoachMark from '../index';

export const showFirst = () => {
  new CoachMark({
    elementId: 'demo-target1',
    opts: {
      title: 'Default Coach Mark',
      text: 'Assuming the consumer only passes in .title and .text'

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
      disableShadowing: false
    }
  });
};

export const showThird = () => {
  new CoachMark({
    elementId: 'demo-target3',
    opts: {
      title: 'Coach Mark w/No Pointer',
      text: 'Consumer passes in .disablePointer and a callback that shows another coach-mark',
      gotIt: true,
      disablePointer: true
    },
    callback: () => {
      new CoachMark({
        elementId: 'demo-target3',
        opts: {
          text: 'You closed it the coach-mark.  Great job!',
          forceBelow: true
        }
      })
    }
  });
};

export const showFourth = () => {
  new CoachMark({
    elementId: 'demo-target4',
    opts: {
      title: '<h4>Coach Wrapped in h4 HTML tags</h4>',
      text: '<a href="#">Text that is a clickable link</a>'
    }
  });
};

export const showFifth = () => {
  new CoachMark({
    elementId: 'demo-target5',
    opts: {
      title: 'Information Coach Mark',
      text: 'Consumer passes in the type: info',
      type: 'info'
    }
  });
};

export const showSixth = () => {
  new CoachMark({
    elementId: 'demo-target6',
    opts: {
      title: 'Generic Coach Mark',
      text: 'Consumer passes in the type: generic',
      type: 'generic',
      gotIt: true
    }
  });
};

export const showSeventh = () => {
  new CoachMark({
    elementId: 'demo-target7',
    opts: {
      title: 'Coach Mark Animation',
      text: 'Consumer passes in animate: true',
      gotIt: true,
      disablePointer: true,
      animate: true
    },
    callback: () => {
      new CoachMark({
        elementId: 'demo-target7',
        opts: {
          text: 'Yay.  Great job!',
          animate: true
        }
      })
    }
  });
};

export const showEighth= () => {
  new CoachMark({
    elementId: 'demo-target8',
    opts: {
      title: 'Coach Mark Without an X',
      text: 'Consumer passes in showClose: false',
      gotIt: true,
      showClose: false
    }
  });
};

export const showNinth= () => {
  new CoachMark({
    elementId: 'demo-target9',
    opts: {
      title: 'Coach Mark can close when clicked outside the target area, and scrolls the area.',
      text: 'Consumer passes in closeOnBodyClick: true',
      closeOnBodyClick: true,
      stopScroll : false
    }
  });
};

export const showTenth= () => {
  new CoachMark({
    elementId: 'demo-target10',
    opts: {
      title: 'Coach Mark appears to the right of the container',
      text: 'Consumer passes in forceRight: true',
      forceRight: true
    }
  });
};

export const showEleventh= () => {
  new CoachMark({
    elementId: 'demo-target11',
    opts: {
      title: 'Coach Mark appears to the left of the container',
      text: 'Consumer passes in forceLeft: true',
      forceLeft: true
    }
  });
};

export const showTwelveth= () => {
  new CoachMark({
    elementId: 'demo-target12',
    opts: {
      title: 'Coach Mark appears outside a scrolling container',
      text: 'See the CSS on the parent containers',
      forceBelow:true
    }
  });
};
