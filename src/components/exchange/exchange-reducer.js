import { createReducer } from '../../reducers/create-reducer';
import { Map } from 'immutable';
import { LOAD_EXCHANGE_RATES } from './exchange-actions';
import get from 'lodash/get';

export const initialState = {
	rates: [],
};

export default createReducer(Map(initialState), {
	[LOAD_EXCHANGE_RATES](state, action) {
		return state.set('rates', get(action, 'rates'));
	},
});
