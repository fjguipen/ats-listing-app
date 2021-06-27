import * as React from 'react';
import { ProductMiniature } from '../../commons/components/ProductMiniature';
import { useQuery } from '../../state/hooks';
import { GET_PRODUCTS } from '../../state/product/rest/queries';

export const Products = (props) => {
  const { data, loading, errors } = useQuery(GET_PRODUCTS);

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  if (errors) {
    return <>Error</>;
  }

  return (
    <>
      <div className="search">Buscar</div>
      <ul className="products-list">
        {data?.products
          ?.filter((p) => p.price)
          .map((item) => (
            <ProductMiniature key={item.id} product={item} />
          ))}
      </ul>
    </>
  );
};
