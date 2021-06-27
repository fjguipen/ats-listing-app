import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LayoutWithSuspense } from './commons/components/Layout';
import { getPath, routesConfig, ROUTES } from './views/routes';

export const Router = () => {
  return (
    <Switch>
      {routesConfig.map((route) => (
        <Route key={route.id} exact path={route.path}>
          <LayoutWithSuspense
            id={route.id}
            component={route.component}
            metaTags={route.metaTags}
          />
        </Route>
      ))}
      <Route path="/" exact>
        <Redirect to={getPath(ROUTES.PRODUCTS)} />
      </Route>
      <Route
        path="*"
        render={(props) => (
          <LayoutWithSuspense
            {...props}
            component={() => {
              return <>Not found</>;
            }}
            pageName="e404"
          />
        )}
      />
    </Switch>
  );
};
