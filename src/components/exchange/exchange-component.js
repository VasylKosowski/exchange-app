import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import map from 'lodash/map';
import ExchangePocket from './components/exhange-pocket';
import { Carousel } from 'react-responsive-carousel';
import { DEFAULT_INTERVAL } from '../../constants/app-config';

class ExchangeComponent extends Component {
	componentDidMount() {
		const { actions } = this.props;

		actions.getRates(); // on first load we load the rates;

		this.timer = setInterval(() => { actions.getRates() }, DEFAULT_INTERVAL * 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer); // stop the timer on unmount
	}

	render() {
		return (
			<div className="exchange-application">
				<header className="app-header">
					<Carousel centerMode centerSlidePercentage={100} showThumbs={false} showStatus={false}>
						{this._renderPockets()}
					</Carousel>
				</header>
			</div>
		);
	}

	_renderPockets = () => map(this.props.pockets, (value, key) => {
		return <div key={key}>
			<ExchangePocket currency={key} amount={value} />
		</div>
	});
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
