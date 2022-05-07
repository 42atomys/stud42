import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// UseDebounceFunc is a function that takes a callback and a delay in milliseconds
// this an overload of useState that returns a tuple of [value, setValue]
// the value is the debounced value and the setValue is the function to set the value
type UseDebounceFunc = <S>(
  initialValue: S | (() => S),
  delay: number
) => [S, Dispatch<SetStateAction<S>>];

// useDebounce is a hook that takes an initial value like useState and a delay in
// milliseconds. It returns a tuple of [value, setValue] where the value is the
// debounced value and the setValue is the function to set the value
//
// When the delay is reached, the current value is sended to the debounced
// value.
//
// TL;DR / usage:
//  const [debouncedValue, setValue] = useDebounce(initialValue, delay)
const useDebounce: UseDebounceFunc = (initialValue, delay = 250) => {
  const [actualValue, setActualValue] = useState(initialValue);
  const [debounceValue, setDebounceValue] = useState(initialValue);
  useEffect(() => {
    const debounceId = setTimeout(() => setDebounceValue(actualValue), delay);
    return () => clearTimeout(debounceId);
  }, [actualValue, delay]);
  return [debounceValue, setActualValue];
};

export default useDebounce;
