import { shallow } from 'enzyme';
import React from 'react';
import InputValues from '../index';
import CurrencyInput from 'react-currency-input';

describe('Component: InputValues', () => {
    it('should render InputValues component', () => {
        const wrapper = shallow(<InputValues />);

        expect(wrapper).to.have.length(1);
    });

    it('should render InputValues component and have CurrencyInput and pass value prop', () => {
        const wrapper = shallow(<InputValues value={10} />).find(CurrencyInput);

        expect(wrapper).to.have.length(1);
        expect(wrapper.props()).to.deep.include({
            value: 10,
        });
    });
});
