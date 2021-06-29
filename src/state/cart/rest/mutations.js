import { cartMachine } from '../store';

export const ADD_TO_CART = {
  path: '/cart',
  method: 'POST',
  machine: cartMachine
};
