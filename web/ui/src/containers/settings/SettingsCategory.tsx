import classNames from 'classnames';
import React from 'react';
import { PropsWithClassName } from 'types/globals';
import { SettingsCategoryProps } from './types';

export const SettingsCategory: React.FC<
  React.PropsWithChildren<PropsWithClassName<SettingsCategoryProps>>
> = ({ children, title, description, className }) => (
  <div className={classNames('my-6', className)}>
    <h1 className="text-2xl font-bold font-display">{title}</h1>
    <p className="text-slate-400 dark:text-slate-500 mb-4">{description}</p>
    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-slate-200 dark:shadow-slate-900 shadow-sm p-4">
      {children}
    </div>
  </div>
);

export default SettingsCategory;
