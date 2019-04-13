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
                    const calculatedRate = (1 * value) / rates[fromCurrency];
                    const optionValue = `${getSymbolFromCurrency(fromCurrency)}1 = ${currencySymbol}${formatAmount(
                        calculatedRate,
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
    /** currency we are exchanging from */
    fromCurrency: PropTypes.string,
    /** rates we have setup for selector */
    rates: PropTypes.object,
};

export default ExchangeRates;
