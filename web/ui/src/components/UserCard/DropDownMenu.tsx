import { FriendsGroupManageModal } from '@containers/friends';
import { useMe } from '@ctx/currentUser';
import {
  FriendsPageDocument,
  useCreateFriendshipMutation,
  useDeleteFriendshipMutation,
} from '@graphql.d';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { PropsWithClassName } from 'types/globals';
import { DropdownMenuProps } from './types';

const DropdownMenu: React.FC<PropsWithClassName<DropdownMenuProps>> = ({
  user,
  buttonAlwaysShow = false,
  className,
}) => {
  // TODO: use a better way to prevent usage of refetchQueries in the future
  const isFriendsPage = useRouter().asPath.startsWith('/friends');
  const [deleteFriendship] = useDeleteFriendshipMutation({
    refetchQueries: isFriendsPage ? [FriendsPageDocument] : [],
    awaitRefetchQueries: true,
  });
  const [addFriendship] = useCreateFriendshipMutation({
    refetchQueries: isFriendsPage ? [FriendsPageDocument] : [],
    awaitRefetchQueries: true,
  });
  const { isFollowed, refetchMe } = useMe();

  return (
    <div className={classNames('text-right absolute top-2 right-2', className)}>
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <div>
            <Menu.Button className="inline-flex justify-center items-center w-[2em] h-[2em] text-lg rounded-full p-2 hover:text-indigo-800 dark:hover:text-indigo-200 hover:bg-indigo-500/20">
              <i
                className={classNames(
                  'fa-light fa-ellipsis-vertical fa-fw',
                  buttonAlwaysShow || open
                    ? 'visible'
                    : 'invisible group-hover:visible',
                )}
              ></i>
            </Menu.Button>
            <Menu.Items
              static
              className={classNames(
                'absolute flex flex-col space-y-2 right-0 w-56 origin-top-right bg-slate-50 dark:bg-slate-950 divide-y divide-gray-100 dark:divide-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
                open ? 'visible flex' : 'invisible hidden',
              )}
            >
              <div className="px-1 py-1 flex flex-col">
                <Menu.Item as={'div'}>
                  <a
                    className="hover:bg-indigo-500 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm"
                    href={`https://profile.intra.42.fr/users/${user.duoLogin}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-light fa-fw fa-address-card pr-2"></i>
                    <span>Show Intranet Profile</span>
                  </a>
                </Menu.Item>
                <Menu.Item as={'div'}>
                  <a
                    className="hover:bg-indigo-500 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm"
                    href={`https://42born2code.slack.com/messages/@${user.duoLogin}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-fw fa-slack pr-2"></i>
                    <span>Contact on Slack</span>
                  </a>
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                {!isFollowed(user) && (
                  <Menu.Item as={'div'}>
                    <button
                      onClick={() => {
                        addFriendship({
                          variables: { userID: user.id },
                          onCompleted: () => {
                            refetchMe();
                          },
                        });
                      }}
                      className="hover:bg-indigo-500 hover:text-white text-indigo-500 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                    >
                      <i className="fa-light fa-fw fa-user-plus pr-2"></i>
                      <span>Add Friend</span>
                    </button>
                  </Menu.Item>
                )}
                {isFollowed(user) && (
                  <>
                    <Menu.Item as={'div'}>
                      <FriendsGroupManageModal
                        userID={user.id}
                        duoLogin={user.duoLogin}
                      >
                        <button className="hover:bg-indigo-500 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm">
                          <i className="fa-light fa-fw fa-user-group pr-2"></i>
                          <span>Manage Friends Groups</span>
                        </button>
                      </FriendsGroupManageModal>
                    </Menu.Item>
                    <Menu.Item as={'div'}>
                      <button
                        onClick={() => {
                          deleteFriendship({
                            variables: { userID: user.id },
                            onCompleted: () => {
                              refetchMe();
                            },
                          });
                        }}
                        className="hover:bg-red-500 hover:text-white text-red-500 group flex rounded-md items-center w-full px-2 py-2 text-sm"
                      >
                        <i className="fa-light fa-fw fa-user-xmark pr-2"></i>
                        <span>Remove Friend</span>
                      </button>
                    </Menu.Item>
                  </>
                )}
              </div>
            </Menu.Items>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
