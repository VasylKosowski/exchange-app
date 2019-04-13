import { fetchRates } from '../../services/exchange-service';
import { isSuccess } from '../../utils/common';
import get from 'lodash/get';

export const LOAD_EXCHANGE_RATES = {
    REQUESTED: 'LOAD_EXCHANGE_RATES_REQUESTED',
    RESPONDED: 'LOAD_EXCHANGE_RATES_RESPONDED',
    FAILED: 'LOAD_EXCHANGE_RATES_FAILED',
};

export const PERFORM_EXCHANGE = 'PERFORM_EXCHANGE';

export const getRates = () => dispatch => {
    dispatch({ type: LOAD_EXCHANGE_RATES.REQUESTED });

    return fetchRates()
        .then(response => {
            if (isSuccess(response)) {
                return dispatch({
                    type: LOAD_EXCHANGE_RATES.RESPONDED,
                    rates: get(response, 'body'),
                });
            }

            return dispatch({ type: LOAD_EXCHANGE_RATES.FAILED, error: get(response, 'error') });
        })
        .catch(error => dispatch({ type: LOAD_EXCHANGE_RATES.FAILED, error: error }));
};

export const performExchange = values => dispatch => {
    return dispatch({
        type: PERFORM_EXCHANGE,
        values,
    });
};