import { Dispatch, KeyboardEventHandler } from 'react';

interface InputProps<S> {
  label?: string;
  name?: string;
  defaultValue?: S;
  onChange: Dispatch<S>;
  placeholder?: string;
  disabled?: boolean;
}

type InputTextType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

interface KeyDownEvent {
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

interface SelectInputProps<S> extends InputProps<S>, KeyDownEvent {
  selectedValue: S;
  objects: S[];
}

interface TextInputProps<S> extends InputProps<S>, KeyDownEvent {
  type: InputTextType = 'text';
}

interface SwitchProps<S> extends InputProps<S> {
  color?: string;
}
