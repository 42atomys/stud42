import { useState } from 'react';
import { NotificationContext } from './NotificationContext';
import { NotificationProps } from './types';

/**
 * Notification provider. This is used to store and retrieve the
 * NotificationContext on the application.
 */
export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
