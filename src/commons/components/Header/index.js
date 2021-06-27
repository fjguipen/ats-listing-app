import * as React from 'react';
import './style.scss';
import { Cart } from '../Cart';

export const Header = () => {
  return (
    <div className="workspace__header">
      <h1 className="workspace__header__title">Listing APP</h1>
      <Cart className="workspace__header__cart" />
    </div>
  );
};
