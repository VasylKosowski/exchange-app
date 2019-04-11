import get from 'lodash/get';
import { DIGITS_AFTER_COMMA, DEFAULT_AMOUNT } from '../constants/app-config';

const convertAmountWithDigits = amount => Number(amount).toFixed(DIGITS_AFTER_COMMA);

export const isSuccess = response => get(response, 'success');

export const formatAmount = amount => convertAmountWithDigits(amount || DEFAULT_AMOUNT);