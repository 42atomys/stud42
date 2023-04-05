import { Switch } from '@components/Form';
import {
  FollowsGroup,
  FollowsGroupManageModalDocument,
  useAssignFollowsGroupToUserMutation,
  useFollowsGroupManageModalQuery,
} from '@graphql.d';
import { Dialog } from '@headlessui/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const FriendGroupItem: React.FC<{
  group: FollowsGroup;
  userID: string;
  assigned: boolean;
}> = ({ group, userID, assigned: currentlyAssigned }) => {
  const [assigned, setAssigned] = useState(currentlyAssigned);
  const [submitMutation, { loading }] = useAssignFollowsGroupToUserMutation({
    refetchQueries: [FollowsGroupManageModalDocument],
  });

  return (
    <div className="flex flex-row items-center my-1">
      <Switch
        defaultValue={assigned}
        disabled={loading}
        color={group.color || undefined}
        onChange={(checked) => {
          setAssigned(checked);
          submitMutation({
            variables: {
              assign: checked,
              followsGroupID: group.id,
              userID: userID,
            },
          });
        }}
      >
        <span className="ml-2">{group.name}</span>
      </Switch>
    </div>
  );
};

/**
 * Modal to add a new group of friends or edit an existing one.
 * @param props
 * @param props.children must contain a button to open the modal. The logical is
 *                       handled by this component.
 * @returns
 */
export const FriendsGroupManageModal: React.FC<
  React.PropsWithChildren<{ userID: string; duoLogin: string }>
> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: { myFollowsGroups = [], followsGroupsForUser = [] } = {},
    loading,
    error,
  } = useFollowsGroupManageModalQuery({
    skip: !isOpen,
    variables: {
      userID: props.userID,
    },
  });

  return (
    <>
      <a onClick={() => setIsOpen(true)}>{children}</a>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50"
          >
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                      <i
                        className="fa-light fa-user-group fa-fw fa-lg text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                      >
                        Manage friends group for{' '}
                        <span className="text-indigo-500">
                          {props.duoLogin}
                        </span>
                      </Dialog.Title>
                      <div className="my-4 text-sm">
                        <p className="text-slate-600 dark:text-slate-400">
                          You can easily add or remove friends from specific
                          groups.
                        </p>
                      </div>
                      <div
                        className={classNames(
                          'mt-2 grid grid-cols-1 sm:grid-cols-2',
                          { 'pointer-events-none opacity-50': loading }
                        )}
                      >
                        {myFollowsGroups.map((group) => {
                          const isUserInGroup = followsGroupsForUser.some(
                            (userGroup) => userGroup.id === group.id
                          );
                          return (
                            <FriendGroupItem
                              key={`follow-group-${props.userID}-${group.id}`}
                              assigned={isUserInGroup}
                              group={group}
                              userID={props.userID}
                            />
                          );
                        })}
                      </div>
                      {error && (
                        <div className="my-4 text-sm">
                          <p className="text-red-600 dark:text-red-400">
                            An error occured while loading your friends groups.
                            <br />
                            Please try again later.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 grid grid-cols-1">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-0 hover:bg-slate-50 dark:hover:bg-slate-700 sm:col-start-1 sm:mt-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default FriendsGroupManageModal;
