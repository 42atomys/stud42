import classNames from 'classnames';
import { useState } from 'react';
import { SwitchProps } from './types';

export const Switch: React.FC<
  React.PropsWithChildren<SwitchProps<boolean>>
> = ({ children, defaultValue, onChange, color, ...props }) => {
  const [isChecked, setIsChecked] = useState(defaultValue || false);
  const toggle = () => {
    setIsChecked(!isChecked);
    onChange?.(!isChecked);
  };
  const switchColorStyle = { backgroundColor: color };
  return (
    <>
      <button
        onClick={toggle}
        style={color && isChecked ? switchColorStyle : {}}
        className={`${
          isChecked
            ? classNames({ 'bg-indigo-500': !color })
            : 'bg-slate-200 dark:bg-slate-800'
        } relative inline-flex h-6 w-12 p-0.5 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        {...props}
      >
        <input
          type="checkbox"
          className="sr-only"
          readOnly={true}
          checked={isChecked}
        />
        <span
          aria-hidden="true"
          style={color && !isChecked ? switchColorStyle : {}}
          className={`${
            isChecked
              ? 'translate-x-6 bg-white'
              : classNames({ 'bg-indigo-500': !color }, 'translate-x-0')
          }
            pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-sm ring-0 transition duration-200 ease-in-out shadow-slate-400 dark:shadow-slate-800`}
        />
      </button>
      {children}
    </>
  );
};
