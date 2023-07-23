import { MapLocation } from '@components/ClusterMap';
import { Location } from '@graphql.d';

// DOMReactWithoutJSON is a type that is the same as DOMRectReadOnly
// but without the toJSON method. This is because the toJSON method
// is not serializable and will cause errors when trying to pass
// the position to the UserPopup component.
type DOMReactWithoutJSON = Omit<DOMRectReadOnly, 'toJSON'> | null;

// UserPopupProps is the props that the UserPopup component expects
// to be passed to it. It's a good idea to define this so that you
// can easily see what props the component expects and what types
// they should be.
type UserPopupProps = {
  user: User;
  location: any;
  position: DOMReactWithoutJSON;
  onClickOutside: () => void;
};

// Represents that state made available via this reducer
type PopupState = {
  position: DOMRectReadOnly | null;
  location: Pick<Location, 'identifier' | 'endAt'> | null;
  user: MapLocation['user'] | null;
};

type PopupReducerFn = (state: PopupState, action: Actions) => PopupState;

// Now so we don't have to write out each inidividual action into a Union
// we can use a map and convert that into a Union later. The keys in this
// represent the action types and the values represent the payloads.
type ActionsMap = {
  SHOW_POPUP: PopupState;
  HIDE_POPUP: null;
};

// Here's where we form the Actions union from our map. The quick explanation is
// we form a new map with all the possible actions keyed by the action types and
// and then we say we want each of the values at those keys to be an option in
// our Union. So type Actions becomes -
// { type: 'setFoo', payload: Foo } | { type: 'setBar', payload: Bar } | ...
// Anything you add to the ActionsMap will  become an action option in the
// Actions Union
export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];

// PayloadOf is a helper function that takes an action and returns the payload
// of that action. It's used to simplify the code when we want to extract the
// payload of an action.
export type PayloadOf<T, U = Actions['type']> = T extends { type: U }
  ? T['payload']
  : never;

// This is some fancy typing to make the reducer `dispatch` function
// work like so `dispatch(<type>, <payload>)` instead of
// `dispatch({ type: <type>, payload: <payload> })`
export type Dispatcher = <
  Type extends Actions['type'],
  Payload extends ActionsMap[Type],
>(
  type: Type,
  // This line makes it so if there shouldn't be a payload then
  // you only need to call the function with the type, but if
  // there should be a payload then you need the second argument.
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

// This is what our PopupContext will be expecting as its value prop.
type PopupContextInterface = readonly [PopupState, Dispatcher];
