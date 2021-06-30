import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { CartProvider } from './src/commons/components/Cart/CartProvider';
import * as React from 'react';
import { BreadCrumbProvider } from './src/commons/components/BreadCrumbs/BreadCrumbProvider';
import fetch from 'node-fetch';
import { BrowserRouter } from 'react-router-dom';
global.fetch = fetch;

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    };
  }
}));

jest.mock('./src/libs/IndexedDB');

const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <CartProvider>
        <BreadCrumbProvider>{children}</BreadCrumbProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
