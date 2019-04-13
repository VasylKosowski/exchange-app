import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../../../../utils/common';
import getSymbolFromCurrency from 'currency-symbol-map';

import './styles.css';

const ExchangeInput = ({ currency, amount }) => (
    <div className="exchange-input">
        <div className="currency">
            <h3>{currency}</h3>
        </div>
        <div className="amount">
            <h6>
                You have: {getSymbolFromCurrency(currency)}
                {formatAmount(amount)}
            </h6>
        </div>
    </div>
);

ExchangeInput.propTypes = {
    amount: PropTypes.number,
    currency: PropTypes.string,
};

export default ExchangeInput;
