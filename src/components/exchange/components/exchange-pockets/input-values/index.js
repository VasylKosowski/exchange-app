import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import classNames from 'classnames';
import CurrencyInput from 'react-currency-input';
import { NotEmptyOrZero } from '../../../../../utils/common';
import { PRECISION_AFTER_COMMA } from '../../../../../constants/app-config';

import './styles.css';

const InputValues = ({ className, value, isReadOnly, onChange }) => {
    const componentClass = classNames('pocket-input-value', className, {
        'input-value-read-only': isReadOnly,
    });
    const prefix = NotEmptyOrZero(value) ? (isReadOnly ? '+' : '-') : '';

    return (
        <div className={componentClass}>
            <CurrencyInput
                prefix={prefix}
                value={value}
                precision={PRECISION_AFTER_COMMA}
                onChange={val => onChange(val)}
            />
        </div>
    );
};

InputValues.propTypes = {
    /** className to override */
    className: PropTypes.string,
    /** is the input readonly */
    isReadOnly: PropTypes.bool,
    /** input value, which we want to exchange */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** callBack on change input value */
    onChange: PropTypes.func,
};

InputValues.defaultProps = {
    onChange: noop,
    className: '',
};

export default InputValues;
