import { createContext } from 'react';
import { NotificationContextType } from './types';

/**
 * Notification context. This is used to store and retrieve notifications of
 * the application.
 */
export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: () => {},
});
