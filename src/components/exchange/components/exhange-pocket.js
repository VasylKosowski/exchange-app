import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../../utils/common';

import './styles.css';

const ExchangePocket = ({ currency, amount }) => {
	return (
		<div className="exchange-pocket">
			<div className="currency">
				<h3>{currency}</h3>
			</div>
			<div className="amount">
				<h6>You have: {formatAmount(amount)}</h6>
			</div>
		</div>
	);
};

ExchangePocket.propTypes = {
	currency: PropTypes.string,
	amount: PropTypes.number,
};

export default ExchangePocket;