import * as React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../../state/hooks';
import { GET_PRODUCTS } from '../../state/product/rest/queries';

export const Devices = (props) => {
  const { data, loading, errors } = useQuery(GET_PRODUCTS);

  if (errors) {
    return <>Error</>;
  }

  return (
    <>
      <div className="search">Buscar</div>
      <ul className="list">
        {data?.products?.map((item) => (
          <Link key={item.id} to={`/devices/${item.id}`}>
            <li>{item.model}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};
