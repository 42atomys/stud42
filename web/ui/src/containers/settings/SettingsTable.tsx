import classNames from 'classnames';
import { SettingsTableFunc, SettingsTableRowFunc } from './types';

export const SettingsTable: SettingsTableFunc = ({ children, className }) => (
  <div className={classNames('space-y-4', className)}>{children}</div>
);

export const SettingsTableRow: SettingsTableRowFunc = ({
  children,
  title,
  description,
  className,
}) => (
  <div
    className={classNames(
      'flex flex-col md:flex-row items-center space-x-4',
      className
    )}
  >
    <p className="flex-1">
      <span className="font-bold">{title}</span>
      {description && (
        <span className="text-slate-400 dark:text-slate-500 block text-sm">
          {description}
        </span>
      )}
    </p>
    {children}
  </div>
);
