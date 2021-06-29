import * as React from 'react';
import { BreadCrumbContext } from './context';

export const BreadCrumbProvider = ({ children }) => {
  const [crumbs, setCrumbs] = React.useState([]);
  return (
    <BreadCrumbContext.Provider value={{ crumbs, setCrumbs }}>
      {children}
    </BreadCrumbContext.Provider>
  );
};
