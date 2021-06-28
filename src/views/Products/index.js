import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { List } from '../../commons/components/List';
import { ProductMiniature } from '../../commons/components/ProductMiniature';
import { useQuery } from '../../state/hooks';
import { GET_PRODUCTS } from '../../state/product/rest/queries';

const searchValues = ['model', 'brand'];

export const Products = (props) => {
  const { t } = useTranslation();
  const { data, loading, errors } = useQuery(GET_PRODUCTS);
  const [term, setTerm] = React.useState('');

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const handleOnChange = (e) => {
    const {
      target: { value }
    } = e;

    setTerm(value);
  };

  if (errors) {
    return <>Error</>;
  }

  return (
    <>
      <div className="search">
        <input
          value={term}
          onChange={handleOnChange}
          placeholder={t('actions.search')}
        />
      </div>
      <div className="products-list">
        {data?.products?.length > 0 && (
          <List
            items={data.products.filter((p) => p.price)}
            filter={{
              term,
              searchValues: searchValues
            }}
            pageSize={48}
          >
            <ProductMiniature></ProductMiniature>
          </List>
        )}
      </div>
    </>
  );
};
