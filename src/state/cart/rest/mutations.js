import { API_HEROKU_URL } from '../../../commons/env';
import { cartMachine } from '../store';

export const ADD_TO_CART = {
  path: API_HEROKU_URL + '/cart',
  method: 'POST',
  machine: cartMachine
};
