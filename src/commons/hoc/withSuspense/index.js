import * as React from 'react';

export const withSuspense = (Component, Fallback) => {
  return (props) => (
    <React.Suspense fallback={'loading'}>
      <Component {...props} />
    </React.Suspense>
  );
};
