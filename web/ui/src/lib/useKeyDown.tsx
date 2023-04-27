import { useCallback, useEffect } from 'react';

type UsekeyDown = (keys: string[], callback: () => void) => void;

export const useKeyDown: UsekeyDown = (keys, callback) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const wasAnyKeyPressed = keys.some((key) => event.key === key);
      if (wasAnyKeyPressed) {
        event.preventDefault();
        callback();
      }
    },
    [callback, keys]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};

export default useKeyDown;
