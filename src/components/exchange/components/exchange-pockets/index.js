import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import noop from 'lodash/noop';
import forEach from 'lodash/forEach';
import PocketValues from './pocket-values';
import InputValues from './input-values';
import get from 'lodash/get';
import { SELECTED_FROM_CURRENCY, SELECTED_TO_CURRENCY } from '../../../../constants/configurations';
import getSymbolFromCurrency from 'currency-symbol-map';
import { formatAmount, NotEmptyOrZero } from '../../../../utils/common';
import { PRECISION_AFTER_COMMA_IN_RATES_SELECTOR, PRECISION_AFTER_COMMA } from '../../../../constants/app-config';

import './styles.css';

class ExchangePockets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toCurrency: SELECTED_TO_CURRENCY,
            fromCurrency: SELECTED_FROM_CURRENCY,
        };
    }

    componentDidMount() {
        // add read only attribute to toValue selector
        forEach(document.querySelectorAll('.input-value-read-only input'), readOnlyItem => {
            readOnlyItem.setAttribute('readOnly', true);
        });
    }

    render() {
        const { fromValue, toValue } = this.props;
        const { fromCurrency, toCurrency } = this.state;

        return (
            <div className="exchange-pockets">
                {this._renderPockets(fromCurrency, fromValue, true)}
                {this._renderPockets(toCurrency, toValue, false)}
            </div>
        );
    }

    /** render pocket based on input flag whether this is from value pocket or not */
    _renderPockets = (currency, value, isFromValue) => (
        <div className="row exchange-values">
            <div className="row">
                <div className="col-xs-6">
                    <select
                        value={currency}
                        onChange={event => {
                            const currencyValue = get(event, 'target.value');

                            if (isFromValue) {
                                this.setState(
                                    {
                                        fromCurrency: currencyValue,
                                    },
                                    this.props.onFromCurrencyChange(currencyValue)
                                );
                            } else {
                                this.setState(
                                    {
                                        toCurrency: currencyValue,
                                    },
                                    this.props.onToCurrencyChange(currencyValue)
                                );
                            }
                        }}
                    >
                        {map(this.props.pockets, (value, key) => (
                            <option value={key} key={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <InputValues
                    isReadOnly={!isFromValue}
                    className="col-xs-6"
                    value={value}
                    onChange={inputValue => {
                        const convertedToValue = !NotEmptyOrZero(inputValue)
                            ? ''
                            : `${formatAmount(
                                  (Math.abs(parseFloat(inputValue.replace(/,/g, ''))) *
                                      this.props.rates[this.state.toCurrency]) /
                                      this.props.rates[currency],
                                  PRECISION_AFTER_COMMA
                              )}`;

                        this.props.onValueChange({
                            fromValue: Math.abs(parseFloat(inputValue.replace(/,/g, ''))),
                            toValue: parseFloat(convertedToValue),
                        });
                    }}
                />
            </div>

            <PocketValues currency={currency} amount={this.props.pockets[currency]} className="col-xs-6" />

            {!isFromValue && (
                <div className="col-xs-6 currency-rates">
                    <h6>
                        {`${getSymbolFromCurrency(currency)}1 = ${getSymbolFromCurrency(this.state.fromCurrency)}
                            ${formatAmount(
                                this.props.rates[this.state.fromCurrency] / this.props.rates[currency],
                                PRECISION_AFTER_COMMA_IN_RATES_SELECTOR
                            )}`}
                    </h6>
                </div>
            )}
        </div>
    );
}

ExchangePockets.propTypes = {
    /** from value */
    fromValue: PropTypes.number,
    /** Pockets Object */
    pockets: PropTypes.object,
    /** Rates Object */
    rates: PropTypes.object,
    /** to value */
    toValue: PropTypes.number,
    /** Callback When We Change "From Currency" */
    onFromCurrencyChange: PropTypes.func,
    /** Callback When We Change "To Currency" */
    onToCurrencyChange: PropTypes.func,
    /** Callback When We Change Value */
    onValueChange: PropTypes.func,
};

ExchangePockets.defaultProps = {
    onFromCurrencyChange: noop,
    onToCurrencyChange: noop,
    onValueChange: noop,
};

export default ExchangePockets;
