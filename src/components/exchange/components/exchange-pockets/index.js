import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';
import assign from 'lodash/assign';
import size from 'lodash/size';
import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';
import PocketValues from './pocket-values';
import InputValues from './input-values';
import ExchangeCarousel from './exchange-carousel';
import { SELECTED_FROM_CURRENCY, SELECTED_TO_CURRENCY } from '../../../../constants/configurations';
import getSymbolFromCurrency from 'currency-symbol-map';
import { formatAmount } from '../../../../utils/common';
import { DIGITS_AFTER_COMMA_IN_RATES_SELECTOR, DIGITS_AFTER_COMMA } from '../../../../constants/app-config';

class ExchangePockets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toCurrency: SELECTED_TO_CURRENCY,
            fromCurrency: SELECTED_FROM_CURRENCY,
            fromValue: '',
            toValue: '',
        };

        const inputRefs = {};

        map(props.pockets, (value, key) => {
            assign(inputRefs, { [key]: React.createRef() });
        });

        this.inputRefs = inputRefs;
    }

    componentDidMount() {
        this.inputRefs && this.inputRefs[SELECTED_FROM_CURRENCY].current.focus();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !isEqual(nextProps.pockets, this.props.pockets) ||
            !isEqual(nextState.fromValue, this.state.fromValue) ||
            !isEqual(nextProps.rates, this.props.rates)
        );
    }

    render() {
        const { onFromCurrencyChange, onToCurrencyChange } = this.props;
        const pockets = isFromValue => this._renderPockets(isFromValue);

        return (
            <div className="exchange-pockets">
                <ExchangeCarousel
                    selectedItem={findIndex(pockets(true), { key: SELECTED_FROM_CURRENCY })}
                    onChange={itemKey => {
                        this.setState(
                            {
                                fromCurrency: itemKey,
                            },
                            onFromCurrencyChange(itemKey)
                        );
                    }}
                >
                    {pockets(true)}
                </ExchangeCarousel>
                <ExchangeCarousel
                    selectedItem={findIndex(pockets(false), { key: SELECTED_TO_CURRENCY })}
                    onChange={itemKey => {
                        this.setState(
                            {
                                toCurrency: itemKey,
                            },
                            onToCurrencyChange(itemKey)
                        );
                    }}
                >
                    {pockets(false)}
                </ExchangeCarousel>
            </div>
        );
    }

    /** render pocket based on input flag whether this is from value pocket or not */
    _renderPockets = isFromValue =>
        map(this.props.pockets, (value, key) => (
            <div key={key} className="row exchange-values">
                <PocketValues currency={key} amount={value} className="col-xs-6" />
                <InputValues
                    ref={isFromValue ? this.inputRefs[key] : null}
                    isReadOnly={!isFromValue}
                    className="col-xs-6"
                    value={isFromValue ? this.state.fromValue : this.state.toValue}
                    onChange={inputValue => {
                        let convertedInputValue = '';

                        if (size(inputValue) > 1) {
                            convertedInputValue = `-${inputValue.substring(1)}`;
                        } else {
                            convertedInputValue = isEqual(inputValue, '-') ? '' : `-${inputValue}`;
                        }
                        const convertedToValue = isEmpty(convertedInputValue)
                            ? ''
                            : `+${formatAmount(
                                  (Math.abs(convertedInputValue) * this.props.rates[this.state.toCurrency]) /
                                      this.props.rates[key],
                                  DIGITS_AFTER_COMMA
                              )}`;

                        this.setState({
                            fromValue: convertedInputValue,
                            toValue: convertedToValue,
                        });
                    }}
                />
                {!isFromValue && (
                    <h6>
                        {`${getSymbolFromCurrency(key)}1 = ${getSymbolFromCurrency(this.state.fromCurrency)}
                            ${formatAmount(
                                this.props.rates[this.state.fromCurrency] / this.props.rates[key],
                                DIGITS_AFTER_COMMA_IN_RATES_SELECTOR
                            )}`}
                    </h6>
                )}
            </div>
        ));
}

ExchangePockets.propTypes = {
    pockets: PropTypes.object,
    /** Pockets Object */
    rates: PropTypes.object,
    /** Callback When We Change "From Currency" */
    onFromCurrencyChange: PropTypes.func,
    /** Callback When We Change "To Currency" */
    onToCurrencyChange: PropTypes.func,
};

ExchangePockets.defaultProps = {
    onFromCurrencyChange: noop,
    onToCurrencyChange: noop,
};

export default ExchangePockets;
