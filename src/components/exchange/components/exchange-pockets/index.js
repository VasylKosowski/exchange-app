import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import noop from 'lodash/noop';
import ExchangeInput from './exchange-input';
import ExchangeCarousel from './exchange-carousel'

const ExchangePockets = ({ pockets, onFromCurrencyChange, onToCurrencyChange }) => {
	const renderPockets = () => map(pockets, (value, key) => {
		return <div key={key}>
			<ExchangeInput currency={key} amount={value} />
		</div>
	});

	return (
		<div className="exchange-pockets">
			<ExchangeCarousel onChange={itemKey => onFromCurrencyChange(itemKey)}>
				{renderPockets()}
			</ExchangeCarousel>
			<ExchangeCarousel selectedItem={1} onChange={itemKey => onToCurrencyChange(itemKey)}>
				{renderPockets()}
			</ExchangeCarousel>
		</div>
	);
};

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