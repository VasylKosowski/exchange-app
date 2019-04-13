import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Exchange from './components/exchange';
import './stylesheets/app.css';
import 'bootstrap/dist/css/bootstrap.css';

const App = ({ store }) => (
    <Provider store={store}>
        <Exchange />
    </Provider>
);

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;
