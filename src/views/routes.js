import { ProductDetail } from './ProductDetail';
import { Products } from './Products';

export const ROUTES = {
  PRODUCTS: 'products',
  PRODUCT_DETAIL: 'product-detail'
};

export const routesConfig = [
  {
    id: ROUTES.PRODUCTS,
    path: '/products',
    component: Products,
    metaTags: {
      title: 'metas.devices.title'
    }
  },
  {
    id: ROUTES.PRODUCT_DETAIL,
    path: '/products/:deviceId',
    component: ProductDetail,
    metaTags: {
      title: 'metas.device.title'
    }
  }
];

export const getPath = (page, args = {}) => {
  const target = routesConfig.find((r) => r.id === page);
  if (!target) {
    throw new Error('Invalid route');
  }
  let path = target.path;

  for (let arg in args) {
    path = path.replace(`:${arg}`, args[arg]);
  }

  return path;
};
