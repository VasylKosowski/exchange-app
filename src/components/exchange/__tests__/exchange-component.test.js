import { shallow } from 'enzyme';
import React from 'react';
import ExchangeComponent from '../exchange-component';

describe('Component: ExchangeComponent', () => {
    it('should render ExchangeComponent component', () => {
        const wrapper = shallow(<ExchangeComponent />);

        expect(wrapper).to.have.length(1);
    });
});
