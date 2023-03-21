import { Dispatch } from 'react';

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

interface SelectInputProps<S> extends InputProps<S> {
  selectedValue: S;
  objects: S[];
}

interface TextInputProps<S> extends InputProps<S> {
  type: InputTextType = 'text';
}
