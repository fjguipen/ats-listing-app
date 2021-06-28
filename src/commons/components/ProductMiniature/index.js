import * as React from 'react';
import { Link } from 'react-router-dom';
import { getPath, ROUTES } from '../../../views/routes';
import { Image } from '../Image';
import './style.scss';

export const ProductMiniature = ({ item }) => {
  const { id, imgUrl, model, price, brand } = item;
  return (
    <article className="miniature product-miniature">
      <Link to={getPath(ROUTES.PRODUCT_DETAIL, { deviceId: id })}>
        <div className="portrait miniature__portrait">
          <Image src={imgUrl} alt={model} />
        </div>
        <div className="content miniature_content">
          <h2 className="label">
            {brand} - {model}
          </h2>
          <span className="price">{price}$</span>
        </div>
      </Link>
    </article>
  );
};
