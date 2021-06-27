import React from 'react';
import { LocalStorage } from '../../../libs/LocalStorage';
import { CartContext } from './context';

export const CartProvider = (props) => {
  const [count, setCount] = React.useState(() => LocalStorage.get('cart') || 0);

  React.useEffect(() => {
    LocalStorage.set('cart', count);
  }, [count]);

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {props.children}
    </CartContext.Provider>
  );
};
