import classNames from 'classnames';
import type { DataType } from 'csstype';
import { Maybe, PropsWithClassName } from 'types/globals';

export const ColorDisplay: React.FC<PropsWithClassName<{ color: Maybe<DataType.Color> }>> = ({ color, className }) => (
  <div
    className={classNames(
      'w-3 h-3 rounded-full outline outline-2 outline-offset-2 outline-slate-300 dark:outline-slate-700',
      className
    )}
    style={{
      backgroundColor: color || 'transparent',
      outlineColor: color || undefined,
    }}
  />
);