import { shallow } from 'enzyme';
import React from 'react';
import ExchangePockets from '../index';

describe('Component: ExchangePockets', () => {
    it('should render ExchangePockets component', () => {
        const wrapper = shallow(<ExchangePockets pockets={{ USD: 1, EUR: 10 }} rates={{ USD: 1.4, EUR: 1.5 }} />);

        expect(wrapper).to.have.length(1);
    });
});
