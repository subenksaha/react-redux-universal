import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import path from 'path';

import Postbox from '/app/pages/products/components/Postbox';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('/app/pages/products/components/Postbox', () => {
  const component = shallow(<Postbox store={mockStore({ errors: {} })}/>).shallow();

  it('contains 1 <form/>', () => {
    expect(component.find('form')).to.have.length(1);
  });
  it('contains 3 <input/>', () => {
    expect(component.find('input')).to.have.length(3);
  });
  it('contains 1 <textarea/>', () => {
    expect(component.find('textarea')).to.have.length(1);
  });
});
