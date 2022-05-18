import React, { createContext, useReducer } from 'react';
import { Actions, Dispatcher, PopupContextInterface, PopupReducerFn } from './types';

const PopupContext = createContext<PopupContextInterface>([
  // Starting values for the context. Really they should never be seen
  // provided the hooks are only used inside children of PopupProvider.
  { location: null, user: null, position: null },
  () => {},
]);

// This is the reducer function. It runs when we use `dispatch` from the `useReducer`
// hook. The returned state represents the state coming out of the `useReducer` hook
const popupReducer: PopupReducerFn = (_state, action) => {
  switch(action.type) {
    case 'SHOW_POPUP':
      return action.payload;
    case 'HIDE_POPUP':
      return { location: null, user: null, position: null };
  }
}

// This is the parent component that will provide all its component
// children with access to the state and dispatch functions. All
// children within the same PopupProvider will have the same state
// available to them.
export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatchReducer] = useReducer(popupReducer, {
    location: null,
    user: null,
    position: null,
  });

  // This is my funky idea for a dispatch function that takes two
  // arguments instead of a single object with a type and payload.
  // The rest argument business is so that it can be correctly
  // typed for actions without payloads so they can be called with
  // just the action type, see the above `Dispatcher` type. In this
  // project an example would be `dispatch('doubleFoo')`.
  const dispatch: Dispatcher = (type, payload) => {
    dispatchReducer({ type, payload: payload } as Actions);
  };
  return (
    <PopupContext.Provider value={[state, dispatch]}>
      {children}
    </PopupContext.Provider>
  );
};

export const PopupConsumer = PopupContext.Consumer