import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BreadCrumbContext } from '../../commons/components/BreadCrumbs/context';
import { List } from '../../commons/components/List';
import { ProductMiniature } from '../../commons/components/ProductMiniature';
import { useQuery } from '../../state/hooks';
import { GET_PRODUCTS } from '../../state/product/rest/queries';
import { getPath, ROUTES } from '../routes';

const searchValues = ['model', 'brand'];

export const Products = (props) => {
  const { t } = useTranslation();
  const { setCrumbs } = React.useContext(BreadCrumbContext);
  const { data, loading, errors } = useQuery(GET_PRODUCTS);
  const [term, setTerm] = React.useState('');

  React.useEffect(() => {
    if (data?.products) {
      setCrumbs([
        {
          path: getPath(ROUTES.PRODUCTS),
          label: 'products'
        }
      ]);
    }
  }, [data]);

  const handleOnChange = (e) => {
    const {
      target: { value }
    } = e;

    setTerm(value);
  };

  if (errors) {
    return <div data-testid="error">{t('error')}</div>;
  }

  if (loading) {
    return <div data-testid="loading">{t('loading')}</div>;
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
