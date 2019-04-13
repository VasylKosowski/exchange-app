import get from 'lodash/get';
import { DIGITS_AFTER_COMMA, DEFAULT_AMOUNT } from '../constants/app-config';

const convertAmountWithDigits = (amount, digits) => Number(amount).toFixed(digits || DIGITS_AFTER_COMMA);

export const isSuccess = response => get(response, 'success');

export const formatAmount = (amount, digits) => convertAmountWithDigits(amount || DEFAULT_AMOUNT, digits);

export const validateKey = event => {
    const evn = event || window.event;
    let key = evn.keyCode || evn.which;

    key = String.fromCharCode(key);

    const regex = /[0-9]|\./;

    if (!regex.test(key)) {
        evn.returnValue = false;
        if (evn.preventDefault) evn.preventDefault();
    }
};
