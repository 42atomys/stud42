import classNames from 'classnames';
import { useState } from 'react';
import { ClassNameProps } from 'types/globals';
import { TextInputProps } from './types';

export const TextInput: React.FC<
  TextInputProps<string & {}> & ClassNameProps
> = ({
  onChange,
  className,
  defaultValue,
  label: labelName,
  name,
  ...inputProps
}) => {
  const [value, setValue] = useState(defaultValue || '');
  const onChangeCallback = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  // set an identifier for the input name as url-safe slug
  const inputId = name.replace(/[^a-z0-9]/gi, '-').toLowerCase();

  return (
    <div
      className={classNames(
        className,
        'rounded-md text-left px-3 pt-2.5 pb-1.5 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-800 focus-within:ring-2 focus-within:ring-indigo-500'
      )}
    >
      {labelName && (
        <label htmlFor={inputId} className="block text-xs text-slate-500">
          {labelName}
        </label>
      )}
      <input
        onChange={(e) => onChangeCallback(e.target.value)}
        value={value}
        id={inputId}
        className="block w-full focus:outline-none border-0 p-0 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        {...inputProps}
      />
    </div>
  );
};

export default TextInput;
