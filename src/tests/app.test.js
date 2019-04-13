import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Exchange from '../components/exchange';
import App from '../app';

describe('Component: AppComponent', () => {
    it('should render App component', () => {
        const wrapper = shallow(<App store={store} />);

        expect(wrapper).to.have.length(1);
    });

    it('should render Provider with store prop', () => {
        const provider = shallow(<App store={store} />).find(Provider);

        expect(provider).to.have.length(1);
        expect(provider.prop('store')).equal(store);
    });

    it('should render Exchange component', () => {
        const exchange = shallow(<App store={store} />).find(Exchange);

        expect(exchange).to.have.length(1);
    });
});
