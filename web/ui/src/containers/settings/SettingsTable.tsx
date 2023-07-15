import { SponsorHint } from '@components/Sponsors';
import classNames from 'classnames';
import React, { Children } from 'react';
import { PropsWithClassName } from 'types/globals';
import { SettingsTableRowProps } from './types';

export const SettingsTable: React.FC<
  React.PropsWithChildren<PropsWithClassName>
> = ({ children, className }) => (
  <div className={classNames('space-y-4', className)}>{children}</div>
);

export const SettingsTableRow: React.FC<
  PropsWithClassName<SettingsTableRowProps>
> = ({ children, title, description, className, isSponsorOnly }) => (
  <div className="">
    <div
      className={classNames(
        'flex flex-col md:flex-row items-center space-x-4',
        className
      )}
    >
      <div className="flex-1">
        <div className="font-bold flex flex-row space-x-2">
          <span>{title}</span>
          {isSponsorOnly && <SponsorHint />}
        </div>
        {description && (
          <span className="text-slate-400 dark:text-slate-500 block text-sm">
            {description}
          </span>
        )}
      </div>
      {Children.map(children, (c) => (
        <>{c}</>
      ))}
    </div>
  </div>
);
