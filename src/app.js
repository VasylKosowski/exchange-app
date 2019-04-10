import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import './stylesheets/app.css';

import 'bootstrap/dist/css/bootstrap.css';

const App = ({ store }) => {
    return (
        <Provider store={store}>
          <div className="exchange-application">
            <header className="app-header">
              <div className="row">
                  <div className="col-xs-6" >
                      <input value="" />
                  </div>
                  <div className="col-xs-6" >
                      <input value="" />
                  </div>
                </div>
            </header>
          </div>
        </Provider>
    );
  };

App.propTypes = {
    store: PropTypes.object.isRequired,
};

export default App;

