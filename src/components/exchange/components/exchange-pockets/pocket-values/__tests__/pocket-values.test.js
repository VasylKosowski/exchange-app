import { shallow } from 'enzyme';
import React from 'react';
import PocketValues from '../index';

describe('Component: PocketValues', () => {
    it('should render PocketValues component', () => {
        const wrapper = shallow(<PocketValues />);

        expect(wrapper).to.have.length(1);
    });

    it('should render PocketValues component and have default class', () => {
        const wrapper = shallow(<PocketValues />);

        expect(wrapper).to.have.length(1);
        expect(wrapper.props()).to.deep.include({
            className: 'current-values',
        });
    });
});
