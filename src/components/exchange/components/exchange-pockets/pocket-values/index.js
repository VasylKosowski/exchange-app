import React from 'react';
import PropTypes from 'prop-types';
import { formatAmount } from '../../../../../utils/common';
import getSymbolFromCurrency from 'currency-symbol-map';
import classNames from 'classnames';

import './styles.css';

const PocketValues = ({ currency, amount, className }) => {
    const componentClass = classNames('current-values', className);

    return (
        <div className={componentClass}>
            <div className="amount">
                <h6>
                    You have: {getSymbolFromCurrency(currency)}
                    {formatAmount(amount)}
                </h6>
            </div>
        </div>
    );
};

PocketValues.propTypes = {
    /** amount of money in the pocket */
    amount: PropTypes.number,
    /** class name to override */
    className: PropTypes.string,
    /** currency of the pocket */
    currency: PropTypes.string,
};

export default PocketValues;
