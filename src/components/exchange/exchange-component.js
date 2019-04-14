import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import ExchangeRates from './components/exchange-rates';
import ExchangePockets from './components/exchange-pockets';
import { DEFAULT_INTERVAL } from '../../constants/app-config';
import { SELECTED_FROM_CURRENCY, SELECTED_TO_CURRENCY } from '../../constants/configurations';

class ExchangeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFromCurrency: SELECTED_FROM_CURRENCY,
            selectedFromValue: 0,
            selectedToCurrency: SELECTED_TO_CURRENCY,
            selectedToValue: 0,
        };
    }

    componentDidMount() {
        const { actions } = this.props;

        actions.getRates(); // on first load we load the rates;

        this.timer = setInterval(() => {
            actions.getRates();
        }, DEFAULT_INTERVAL * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer); // stop the timer on unmount
    }

    render() {
        const { rates, pockets, error, actions } = this.props;
        const { selectedFromCurrency, selectedFromValue, selectedToCurrency, selectedToValue } = this.state;

        return (
            <div className="exchange-application">
                <div className="app">
                    {error && <span>Error: {error}</span>}
                    <div className="row stable-height-row">
                        {this._isRateSelectorVisible() && (
                            <ExchangeRates rates={rates} fromCurrency={selectedFromCurrency} />
                        )}
                    </div>
                    <div className="row">
                        <ExchangePockets
                            rates={rates}
                            fromValue={this.state.selectedFromValue}
                            toValue={this.state.selectedToValue}
                            pockets={pockets}
                            onValueChange={values => {
                                this.setState({
                                    selectedFromValue: get(values, 'fromValue'),
                                    selectedToValue: get(values, 'toValue'),
                                });
                            }}
                            onFromCurrencyChange={currencyCode => {
                                this.setState({
                                    selectedFromCurrency: currencyCode,
                                });
                            }}
                            onToCurrencyChange={currencyCode => {
                                this.setState({
                                    selectedToCurrency: currencyCode,
                                });
                            }}
                        />
                    </div>
                    <div className="row stable-height-row">
                        {!isEqual(this.state.selectedFromCurrency, this.state.selectedToCurrency) && (
                            <button
                                className="exchange-button"
                                onClick={() => {
                                    if (
                                        !isEqual(this.state.selectedFromValue, 0) ||
                                        !isEqual(this.state.selectedToValue, 0)
                                    ) {
                                        actions.performExchange({
                                            [selectedFromCurrency]:
                                                get(pockets, selectedFromCurrency) - selectedFromValue,
                                            [selectedToCurrency]: get(pockets, selectedToCurrency) + selectedToValue,
                                        });
                                        this.setState({
                                            selectedFromValue: 0,
                                            selectedToValue: 0,
                                        });
                                    }
                                }}
                            >
                                Exchange
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    _isRateSelectorVisible = () => !isEqual(this.state.selectedFromCurrency, this.state.selectedToCurrency);
}

ExchangeComponent.propTypes = {
    actions: PropTypes.shape({
        getRates: PropTypes.func.isRequired,
        performExchange: PropTypes.func.isRequired,
    }).isRequired,
    error: PropTypes.string,
    pockets: PropTypes.object,
    rates: PropTypes.object,
};

ExchangeComponent.defaultProps = {
    actions: {
        getRates: noop,
        performExchange: noop,
    },
    error: '',
    rates: {},
    pockets: {},
};

export default ExchangeComponent;
