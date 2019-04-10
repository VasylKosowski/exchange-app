import get from 'lodash/get';

export const isSuccess = response => get(response, 'success');