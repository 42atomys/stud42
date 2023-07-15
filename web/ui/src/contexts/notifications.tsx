import { Notification, NotificationProps } from '@components/Notification';
import { Portal } from '@components/Portal';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotificationContextValue } from './types';

const NotificationContext = createContext<NotificationContextValue>({
  notificationsCount: 0,
  addNotification: () => Promise.resolve(),
  removeNotification: () => Promise.resolve(),
});

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const addNotification: NotificationContextValue['addNotification'] =
    useCallback(
      (notificationProps) => {
        const notification = notificationProps as NotificationProps;
        notification.id = uuidv4().toString();

        setNotifications((current) => [...current, notification]);
      },
      [setNotifications]
    );

  const removeNotification: NotificationContextValue['removeNotification'] =
    useCallback(
      (notification) => {
        setNotifications((current) => [
          ...current.filter((n) => n.id !== notification.id),
        ]);
      },
      [setNotifications]
    );

  const value = {
    addNotification,
    removeNotification,
    notificationsCount: notifications.length,
  } satisfies NotificationContextValue;

  return (
    <NotificationContext.Provider value={value}>
      <>{children}</>
      <Portal
        portalDOMId="notification-center"
        key="notification-center"
        singleton
        className="fixed bottom-0 right-0 p-4 min-w-min w-1/4 max-w-[400px]"
      >
        <>
          {notifications.map((notification) => (
            <Notification
              key={`notification-${notification.id}`}
              {...notification}
            />
          ))}
        </>
      </Portal>
    </NotificationContext.Provider>
  );
};

export const useNotification: () => NotificationContextValue = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }

  return context;
};
