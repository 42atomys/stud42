import { ApolloClient } from '@apollo/client';
import useNotification from '@components/Notification';
import {
  ClusterMapAvatarSize,
  Settings,
  Theme,
  useMyApparenceSettingsLazyQuery,
  useUpdateSettingsMutation,
} from '@graphql.d';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { LocalStorageKeys } from './storageKeys';
import useLocalStorage from './useLocalStorage';

type UseSettingsFunc = (props?: {
  // the apollo client to use for the query if not provided the default client
  // will be used from the apollo provider
  apolloClient?: ApolloClient<any>;
  // force the remote update of the settings (useful for the settings page)
  // if not provided the settings will be fetched from the local storage
  // if not present in the local storage the settings will be fetched from the
  // remote
  forceRemoteUpdate?: boolean;
}) => [Settings, Dispatch<SetStateAction<Partial<Settings>>>];

/**
 * useSettings is a custom hook that will return the user's settings and a
 * function to update the settings in the database and in the local storage
 */
export const useSettings: UseSettingsFunc = ({
  apolloClient,
  forceRemoteUpdate = false,
} = {}) => {
  const { addNotification } = useNotification();
  const [forceRemote, setForceRemote] = useState(forceRemoteUpdate);

  const [getSettings] = useMyApparenceSettingsLazyQuery({
    client: apolloClient ? apolloClient : undefined,
  });
  const [localSettings, setLocalSettings, localSettingsCached] =
    useLocalStorage<Settings>(
      LocalStorageKeys.Settings,
      // Default settings if not found in local storage or if local storage is
      // not available
      { theme: Theme.AUTO, clusterMapAvatarSize: ClusterMapAvatarSize.AUTO }
    );

  const [updateSettingsMutation] = useUpdateSettingsMutation({
    client: apolloClient ? apolloClient : undefined,
    onCompleted: ({ updateSettings }) => {
      setLocalSettings(updateSettings);

      addNotification({
        title: 'Settings updated',
        message: 'Your preferences have been saved',
        type: 'success',
        duration: 3000,
      });
    },
    onError: (error) => {
      addNotification({
        title: 'Error',
        message: error.message,
        type: 'error',
        duration: 5000,
      });
    },
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage and remote.
  const setSettings: Dispatch<SetStateAction<Partial<Settings>>> = useCallback(
    (value) => {
      try {
        // Allow val ue to be a function so we have the same API as useState
        const newSettingsEntry =
          value instanceof Function ? value(localSettings) : value;

        if (newSettingsEntry === localSettings) {
          return;
        }

        const newSettings = {
          ...localSettings,
          ...newSettingsEntry,
        };

        // Update settings on server
        updateSettingsMutation({
          variables: {
            input: newSettings,
          },
        });
      } catch (error) {
        return localSettings;
      }
    },
    [localSettings, updateSettingsMutation]
  );

  /**
   * Get the user settings from the server and update the local storage with
   * the remote settings if no local settings are found
   */
  useEffect(() => {
    if (forceRemote || !localSettingsCached) {
      getSettings().then(({ data }) =>
        setSettings(data?.me?.settings as Settings)
      );
      setForceRemote(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSettingsCached, forceRemote]);

  return [localSettings, setSettings];
};

/**
 * Set the theme will apply the theme to the html element of present or apply
 * the default auto theme based on the user's system preferences
 * @param theme
 */
export const useTheme = (theme: Theme) => {
  if (typeof document !== 'undefined') {
    switch (theme) {
      case Theme.AUTO:
      case Theme.DARK:
        if (
          window.matchMedia('(prefers-color-scheme: dark)').matches ||
          theme === Theme.DARK
        ) {
          document.documentElement.classList.add(
            Theme.DARK.toLowerCase(),
            'bg-slate-900'
          );
        }
        break;
      case Theme.LIGHT:
        document.documentElement.classList.remove(
          Theme.DARK.toLowerCase(),
          'bg-white'
        );
        break;
    }
  }
};

export default useSettings;
