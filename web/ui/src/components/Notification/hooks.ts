import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotificationContainer } from './Notification';
import { NotificationContext } from './NotificationContext';
import { NotificationProvider } from './NotificationProvider';
import { NotificationProps } from './types';

/**
 * useNotification hook. This is used to give the API of notification system.
 */
export const useNotification = () => {
  const { notifications, setNotifications } = useContext(NotificationContext);

  return {
    // NotificationProvider is the Provider component of the NotificationContext
    NotificationProvider,
    // NotificationContainer is the component that used to display the
    // notification at the bottom right of the screen.
    NotificationContainer,
    // add a new notification on the notification system
    addNotification: (notificationProps: Omit<NotificationProps, 'id'>) => {
      const notification = notificationProps as NotificationProps;
      notification.id = uuidv4().toString();

      setNotifications((current) => [...current, notification]);
    },
    // remove the given notification of the notification system (if it exists)
    // and clean the state
    removeNotification: (notification: NotificationProps) => {
      setNotifications((current) => [
        ...current.filter((n) => n.id !== notification.id),
      ]);
    },
    // the notifications stored in the notification system
    notifications,
  };
};

export default useNotification;
