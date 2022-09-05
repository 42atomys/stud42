import { Dispatch } from 'react';
import { ClassNameProps } from 'types/globals';

type SelectInputFunc = <S>(
  props: SelectInputProps<S extends string ? S : never> & ClassNameProps
) => JSX.Element;

type SelectInputProps<S> = {
  selectedValue: S;
  objects: S[];
  onChange: Dispatch<S>;
};
