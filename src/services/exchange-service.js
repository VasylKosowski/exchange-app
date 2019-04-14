import 'isomorphic-fetch';
import get from 'lodash/get';
import { MOCK_PARAM } from '../constants/app-config';
import { openExchangeUrl } from '../constants/api-endpoints';
import { rates } from '../mocks/exchangeRatesMock';
import pick from 'lodash/pick';
import queryString from 'query-string';
import { CURRENCIES_CODES } from '../constants/configurations';

export function fetchRates() {
    const params = queryString.parse(window.location.search);
    const isMock = get(params, MOCK_PARAM);

    if (isMock) {
        return Promise.resolve({
            success: true,
            body: pick(get(rates, 'rates'), CURRENCIES_CODES),
        });
    }

    return fetch(openExchangeUrl, { method: 'GET' })
        .then(resp => resp.json())
        .then(response => ({
            success: true,
            body: pick(get(response, 'rates'), CURRENCIES_CODES),
        }))
        .catch(error => ({
            success: false,
            error: error,
        }));
}
