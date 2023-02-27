// Copyright (c) 2020 Julien CARON
// Credits go to https://github.com/juliencrn/usehooks-ts
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { parseJSONSafely } from './jsonParser';
import useEventCallback from './useEventCallback';
import useEventListener from './useEventListener';

declare global {
  interface WindowEventMap {
    'session-storage': CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, boolean] {
  const alreadyPresentOnSessionStorage = useRef(true);
  // Get from session storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (parseJSONSafely(item) as T) : initialValue;
    } catch (error) {
      alreadyPresentOnSessionStorage.current = false;
      return initialValue;
    }
  }, [initialValue, key]);

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue: SetValue<T> = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window == 'undefined') {
      return;
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to session storage
      window.sessionStorage.setItem(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useSessionStorage hook are notified
      window.dispatchEvent(new Event('session-storage'));
    } catch (error) {
      alreadyPresentOnSessionStorage.current = false;
      return initialValue;
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue]
  );

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange);

  // this is a custom event, triggered in writeValueToSessionStorage
  // See: useSessionStorage()
  useEventListener('session-storage', handleStorageChange);

  return [storedValue, setValue, alreadyPresentOnSessionStorage.current];
}

export default useSessionStorage;
