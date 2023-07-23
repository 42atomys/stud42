import classNames from 'classnames';
import { useRef, useState } from 'react';
import { PropsWithClassName } from 'types/globals';
import { TextInputProps } from './types';

export const TextInput: React.FC<
  PropsWithClassName<TextInputProps<string & {}>>
> = ({
  onChange,
  className,
  defaultValue,
  label: labelName,
  name,
  debounce = 0,
  ...inputProps
}) => {
  const [value, setValue] = useState(defaultValue || '');
  const timeout = useRef<NodeJS.Timeout>();
  const onChangeCallback = (newValue: string) => {
    setValue(newValue);

    if (debounce === 0) return onChange(newValue);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      onChange(newValue);
    }, debounce);
  };

  // set an identifier for the input name as url-safe slug
  const inputId = name.replace(/[^a-z0-9]/gi, '-').toLowerCase();

  return (
    <div
      key={`text-input-${inputId}`}
      className={classNames(
        className,
        'rounded-md text-left px-3 pt-2.5 pb-1.5 shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-800 focus-within:ring-2 focus-within:!ring-indigo-500',
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
