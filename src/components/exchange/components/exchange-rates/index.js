import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import omit from 'lodash/omit';
import getSymbolFromCurrency from 'currency-symbol-map';
import { formatAmount } from '../../../../utils/common';
import { DIGITS_AFTER_COMMA_IN_RATES_SELECTOR } from '../../../../constants/app-config';

import './styles.css';

const ExchangeRates = ({ rates, fromCurrency }) => {
    const omittedRates = omit(rates, fromCurrency);

    return (
        <div className="exchange-rates">
            <select>
                {map(omittedRates, (value, key) => {
                    const currencySymbol = getSymbolFromCurrency(key);
                    const optionValue = `1${getSymbolFromCurrency(fromCurrency)} = ${currencySymbol}${formatAmount(
                        (1 * value) / rates[fromCurrency],
                        DIGITS_AFTER_COMMA_IN_RATES_SELECTOR
                    )}`;

                    return (
                        <option value={value} key={key}>
                            {optionValue}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

ExchangeRates.propTypes = {
    fromCurrency: PropTypes.string,
    rates: PropTypes.object,
};

export default ExchangeRates;
