import 'isomorphic-fetch';
import get from 'lodash/get';
// import { openExchangeUrl } from '../constants/api-endpoints';
import { rates } from '../mocks/exchangeRatesMock';

export function fetchRates() {
	return Promise.resolve({
		success: true,
		body: get(rates, 'rates'),
	});
	// return fetch(openExchangeUrl, { method: 'GET' }).then(resp => resp.json()).then(response => ({
	// 	success: true,
	// 	body: cresponse, 'rates'),
	// })).catch(error => ({
	// 	success: false,
	// 	error: error
	// }));
}
