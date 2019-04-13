import 'isomorphic-fetch';
import get from 'lodash/get';
// import { openExchangeUrl } from '../constants/api-endpoints';
import { rates } from '../mocks/exchangeRatesMock';
import pick from 'lodash/pick';
import { CURRENCIES_CODES } from '../constants/configurations';

export function fetchRates() {
    return Promise.resolve({
        success: true,
        body: pick(get(rates, 'rates'), CURRENCIES_CODES),
    });
    // return fetch(openExchangeUrl, { method: 'GET' }).then(resp => resp.json()).then(response => ({
    // 	success: true,
    // 	body: response, 'rates'),
    // })).catch(error => ({
    // 	success: false,
    // 	error: error
    // }));
}
