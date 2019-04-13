import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducers } from './reducers';

// apply the middleware
let middleware = applyMiddleware(...[ReduxThunk]);

// add the redux dev tools
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    middleware = compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}

// create the store
const store = createStore(reducers, middleware);

// export
export { store };
