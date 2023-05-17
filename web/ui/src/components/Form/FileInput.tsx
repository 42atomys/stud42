import classNames from 'classnames';
import { useState } from 'react';
import { PropsWithClassName } from 'types/globals';
import { FileInputProps } from './types';
export const FileInput: React.FC<
  PropsWithClassName<
    Omit<FileInputProps<EventTarget & HTMLInputElement>, 'label'>
  >
> = ({ onChange, className, defaultValue, name, ...inputProps }) => {
  const [, setValue] = useState(defaultValue || '');
  const onChangeCallback = (newValue: EventTarget & HTMLInputElement) => {
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
      <label
        htmlFor={inputId}
        className="flex flex-1 justify-center w-full p-4 transition text-slate-500 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-md appearance-none cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 focus:outline-none"
      >
        <span className="flex items-center space-x-2">
          <i className="fa-light fa-cloud-arrow-up" />
          <span className="font-medium">
            Drop file here, or
            <span className="text-indigo-500 underline px-1">browse</span>
          </span>
        </span>
      </label>
      <input
        type="file"
        onChange={(e) => onChangeCallback(e.target)}
        id={inputId}
        className="hidden"
        {...inputProps}
      />
    </div>
  );
};
