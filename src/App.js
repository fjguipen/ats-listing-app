import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './commons/components/Cart/CartProvider';
import { Header } from './commons/components/Header';
import { Router } from './Router';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="workspace">
          <Header />
          <Router />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
