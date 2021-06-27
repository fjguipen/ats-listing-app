import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
// i18n translations might still be loaded by the http backend
// use react's Suspense
export default function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
