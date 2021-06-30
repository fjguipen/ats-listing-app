import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '../../setupTest';
import { ProductDetail } from '../views/ProductDetail';
import { ADD_TO_CART } from '../state/cart/rest/mutations';
import { parsePath } from '../utils';
import { GET_PRODUCT } from '../state/product/rest/queries';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays product detail', async () => {
  server.use(
    rest.get(
      parsePath(GET_PRODUCT.path, { id: 'undefined' }),
      (req, res, ctx) => {
        return res(ctx.json(mockedProduct));
      }
    )
  );
  render(<ProductDetail />);

  await waitFor(() => screen.getByTestId('product-detail'));

  // expect(screen.getAllByTestId('list-item')).toHaveLength(1);
});

test('handles server error', async () => {
  server.use(
    rest.get(
      parsePath(GET_PRODUCT.path, { id: 'undefined' }),
      (req, res, ctx) => {
        return res(ctx.status(500));
      }
    )
  );

  render(<ProductDetail />);

  await waitFor(() => screen.findByTestId('error'));
});

test('handles add to cart', async () => {
  server.use(
    rest.get(
      parsePath(GET_PRODUCT.path, { id: 'undefined' }),
      (req, res, ctx) => {
        return res(ctx.json(mockedProduct));
      }
    )
  );

  const mocked = jest.fn().mockImplementation((req, res, ctx) => {
    return res(ctx.json(mockedProduct));
  });

  server.use(rest.post(ADD_TO_CART.path, mocked));

  render(<ProductDetail />);

  await waitFor(() => screen.findByTestId('add-to-cart'));
  const button = await screen.findByTestId('add-to-cart');
  // console.log(button.click());
  await waitFor(() =>
    fireEvent(
      button,
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )
  );

  expect(mocked).toBeCalled();
});

const mockedProduct = {
  id: 'id',
  brand: 'brand',
  model: 'model',
  cpu: 'cpu',
  ram: 'ram',
  os: 'os',
  displaySize: 'displaySize',
  dsplayResolution: 'dsplayResolution',
  options: {
    colors: [{ code: 1000, name: 'color' }],
    storages: [{ code: 1000, name: 'storages' }]
  },
  battery: 'battery',
  cameras: 'cameras',
  dimentions: 'dimentions',
  primaryCamera: 'primaryCamera',
  primaryCamera: 'secondaryCmera',
  primaryCamera: 'weight'
};
