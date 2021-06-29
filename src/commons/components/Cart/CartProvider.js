import React from 'react';
import { LocalStorage } from '../../../libs/LocalStorage';
import { CartContext, DEFAULT_CONTEXT } from './state/context';
import { reducer } from './state/reducer';

const initialCartState = () => {
  return LocalStorage.get('cart') || DEFAULT_CONTEXT;
};

export const CartProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialCartState());

  React.useEffect(() => {
    LocalStorage.set('cart', state);
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};
