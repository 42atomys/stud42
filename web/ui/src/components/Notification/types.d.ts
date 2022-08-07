import { Dispatch, SetStateAction } from 'react';

export type NotificationProps = {
  // id of the notification. Provided by the addNotification function.
  id: string;
  // type of the notification. Define the style and color of the notification.
  type: 'error' | 'warning' | 'success' | 'info' | 'default';
  // title of the notification. Displayed on the top of the notification.
  title: string;
  // message of the notification. Displayed on the bottom of the notification.
  message: string;
  // duration of the notification. Define the time the notification is displayed.
  // The minimum value is 4000 (4s).
  // If the duration is 0, the notification will be displayed until the user
  // click on the close button.
  duration?: number;
  // children of the notification. Let you add some custom content to the
  // notification. `a` and `button` are styled automatically by the notification.
  children?: React.ReactNode;
};

// NotificationComponent represent the component that will be displayed in the
// notification system.
export type NotificationComponent = (props: NotificationProps) => JSX.Element;

// NotificationContextType is the type of the context that will be used to
// manage the notifications.
export type NotificationContextType = {
  notifications: NotificationProps[];
  setNotifications: Dispatch<SetStateAction<NotificationProps[]>>;
};
