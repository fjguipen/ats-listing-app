import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { withSuspense } from '../../hoc/withSuspense';
import { Helmet } from 'react-helmet';

export const Layout = ({ component, metaTags, ...props }) => {
  const { t } = useTranslation();
  const Component = component;

  return (
    <>
      <Helmet>{metaTags?.title && <title>{t(metaTags.title)}</title>}</Helmet>
      <Component />
    </>
  );
};

export const LayoutWithSuspense = withSuspense(Layout);
