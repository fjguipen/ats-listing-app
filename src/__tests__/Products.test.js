import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen } from '../../setupTest';
import { Products } from '../views/Products';
import { GET_PRODUCTS } from '../state/product/rest/queries';

const server = setupServer(
  rest.get(GET_PRODUCTS.path, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 'mockid',
          model: 'model',
          brand: 'brand',
          price: 222
        }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays products list', async () => {
  render(<Products />);

  await waitFor(() => screen.getByTestId('list'));

  expect(screen.getAllByTestId('list-item')).toHaveLength(1);
});

test('handles server error', async () => {
  server.use(
    rest.get(GET_PRODUCTS.path, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Products />);

  await waitFor(() => screen.findByTestId('error'));
});
