import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  KeyboardEventHandler,
} from 'react';
import { Maybe } from 'types/globals';

interface InputProps<S> {
  label?: string;
  name: string;
  defaultValue?: Maybe<S>;
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
  name?: string;
  selectedValue: S;
  objects: S[];
}

interface FileInputProps<S>
  extends InputProps<S>,
    KeyDownEvent,
    Omit<
      DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      keyof InputProps<S> | 'type' | 'value' | 'id'
    > {}

interface TextInputProps<S> extends InputProps<S>, KeyDownEvent {
  type: InputTextType = 'text';
}

interface SwitchProps<S> extends InputProps<S> {
  color?: string;
}
