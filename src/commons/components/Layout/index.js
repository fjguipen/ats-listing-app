import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { withSuspense } from '../../hoc/withSuspense';
import { Helmet } from 'react-helmet';
import { BreadCrumbs } from '../BreadCrumbs';
import { BreadCrumbContext } from '../BreadCrumbs/context';

export const Layout = ({ id, component, metaTags }) => {
  const { t } = useTranslation();
  const { setCrumbs } = React.useContext(BreadCrumbContext);
  const Component = component;

  // Reset scroll on route change
  React.useEffect(() => {
    return () => {
      setCrumbs([]);
      window.scrollTo({
        top: 0
      });
    };
  }, []);

  return (
    <>
      <Helmet>{metaTags?.title && <title>{t(metaTags.title)}</title>}</Helmet>
      <main id={id} className="workspace__layout">
        <BreadCrumbs />
        <Component />
      </main>
    </>
  );
};

export const LayoutWithSuspense = withSuspense(Layout);
