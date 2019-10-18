import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';
import checkPropTypes from 'check-prop-types';

const mountComponent = (props = {}) => {
  return shallow(<Spinner {...props} />)
}
describe('<Spinner /> Component', () => {

  it('should render without error', () => {
    const validComponentByClassName = mountComponent().find('.Spinner');
    expect(validComponentByClassName.length).toBe(1);
  });

  it('should render props without warning', () => {
    const props = {
      index: 1,
      stop: true
    }
    const checkProps = checkPropTypes(Spinner.propTypes, props, 'prop', Spinner.name);
    expect(checkProps).toBeUndefined();
  });

});

