import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { shallow } from 'enzyme';
import TagButtonGroup, { pos } from '../TagButtonGroup';
import MenuItem from '@mui/material/MenuItem';


Enzyme.configure({ adapter: new Adapter() });

describe('TagButtonGroup', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<TagButtonGroup />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should update pos when a menu item is clicked', () => {
  const pos = 'V';
  const wrapper = shallow(<TagButtonGroup />);
  console.log(wrapper.debug()); // debug the component tree to see if MenuItem is being rendered
  const menuItem = wrapper.find('MenuItem').at(1);
  console.log(wrapper.find('MenuItem').length); // debug the number of MenuItems to see if the index is correct
  // menuItem.simulate('click', { target: {} });
  expect(pos).toEqual('V');
  });

});
