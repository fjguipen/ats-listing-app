import * as React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

export const Button = ({
  className,
  disabled,
  handleOnClick,
  label,
  icon,
  type
}) => {
  const { t } = useTranslation();

  return (
    <button
      className={'button ' + (className || '')}
      type={type || 'button'}
      onClick={handleOnClick}
      disabled={disabled}
    >
      <span className="row">
        {icon && <i className="icon material-icons">{icon}</i>}
        {t(label)}
      </span>
    </button>
  );
};
