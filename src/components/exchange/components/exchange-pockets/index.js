import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';
import ExchangeInput from './exchange-input';
import ExchangeCarousel from './exchange-carousel';
import { SELECTED_FROM_CURRENCY, SELECTED_TO_CURRENCY } from '../../../../constants/configurations';

class ExchangePockets extends Component {
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return !isEqual(nextProps.pockets, this.props.pockets);
	}

	render() {
		const { onFromCurrencyChange, onToCurrencyChange } = this.props;
		const pockets = this._renderPockets();

		return (
			<div className="exchange-pockets">
				<ExchangeCarousel selectedItem={findIndex(pockets, { key: SELECTED_FROM_CURRENCY })}
				                  onChange={itemKey => onFromCurrencyChange(itemKey)}>
					{pockets}
				</ExchangeCarousel>
				<ExchangeCarousel selectedItem={findIndex(pockets, { key: SELECTED_TO_CURRENCY })}
				                  onChange={itemKey => onToCurrencyChange(itemKey)}>
					{pockets}
				</ExchangeCarousel>
			</div>
		);
	}

	_renderPockets = () => map(this.props.pockets, (value, key) => {
		return <div key={key}>
			<ExchangeInput currency={key} amount={value} />
		</div>
	});
}

ExchangePockets.propTypes = {
	/** Pockets Object */
	pockets: PropTypes.object,
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