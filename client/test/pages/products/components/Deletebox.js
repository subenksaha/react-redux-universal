import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import path from 'path';

import Deletebox from '/app/pages/products/components/Deletebox';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('/app/pages/products/components/Deletebox', () => {
  const component = shallow(<Deletebox store={mockStore({ errors: {} })}/>).shallow();

  it('contains 1 <form/>', () => {
    expect(component.find('form')).to.have.length(1);
  });
  it('contains 1 submit button', () => {
    expect(component.find("[type='submit']")).to.have.length(1);
  });
});
