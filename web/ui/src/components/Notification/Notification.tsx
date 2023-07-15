import { useNotification } from '@ctx/notifications';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { startTransition, useCallback, useEffect, useState } from 'react';
import { NotificationComponent } from './types';

const animationDuration = 400;

/**
 * Notification is the component that is used to render a notification on the
 * UI. The notification is managed by the NotificationProvider and
 * NotificationContainer.
 *
 * ⚠️ This component is not intended to be used directly. Use the `useNotification`
 * hook instead with the `addNotification` and `removeNotification` functions.
 */
export const Notification: NotificationComponent = (notification) => {
  // State used to know if the notification is visible or not by the user.
  const [visible, setVisible] = useState(false);
  const { removeNotification } = useNotification();
  const { type = 'default', title, message, duration, children } = notification;

  // hide the notification after the user click on the close button
  const hideNotification = useCallback(() => {
    startTransition(() => {
      setVisible(false);
      setTimeout(() => {
        removeNotification(notification);
      }, animationDuration);
    });
  }, [removeNotification, notification]);

  // Useeffect to let appear the notification from right to left
  useEffect(() => {
    setVisible(true);

    if (duration && duration != 0) {
      setTimeout(
        () => {
          hideNotification();
        },
        Math.max(duration, 4000),
      );
    }
  }, [hideNotification, duration]);

  const containesClasses = classNames({
    'from-teal-500/40 dark:from-teal-500/20 to-teal-400/40 dark:to-teal-700/20 border-teal-400 dark:border-teal-700 hover:ring-teal-400/75 dark:hover:ring-teal-700/75 [&_button]:bg-teal-300 [&_button]:dark:bg-teal-700 [&_button:hover]:ring-teal-500 [&_a]:text-teal-500 [&_a:hover]:text-teal-400':
      type === 'success',
    'from-red-500/40 dark:from-red-500/20 to-red-400/40 dark:to-red-700/20 border-red-400 dark:border-red-700 hover:ring-red-400/75 dark:hover:ring-red-700/75 [&_button]:bg-red-300 [&_button]:dark:bg-red-700 [&_button:hover]:ring-red-500 [&_a]:text-red-500 [&_a:hover]:text-red-400':
      type === 'error',
    'from-indigo-500/40 dark:from-indigo-500/20 to-indigo-400/40 dark:to-indigo-700/20 border-indigo-400 dark:border-indigo-700 hover:ring-indigo-400/75 dark:hover:ring-indigo-700/75 [&_button]:bg-indigo-300 [&_button]:dark:bg-indigo-700 [&_button:hover]:ring-indigo-500 [&_a]:text-indigo-500 [&_a:hover]:text-indigo-400':
      type === 'info',
    'from-yellow-500/40 dark:from-yellow-500/20 to-yellow-400/40 dark:to-yellow-700/20 border-yellow-400 dark:border-yellow-700 hover:ring-yellow-400/75 dark:hover:ring-yellow-700/75 [&_button]:bg-yellow-300 [&_button]:dark:bg-yellow-700 [&_button:hover]:ring-yellow-500 [&_a]:text-yellow-500 [&_a:hover]:text-yellow-400':
      type === 'warning',
    'from-slate-500/40 dark:from-slate-500/20 to-slate-400/40 dark:to-slate-700/20 border-slate-400 dark:border-slate-700 hover:ring-slate-400/75 dark:hover:ring-slate-700/75 [&_button]:bg-slate-300 [&_button]:dark:bg-slate-700 [&_button:hover]:ring-slate-500 [&_a]:text-slate-500 [&_a:hover]:text-slate-400':
      type === 'default',
  });

  const titleClasses = classNames({
    'text-teal-500': type === 'success',
    'text-red-500': type === 'error',
    'text-indigo-500': type === 'info',
    'text-yellow-500': type === 'warning',
    'text-slate-500': type === 'default',
  });

  const textClasses = classNames({
    'text-teal-800 dark:text-teal-200': type === 'success',
    'text-red-800 dark:text-red-200': type === 'error',
    'text-indigo-800 dark:text-indigo-200': type === 'info',
    'text-yellow-800 dark:text-yellow-200': type === 'warning',
    'text-slate-800 dark:text-slate-200': type === 'default',
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 0, scale: 0.5 }}
          transition={{
            duration: animationDuration / 1000,
            type: 'spring',
            bounce: 0.5,
          }}
          className={classNames(
            'bg-white dark:bg-slate-900 rounded-lg shadow-md shadow-slate-400/50 dark:shadow-slate-900/50 border-solid select-none',
            'bg-gradient-to-r dark:bg-gradient-to-l relative border-transparent hover:ring-2 overflow-hidden',
            '[&_button]:rounded-lg [&_button]:py-2 [&_button]:px-4 [&_button]:mt-2 [&_button]:text-white [&_button]:transition-all [&_button]:ring-2 [&_button]:ring-transparent',
            '[&_a]:underline max-h-[200px] p-4 mt-2 border-2 relative',
            containesClasses,
          )}
        >
          {duration && (
            <div className="absolute w-full top-0 left-0">
              <div
                className={classNames(
                  'border-2 h-1 animate-progress w-0',
                  containesClasses,
                )}
                style={{
                  animationDuration: `${duration}ms`,
                  animationDirection: 'reverse',
                }}
              />
            </div>
          )}
          <div
            className={classNames(
              'p-1 absolute top-2 right-2 cursor-pointer',
              textClasses,
            )}
            onClick={hideNotification}
          >
            <i className="fa-light fa-xmark"></i>
          </div>
          <b
            className={classNames(
              'font-display inline-block first-letter:uppercase',
              titleClasses,
            )}
          >
            {title}
          </b>
          <p
            className={classNames(
              'font-light block first-letter:uppercase',
              textClasses,
            )}
          >
            {message}
          </p>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
