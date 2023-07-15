import { useCallback, useEffect } from 'react';

type UsekeyDown = (keys: string[], callback: () => void) => void;

/**
 * The `useKeyDown` hook is used to handle keyboard shortcuts.
 * It accepts a list of keys and a callback function, and calls the
 * callback function when any of the keys are pressed.
 * It also prevents the default behavior of the pressed key.
 * The hook manage the remove of the event listener for the `keydown` event
 * when the component is unmounted.
 */
export const useKeyDown: UsekeyDown = (keys, callback) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const wasAnyKeyPressed = keys.some((key) => event.key === key);
      if (wasAnyKeyPressed) {
        event.preventDefault();
        callback();
      }
    },
    [callback, keys],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};

export default useKeyDown;
