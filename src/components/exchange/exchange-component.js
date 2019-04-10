import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { DEFAULT_INTERVAL } from '../../constants/configurations'

class ExchangeComponent extends Component {
	componentDidMount() {
		const { actions } = this.props;

		setInterval(function(){ actions.getRates() }, DEFAULT_INTERVAL * 1000);
	}

	render() {
		return (
			<div className="exchange-application">
				<header className="app-header">
					<div className="row">
						<div className="col-xs-6" >
							<input value="" />
						</div>
						<div className="col-xs-6" >
							<input value="" />
						</div>
					</div>
				</header>
			</div>
		);
	}
}

ExchangeComponent.propTypes = {
	actions: PropTypes.shape({
		getRates: PropTypes.func.isRequired,
	}).isRequired,
	error: PropTypes.string,
	rates: PropTypes.object,
};

ExchangeComponent.defaultProps = {
	actions: {
		getRates: noop,
	},
	error: '',
	rates: {},
};

export default ExchangeComponent;
