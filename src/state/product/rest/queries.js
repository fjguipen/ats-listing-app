import { productsMachine, productMachine } from '../store';

export const GET_PRODUCTS = {
  path: '/product',
  method: 'GET',
  expiration: 1 * 60 * 60,
  machine: productsMachine
};

export const GET_PRODUCT = {
  path: '/product/{{id}}',
  method: 'GET',
  expiration: 1 * 60 * 60,
  machine: productMachine
};
