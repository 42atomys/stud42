import { ColorDisplay } from '@components/ColorDisplay';
import classNames from 'classnames';
import type { DataType } from 'csstype';
import { useState } from 'react';
import { PropsWithClassName } from 'types/globals';
import { InputProps } from './types';

export const ColorInput: React.FC<
  PropsWithClassName<InputProps<DataType.Color>>
> = ({
  onChange,
  className,
  defaultValue,
  label: labelName,
  name,
  ...inputProps
}) => {
  const [value, setValue] = useState<DataType.Color>(
    defaultValue || 'transparent',
  );
  const onChangeCallback = (newValue: DataType.Color) => {
    setValue(newValue);
    onChange(newValue);
  };

  // set an identifier for the input name as url-safe slug
  const inputId = name?.replace(/[^a-z0-9]/gi, '-').toLowerCase();

  return (
    <div
      className={classNames(
        className,
        'rounded-md relative text-left px-3 pt-2.5 pb-1.5 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-800 focus-within:ring-2 focus-within:ring-indigo-500',
      )}
    >
      <label htmlFor={inputId} className="flex text-xs text-slate-500">
        <span>{labelName}</span>
        <ColorDisplay className="mt-2" color={value} />
      </label>
      <input
        type="color"
        onChange={(e) => onChangeCallback(e.target.value)}
        value={value}
        id={inputId}
        className="invisible w-0 h-0 absolute focus:outline-none border-0 p-0 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        {...inputProps}
      />
    </div>
  );
};
