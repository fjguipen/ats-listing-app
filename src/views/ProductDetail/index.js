import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { BreadCrumbContext } from '../../commons/components/BreadCrumbs/context';
import { Button } from '../../commons/components/Button';
import { CartContext } from '../../commons/components/Cart/state/context';
import { Image } from '../../commons/components/Image';
import { ADD_TO_CART } from '../../state/cart/rest/mutations';
import { useMutation, useQuery } from '../../state/hooks';
import { GET_PRODUCT } from '../../state/product/rest/queries';
import { getPath, ROUTES } from '../routes';

const DESC_KEYS = [
  'brand',
  'model',
  'cpu',
  'ram',
  'os',
  'displaySize',
  'dsplayResolution',
  'battery',
  'cameras',
  'dimentions',
  'primaryCamera',
  'secondaryCmera',
  'weight'
];

export const ProductDetail = (props) => {
  const { t } = useTranslation();
  const { setCrumbs } = React.useContext(BreadCrumbContext);
  const { deviceId } = useParams();
  const { dispatch } = React.useContext(CartContext);
  const { data, errors, loading } = useQuery(GET_PRODUCT, {
    variables: {
      id: deviceId
    }
  });

  const [color, setColor] = React.useState('');
  const [storage, setStorage] = React.useState('');

  const [addToCart, { loading: busy }] = useMutation(ADD_TO_CART);

  React.useEffect(() => {
    if (data?.product) {
      setCrumbs([
        {
          path: getPath(ROUTES.PRODUCTS),
          label: 'products'
        },
        {
          path: getPath(ROUTES.PRODUCT_DETAIL, { deviceId: data.product.id }),
          label: data.product.model
        }
      ]);
    }
  }, [data]);

  const handleAddToCart = async () => {
    try {
      if (data?.product && color && storage) {
        const { product } = data;
        const result = await addToCart({
          variables: {
            id: product.id,
            colorCode: parseInt(color, 10),
            storageCode: parseInt(storage, 10)
          }
        });

        dispatch({
          type: 'add',
          payload: {
            item: product,
            count: result.count
          }
        });
      }
    } catch (err) {
      // console.log(err);
    }
  };

  if (errors) {
    return <div data-testid="error">{t('error')}</div>;
  }

  if (loading) {
    return <div data-testid="loading">{t('loading')}</div>;
  }

  const { product } = data;

  return (
    <>
      {data?.product && (
        <div className="product-detail " data-testid="product-detail">
          <Link to={getPath(ROUTES.PRODUCTS)} className="go-back row">
            <i className="material-icons">keyboard_arrow_left</i>
            {t('actions.goBack')}
          </Link>
          <div className="wrapper">
            <div className="wrapper__image">
              <Image src={product.imgUrl} alt={product.model} />
            </div>
            <div className="wrapper__content">
              <div className="wrapper__content__description">
                <h2 className="title">{t('details')}</h2>
                <ul>
                  {Object.keys(product)
                    .filter((key) => DESC_KEYS.includes(key))
                    .map((key) => {
                      return (
                        <li key={key} className="bullet">
                          {t(key)}: {product[key]}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="wrapper__content__actions">
                <div>
                  <Select
                    options={product.options.colors}
                    handleOnChange={(event) => {
                      const {
                        target: { value }
                      } = event;
                      setColor(value);
                    }}
                  />
                </div>
                <div>
                  <Select
                    options={product.options.storages}
                    handleOnChange={(event) => {
                      const {
                        target: { value }
                      } = event;
                      setStorage(value);
                    }}
                  />
                </div>
                <div className="buy row">
                  <span className="price">$ {product.price}</span>
                  <Button
                    className="secondary"
                    handleOnClick={handleAddToCart}
                    disabled={busy}
                    icon={'shopping_bag'}
                    label={'actions.addToCart'}
                    dataTestid={'add-to-cart'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Select = ({ handleOnChange, options }) => {
  React.useEffect(() => {
    handleOnChange({
      target: {
        value: options[0].code
      }
    });
  }, []);
  return (
    <select
      className="select"
      type="select"
      onChange={handleOnChange}
      defaultValue={options[0].code}
    >
      {options.map((opt, i) => {
        return (
          <option key={opt.code} value={opt.code}>
            {opt.name}
          </option>
        );
      })}
    </select>
  );
};
