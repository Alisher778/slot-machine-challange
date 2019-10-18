/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount, unmount } from 'enzyme';
import App from '../container/App';

let wrapper;
beforeEach(() => {
  wrapper = mount(<App />);
  return wrapper;
});

describe('<App /> Component', () => {

  it('should render without error', () => {
    expect(wrapper.length).toBe(1);
  });

});

describe('<App /> startHandler method', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
    return wrapper;
  });

  afterEach(() => {
    wrapper.unmount()
  });

  it('should startHandler auto start after 5 sec', () => {
    expect(wrapper.state('start')).toBe(null);
  });

  it('should initialize startHandler method on click', () => {
    const clickButton = wrapper.find('button#start').simulate('click');
    expect(wrapper.state('start')).toBe(true);
    expect(wrapper.state('timer')).toBe(0);
  });

  it('should initialize continune if start= true & timer < 10', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'startTimer');
    instance.startTimer();
    expect(instance.startTimer).toBeCalled();
    wrapper.setState({ start: true, timer: 1 });
    expect(wrapper.state('timer')).toBe(1)
  });

  it('startTimer() should not run timer >= 10', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'startTimer');
    instance.startTimer();
    wrapper.setState({ start: false, timer: 10 });
    expect(wrapper.state('timer')).toBe(10)
    expect(instance.startTimer()).toBeUndefined()
  });

  it('stopHandler() should not run', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'stopHandler');
    instance.stopHandler();
    instance.startTimer(true);
    instance.resultHandler();
    expect(wrapper.state('start')).toBe(false)
    expect(wrapper.state('timer')).toBe(0)
  });



});

describe('resultHandler() should run', () => {


  it('if all wheel number are the same print jackpot', () => {
    wrapper.setState({ wheel: 2, wheel2: 2, wheel3: 2 });
    expect(wrapper.state('wheel')).toBe(2);
    expect(wrapper.state('wheel2')).toBe(2);
    expect(wrapper.state('wheel3')).toBe(2);
  });

  it('if all wheel number are the same print good', () => {
    wrapper.setState({ wheel: 2, wheel2: 2, wheel3: 1 });
    expect(wrapper.state('wheel')).toBe(2);
    expect(wrapper.state('wheel2')).toBe(2);
    expect(wrapper.state('wheel3')).not.toBe(2);
  });

  it('if all wheel number are the same print ok', () => {
    wrapper.setState({ wheel: 2, wheel2: 1, wheel3: 2 });
    expect(wrapper.state('wheel')).toBe(2);
    expect(wrapper.state('wheel2')).not.toBe(2);
    expect(wrapper.state('wheel3')).toBe(2);
  });

  it('if all wheel number are the same print bad', () => {
    wrapper.setState({ wheel: 2, wheel2: 1, wheel3: 0 });
    expect(wrapper.state('wheel')).toBe(2);
    expect(wrapper.state('wheel2')).toBe(1);
    expect(wrapper.state('wheel3')).toBe(0);
  });
});



