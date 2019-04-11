import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { formatAmount } from '../../../../utils/common';
import { DIGITS_AFTER_COMMA_IN_RATES_SELECTOR } from '../../../../constants/app-config';
import getSymbolFromCurrency from 'currency-symbol-map';

import './styles.css';

const ExchangeRates = ({ rates, fromCurrency }) => {

	return (
		<div className="exchange-rates">
			<select>
				{map(rates, (value, key) => {
					const currencySymbol = getSymbolFromCurrency(key);

					return (<option value={value}>
						1{getSymbolFromCurrency(fromCurrency)} = {currencySymbol}{formatAmount(value, DIGITS_AFTER_COMMA_IN_RATES_SELECTOR)}
					</option>);
				})}
			</select>
		</div>
	);
};

ExchangeRates.propTypes = {
	rates: PropTypes.object,
	fromCurrency: PropTypes.string,
	toCurrency: PropTypes.string,
};

export default ExchangeRates;