import classNames from 'classnames';
import type { DataType } from 'csstype';
import { useState } from 'react';
import { ClassNameProps } from 'types/globals';
import { InputProps } from './types';

export const ColorDisplay: React.FC<
  { color: DataType.Color | null | undefined } & ClassNameProps
> = ({ color, className }) => (
  <div
    className={classNames(
      'w-3 h-3 rounded-full outline outline-2 outline-offset-2',
      className
    )}
    style={{
      backgroundColor: color || 'transparent',
      outlineColor: color || '#64748b',
    }}
  />
);

export const ColorInput: React.FC<
  InputProps<DataType.Color> & ClassNameProps
> = ({
  onChange,
  className,
  defaultValue,
  label: labelName,
  ...inputProps
}) => {
  const [value, setValue] = useState<DataType.Color | undefined>(defaultValue);
  const onChangeCallback = (newValue: DataType.Color) => {
    setValue(newValue);
    onChange(newValue);
  };

  // set an identifier for the input name as url-safe slug
  const inputId = inputProps.name?.replace(/[^a-z0-9]/gi, '-').toLowerCase();

  return (
    <div
      className={classNames(
        className,
        'rounded-md relative text-left px-3 pt-2.5 pb-1.5 shadow-sm ring-1 ring-inset ring-slate-800 focus-within:ring-2 focus-within:ring-indigo-600'
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

export default ColorInput;
