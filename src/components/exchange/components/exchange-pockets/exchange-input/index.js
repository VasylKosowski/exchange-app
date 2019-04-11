import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../../../../utils/common';
import getSymbolFromCurrency from 'currency-symbol-map';

import './styles.css';

const ExchangeInput = ({ currency, amount }) => {
	return (
		<div className="exchange-input">
			<div className="currency">
				<h3>{currency}</h3>
			</div>
			<div className="amount">
				<h6>You have: {getSymbolFromCurrency(currency)}{formatAmount(amount)}</h6>
			</div>
		</div>
	);
};

ExchangeInput.propTypes = {
	currency: PropTypes.string,
	amount: PropTypes.number,
};

export default ExchangeInput;