import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '../../state/hooks';
import { GET_PRODUCT } from '../../state/product/rest/queries';
import { getPath, ROUTES } from '../routes';

export const ProductDetail = (props) => {
  const { deviceId } = useParams();
  const { data, loading, errors } = useQuery(GET_PRODUCT, {
    variables: {
      id: deviceId
    }
  });

  return (
    <>
      <Link to={getPath(ROUTES.PRODUCTS)}>Back</Link>
      <br />
      <br />
      {data?.product && <div className="product">{data.product.model}</div>}
    </>
  );
};
