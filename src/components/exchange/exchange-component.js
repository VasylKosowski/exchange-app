import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';
import ExchangeRates from './components/exchange-rates';
import ExchangePockets from './components/exchange-pockets';
import { DEFAULT_INTERVAL } from '../../constants/app-config';
import { SELECTED_FROM_CURRENCY, SELECTED_TO_CURRENCY } from '../../constants/configurations';

class ExchangeComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedFromCurrency: SELECTED_FROM_CURRENCY,
			selectedToCurrency: SELECTED_TO_CURRENCY
		};
	}

	componentDidMount() {
		const { actions } = this.props;

		actions.getRates(); // on first load we load the rates;

		this.timer = setInterval(() => { actions.getRates() }, DEFAULT_INTERVAL * 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer); // stop the timer on unmount
	}

	render() {
		const { rates, pockets } = this.props;

		return (
			<div className="exchange-application">
				<header className="app-header">
					<div className="row rates-row">
						{this._isRateSelectorVisible() && <ExchangeRates rates={rates} fromCurrency={this.state.selectedFromCurrency} />}
					</div>
					<div className="row">
						<ExchangePockets pockets={pockets} onFromCurrencyChange={currencyCode => {
							this.setState({
								selectedFromCurrency: currencyCode
							})
						}} onToCurrencyChange={currencyCode => {
							this.setState({
								selectedToCurrency: currencyCode
							})
						}} />
					</div>
				</header>
			</div>
		);
	}

	_isRateSelectorVisible = () => !isEqual(this.state.selectedFromCurrency, this.state.selectedToCurrency);
}

ExchangeComponent.propTypes = {
	actions: PropTypes.shape({
		getRates: PropTypes.func.isRequired,
	}).isRequired,
	error: PropTypes.string,
	rates: PropTypes.object,
	pockets: PropTypes.object,
};

ExchangeComponent.defaultProps = {
	actions: {
		getRates: noop,
	},
	error: '',
	rates: {},
	pockets: {},
};

export default ExchangeComponent;
