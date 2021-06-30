import { API_HEROKU_URL } from '../../../commons/env';
import { productsMachine, productMachine } from '../store';

export const GET_PRODUCTS = {
  path: API_HEROKU_URL + '/product',
  method: 'GET',
  expiration: 1 * 60 * 60,
  machine: productsMachine
};

export const GET_PRODUCT = {
  path: API_HEROKU_URL + '/product/{{id}}',
  method: 'GET',
  expiration: 1 * 60 * 60,
  machine: productMachine
};
