import React from 'react';
import { shallow } from 'enzyme';
import Message from './Message';
import checkPropTypes from 'check-prop-types';

const mountComponent = (props = {}) => {
  return shallow(<Message {...props} />)
}
describe('<Message /> Component', () => {

  it('should render without error', () => {
    const validComponentByClassName = mountComponent().find('.Message');
    expect(validComponentByClassName.length).toBe(1);
  });

  it('should render props without warning', () => {
    const props = {
      message: {
        content: 'Hello',
        type: 'Some text'
      }
    }
    const checkProps = checkPropTypes(Message.propTypes, props, 'prop', Message.name);
    expect(checkProps).toBeUndefined();
  });

});

