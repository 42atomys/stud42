import { LoaderSpinner } from '@components/Loader';
import Name from '@components/Name';
import { User, useSearchUserQuery } from '@graphql.d';
import { Combobox } from '@headlessui/react';
import useDebounce from '@lib/useDebounce';
import classNames from 'classnames';
import { useState } from 'react';
import { SearchComponent } from './types';

export const Search: SearchComponent = ({
  placeholder,
  action,
  searchVariables,
  icon,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useDebounce('', 200);

  const { data } = useSearchUserQuery({
    skip: !query,
    variables: {
      query: query,
      ...searchVariables,
    },
  });
  const { searchUser: users = [] } = data || {};

  return (
    <div className="mb-2">
      <div
        key="search-engine-container"
        className="relative flex focus-within:border-indigo-500 border-2 border-transparent transition-all flex-row items-center bg-slate-200 dark:bg-slate-900 p-2 rounded"
      >
        <Combobox
          value={selectedUser}
          nullable
          onChange={(user) => {
            if (!user) return;
            setLoader(true);
            setSelectedUser(user);

            action(user).finally(() => setLoader(false));
          }}
        >
          {({ open }) => (
            <>
              <Combobox.Input
                onChange={(e) => {
                  setQuery(e.currentTarget.value);
                }}
                type="text"
                className="bg-transparent flex-1 focus:outline-none peer placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder={placeholder}
                maxLength={20}
              />
              <div
                className={classNames(
                  open ? 'visible' : 'invisible',
                  'contents'
                )}
              >
                <Combobox.Options
                  static
                  className="absolute top-[100%] left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 dark:bg-slate-900 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {users.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    users.map((user) => (
                      <Combobox.Option
                        key={user.id}
                        className={({ active }) =>
                          `relative select-none py-2 px-4 cursor-pointer group ${
                            active
                              ? 'bg-indigo-600 text-white [&>span>span]:text-white'
                              : 'text-slate-200'
                          }`
                        }
                        value={user}
                      >
                        <span className={`flex truncate font-normal`}>
                          <span
                            className={classNames(
                              'font-bold flex-1 mr-2',
                              'text-slate-700 dark:text-slate-300'
                            )}
                          >
                            {user.duoLogin}
                          </span>
                          <Name
                            className="text-slate-500 group-hover:text-slate-200"
                            user={user}
                          />
                        </span>
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </div>
            </>
          )}
        </Combobox>
        <i
          className={classNames(
            loader
              ? 'hidden'
              : `${icon} absolute right-0 px-2 fa-light cursor-pointer transition-all opacity-100 peer-focus:opacity-0 peer-focus:scale-125 peer-focus:text-indigo-500`
          )}
        />
        <i
          className={classNames(
            loader
              ? 'hidden'
              : 'absolute right-0 fa-regular fa-arrow-turn-down-left px-[0.6rem] pt-[0.1rem] cursor-pointer transition-all opacity-0 peer-focus:opacity-100 peer-focus:scale-125 peer-focus:text-indigo-500'
          )}
        />
        <span
          className={
            loader
              ? 'absolute right-0 bg-white dark:bg-slate-900 z-10'
              : 'hidden'
          }
        >
          <LoaderSpinner />
        </span>
      </div>
    </div>
  );
};
