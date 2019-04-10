import { createReducer } from '../../reducers/create-reducer';
import { Map } from 'immutable';
import { LOAD_EXCHANGE_RATES } from './exchange-actions';
import get from 'lodash/get';

export const initialState = {
	rates: {},
	error: '',
};

export default createReducer(Map(initialState), {
	[LOAD_EXCHANGE_RATES.REQUESTED](state) {
		return state.set('rates', get(initialState, 'rates')).set('error', get(initialState, 'error'));
	},
	[LOAD_EXCHANGE_RATES.RESPONDED](state, action) {
		return state.set('rates', get(action, 'rates'));
	},
	[LOAD_EXCHANGE_RATES.FAILED](state, action) {
		return state.set('rates', get(initialState, 'rates')).set('error', get(action, 'error'));
	},
});