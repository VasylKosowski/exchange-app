import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import classNames from 'classnames';
import get from 'lodash/get';
import { validateKey } from '../../../../../utils/common';

import './styles.css';

const InputValues = React.forwardRef((props, ref) => {
    const { className, value, isReadOnly, onChange } = props;
    const componentClass = classNames('pocket-input-value', className);

    return (
        <div className={componentClass}>
            <input
                ref={ref}
                value={value}
                readOnly={isReadOnly}
                onChange={event => onChange(get(event, 'target.value'))}
                onKeyPress={validateKey}
            />
        </div>
    );
});

InputValues.propTypes = {
    /** className to override */
    className: PropTypes.string,
    /** is the input readonly */
    isReadOnly: PropTypes.bool,
    /** input value, which we want to exchange */
    value: PropTypes.string,
    /** callBack on change input value */
    onChange: PropTypes.func,
};

InputValues.defaultProps = {
    onChange: noop,
};

export default InputValues;
