import get from 'lodash/get';
import { PRECISION_AFTER_COMMA, DEFAULT_AMOUNT } from '../constants/app-config';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

const convertAmountWithDigits = (amount, digits) => Number(amount).toFixed(digits || PRECISION_AFTER_COMMA);

export const isSuccess = response => get(response, 'success');

export const formatAmount = (amount, digits) => convertAmountWithDigits(amount || DEFAULT_AMOUNT, digits);

export const isEmptyOrZero = value => isEqual(value, 0) || isEmpty(value);
