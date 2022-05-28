import {
  useCreateFriendshipMutation,
  useDeleteFriendshipMutation,
} from '@graphql.d';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { DropdownMenuComponent } from './types';

const DropdownMenu: DropdownMenuComponent = ({
  userID,
  isFriend = false,
  buttonAlwaysShow = false,
  refetchQueries = [],
}) => {
  const [deleteFriendship] = useDeleteFriendshipMutation();
  const [addFriendship] = useCreateFriendshipMutation();

  return (
    <div className="text-right absolute top-2 right-2">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-center w-full">
          <i
            className={classNames(
              'fa-light fa-ellipsis-vertical w-[18px] h-[18px] text-lg rounded-full p-2 hover:text-indigo-800 dark:hover:text-indigo-200 hover:bg-indigo-500/20',
              buttonAlwaysShow ? 'visible' : 'invisible group-hover:visible'
            )}
          ></i>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={classNames(
              'absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-slate-900 divide-y divide-gray-100 dark:divide-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
              buttonAlwaysShow ? 'visible' : 'invisible group-hover:visible'
            )}
          >
            <div className="px-1 py-1">
              {!isFriend && (
                <Menu.Item>
                  <button
                    onClick={() => {
                      addFriendship({
                        variables: { userID: userID },
                        refetchQueries: refetchQueries,
                      });
                    }}
                    className="hover:bg-indigo-500 hover:text-white text-indigo-500 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                  >
                    <i className="fa-light fa-user-plus pr-2"></i>
                    <span>Add Friend</span>
                  </button>
                </Menu.Item>
              )}
              {isFriend && (
                <Menu.Item>
                  <button
                    onClick={() => {
                      deleteFriendship({
                        variables: { userID: userID },
                        refetchQueries: refetchQueries,
                      });
                    }}
                    className="hover:bg-red-500 hover:text-white text-red-500 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                  >
                    <i className="fa-light fa-user-xmark pr-2"></i>
                    <span>Remove Friend</span>
                  </button>
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownMenu;
