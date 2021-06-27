import * as React from 'react';
import './style.scss';
import { CartContext } from './context';

export const Cart = ({ className }) => {
  const { count } = React.useContext(CartContext);

  return (
    <div className={'cart-display ' + (className || '')}>
      <span className="material-icons">shopping_cart</span>
      {count}
    </div>
  );
};
