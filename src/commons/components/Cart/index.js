import * as React from 'react';
import { CartContext } from './state/context';

export const Cart = ({ className }) => {
  const { state } = React.useContext(CartContext);

  return (
    <div data-testid="cart" className={'cart ' + (className || '')}>
      <span className="material-icons">shopping_cart</span>
      {state.total}
    </div>
  );
};
