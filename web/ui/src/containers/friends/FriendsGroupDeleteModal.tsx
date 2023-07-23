import {
  FollowsGroup,
  FriendsPageDocument,
  useDeleteFollowsGroupMutation,
} from '@graphql.d';
import { Dialog } from '@headlessui/react';
import useKeyDown from '@lib/useKeyDown';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const FriendsGroupDeleteModal: React.FC<
  React.PropsWithChildren<FollowsGroup>
> = ({ children, ...group }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitMutation, { loading }] = useDeleteFollowsGroupMutation({
    variables: { id: group.id },
    onCompleted: () => {
      setIsOpen(false);
    },
    refetchQueries: [FriendsPageDocument],
    awaitRefetchQueries: true,
  });

  useKeyDown(['Escape'], () => setIsOpen(false));

  return (
    <>
      <a data-testid="modal-opener" onClick={() => setIsOpen(true)}>
        {children}
      </a>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50"
            data-testid="friends-group-delete-modal"
          >
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                      <i
                        className="fa-kit fa-regular-user-group-circle-xmark fa-fw fa-lg text-red-600 dark:text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                      >
                        Delete
                        <span
                          className="px-1"
                          style={{ color: group.color as string }}
                        >
                          {group.name}
                        </span>
                        group ?
                      </Dialog.Title>
                      <div className="mt-2 space-y-4 text-sm">
                        <p className="text-slate-600 dark:text-slate-400">
                          Delete this group will remove the group from your
                          friends groups list. The friends will not be removed
                          from your friends list and will still be visible in
                          other groups if they are in.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      data-testid="modal-action-1"
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2 disabled:opacity-50 disabled:pointer-events-none"
                      onClick={() => submitMutation()}
                      disabled={loading}
                    >
                      {loading ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                      data-testid="modal-action-2"
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-0 hover:bg-slate-50 dark:hover:bg-slate-700 sm:col-start-1 sm:mt-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
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

export default FriendsGroupDeleteModal;
