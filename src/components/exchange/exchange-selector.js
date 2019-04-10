import { getRates } from './exchange-actions';

export function mapStateToProps(state) {
	const { exchangeRates } = state;

	return {
		rates: exchangeRates.get('rates'),
		error: exchangeRates.get('error'),
	};
}

export function mapDispatchToProps(dispatch) {
	return {
		actions: {
			getRates: () => dispatch(getRates()),
		},
	};
}
