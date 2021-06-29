import * as React from 'react';
import './style.scss';
import { Cart } from '../Cart';
import { getPath, ROUTES } from '../../../views/routes';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="workspace__header">
      <h1 className="workspace__header__title">
        <Link to={getPath(ROUTES.PRODUCTS)}>Listing APP</Link>
      </h1>
      <Cart className="workspace__header__cart" />
    </div>
  );
};
