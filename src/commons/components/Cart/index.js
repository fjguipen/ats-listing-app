import * as React from 'react';
import { CartContext } from './state/context';

export const Cart = ({ className }) => {
  const { state } = React.useContext(CartContext);

  return (
    <div className={'cart ' + (className || '')}>
      <span
        onClick={() => setShowResume((prev) => !prev)}
        className="material-icons"
      >
        shopping_cart
      </span>
      {state.total}
    </div>
  );
};
