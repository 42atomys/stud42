import { DetailedHTMLProps, Dispatch, InputHTMLAttributes } from 'react';
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

interface TextInputProps<S>
  extends InputProps<S>,
    Omit<React.HTMLProps<HTMLInputElement>, 'onChange'> {
  type: InputTextType;
  // debounce is in milliseconds (ms) if you want to use it to avoid update the
  // state on every key press
  debounce?: number;
}

interface SwitchProps<S> extends InputProps<S> {
  color?: string;
}
