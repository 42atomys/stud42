import { ColorInput, TextInput } from '@components/Form';
import { FollowsGroup } from '@graphql.d';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Modal to add a new group of friends or edit an existing one.
 * @param props
 * @param props.children must contain a button to open the modal. The logical is
 *                       handled by this component.
 * @returns
 */
export const FriendsGroupAddModal: React.FC<
  React.PropsWithChildren<Partial<FollowsGroup>>
> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

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
              <motion.div
                className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { ease: 'easeOut', duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.75,
                  transition: { ease: 'easeIn', duration: 0.15 },
                }}
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                      <i
                        className="fa-kit fa-regular-user-group-circle-plus fa-fw fa-lg text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                      >
                        Create a new friends group
                      </Dialog.Title>
                      <div className="my-4 text-sm">
                        <p className="text-slate-600 dark:text-slate-400">
                          Gather your friends into custom groups for targeted
                          project, event planning, association, or just classify
                          them by score at their lib-ft.
                        </p>
                      </div>
                      <div className="mt-2 space-y-4 text-sm">
                        <div className="space-x-2 flex flex-row">
                          <ColorInput
                            label="Color"
                            name="group-color"
                            defaultValue={props?.color ?? undefined}
                            className="[&>label]:flex-col [&>label]:items-center"
                            onChange={() => {}}
                          />
                          <TextInput
                            type="text"
                            label="Name"
                            name="group-name"
                            defaultValue={props.name}
                            className="flex-1"
                            onChange={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-0 hover:bg-slate-50 dark:hover:bg-slate-700 sm:col-start-1 sm:mt-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default FriendsGroupAddModal;
