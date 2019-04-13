import { combineReducers } from 'redux';

import exchangeRatesReducer from '../components/exchange/exchange-reducer';

export const reducers = combineReducers({
    exchangeRates: exchangeRatesReducer,
});
