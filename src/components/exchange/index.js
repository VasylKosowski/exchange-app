import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './exchange-selector';
import ExchangeComponent from './exchange-component';

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExchangeComponent);
