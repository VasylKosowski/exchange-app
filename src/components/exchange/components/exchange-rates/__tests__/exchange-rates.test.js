import { shallow } from 'enzyme';
import React from 'react';
import ExchangeRates from '../index';

describe('Component: ExchangeRates', () => {
    it('should render ExchangeRates component', () => {
        const wrapper = shallow(<ExchangeRates />);

        expect(wrapper).to.have.length(1);
    });
});
