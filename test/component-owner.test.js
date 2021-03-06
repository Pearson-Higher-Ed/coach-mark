import React from 'react';
import enzyme from 'enzyme';
import ComponentOwner from '../src/js/component-owner';

const { mount } = enzyme;

describe('Component Owner Suite', () => {

  const target = global.document.createElement("div");
  const trigger = global.document.createElement("button");

  target.appendChild(trigger);
  global.document.body.appendChild(target);

  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should shallowly render the component', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        title="This is a title"
        stopScroll={true}
      />
    );
    expect(wrapper.find('.o-coach-mark__title').text()).toEqual('This is a title');
  });

  it('should fire resetPosition Function again', function() {
    const resetPositionMock = jest.fn();
    class ComponentOwnerClone extends ComponentOwner {
      resetPosition = resetPositionMock;
    }
    wrapper = mount(
      <ComponentOwnerClone
        target={target}
        stopScroll={true}
      />
    );
    window.dispatchEvent(new Event('resize'));
    expect(resetPositionMock.mock.calls.length).toBe(2);
  });

  it('should not add class for pointer', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        disablePointer={true}
      />
    );
    expect(wrapper.find('.o-coach-mark--top').length).toBe(0);
    expect(wrapper.find('.o-coach-mark--bottom').length).toBe(0);
  });


  it('should not add class for animate', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        animate={false}
      />
    );
    expect(wrapper.find('.animated .fadeIn').length).toBe(0);
  });

  it('should add class for animate', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        animate={true}
      />
    );
    expect(wrapper.find('.animated .fadeIn').length).toBe(1);
  });

  it('should change coachmark to informative', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        type={'info'}
      />
    );
    expect(wrapper.find('.info').length).toBe(1);
  });

  it('should change coachmark to generic', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        type={'generic'}
      />
    );
    expect(wrapper.find('.generic').length).toBe(1);
  });

  it('should have a close X button', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
      />
    );
    expect(wrapper.find('.o-coach-mark__close-icon').length).toBe(1);
  });

  it('should not have a close X button', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        showClose={false}
      />
    );
    expect(wrapper.find('.o-coach-mark__close-icon').length).toBe(0);
  });

  it('should place above target', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        forceAbove={true}
      />
    );
    expect(wrapper.find('.o-coach-mark--top-left').length).toBe(1);
  });

  it('should place below target', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        forceBelow={true}
      />
    );
    expect(wrapper.find('.o-coach-mark--bottom-left').length).toBe(1);
  });

  it('should place to right of target', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        forceRight={true}
      />
    );
    expect(wrapper.find('.o-coach-mark--p-right').length).toBe(1);
  });

  it('should place to left of target', () => {
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        forceLeft={true}
      />
    );
    expect(wrapper.find('.o-coach-mark--p-left').length).toBe(1);
  });

  it('should fire onClose when X is clicked', () => {
    const onCloseMock = jest.fn();
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        onClose={onCloseMock}
      />
    );
    wrapper.find('.o-coach-mark__close-icon').simulate('click');
    expect(onCloseMock.mock.calls.length).toBe(1);
  });

  it('should fire onClose when gotIt button clicked', () => {
    const onCloseMock = jest.fn();
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        onClose={onCloseMock}
        gotIt={true}
      />
    );
    wrapper.find('.o-coach-mark__got-it').simulate('click');
    expect(onCloseMock.mock.calls.length).toBe(1);
  });

  it('should not fire onClose when component is clicked', () => {
    const onCloseMock = jest.fn();
    wrapper = mount(
      <ComponentOwner
        target={target}
        stopScroll={true}
        onClose={onCloseMock}
        closeOnBodyClick={true}
      />
    );
    wrapper.find('.o-coach-mark__container').simulate('click');
    expect(onCloseMock.mock.calls.length).toBe(0);
  });

});
