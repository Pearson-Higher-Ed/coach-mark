import CoachMark from '../index';

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
      text: 'Consumer passes in .disablePointer and a callback that shows the first coach-mark',
      disablePointer: true,
    },
    callback: () => showFirst()
  });
};