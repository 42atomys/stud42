import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useState } from 'react';
import { PropsWithClassName } from 'types/globals';
import { SelectInputProps } from './types';

export const SelectInput: React.FC<
  PropsWithClassName<SelectInputProps<string>>
> = ({ objects, selectedValue, onChange, className, defaultValue }) => {
  const [value, setValue] = useState(selectedValue);
  const onChangeCallback = (newValue: typeof selectedValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Listbox
      value={value}
      onChange={onChangeCallback}
      defaultValue={defaultValue}
    >
      <div className={classNames('relative', className)}>
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate lowercase first-letter:uppercase">
            {value}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <i
              className="h-5 w-5 text-slate-400 fa-light fa-sort"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 w-full mt-2 origin-top-right bg-slate-50 dark:bg-slate-900 divide-y divide-gray-100 dark:divide-slate-800/75 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {objects.map((object, objectId) => (
              <div
                className="px-1 py-1"
                key={`select-input-${objects}-${objectId}`}
              >
                <Listbox.Option
                  className={({ active }) =>
                    classNames(
                      'hover:bg-indigo-500 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm',
                      { 'bg-indigo-500 text-white': active }
                    )
                  }
                  value={object}
                >
                  {({ selected }) => (
                    <>
                      {selected ? (
                        <i className="fa-light fa-fw fa-check pr-2"></i>
                      ) : null}
                      <span className="block truncate lowercase first-letter:uppercase">
                        {object}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              </div>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
