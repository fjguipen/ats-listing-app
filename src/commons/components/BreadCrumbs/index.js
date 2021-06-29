import * as React from 'react';
import './style.scss';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BreadCrumbContext } from './context';

export const BreadCrumbs = (props) => {
  const { t } = useTranslation();
  const { crumbs } = React.useContext(BreadCrumbContext);
  return (
    <div className="bread-crumb">
      {crumbs.map((crumb, i) => {
        return i < crumbs.length - 1 ? (
          <React.Fragment key={crumb.label}>
            <Link to={crumb.path}>{t(crumb.label)}</Link>
            <span className="separator">&gt;</span>
          </React.Fragment>
        ) : (
          <span key={crumb.label}>{t(crumb.label)}</span>
        );
      })}
    </div>
  );
};
