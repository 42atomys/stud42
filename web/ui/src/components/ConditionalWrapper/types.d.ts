import { ReactElement } from 'react';

export type ConditionalWrapperFn = (props: {
  condition: boolean;
  trueWrapper: (children: ReactElement) => ReactElement;
  falseWrapper?: (children: ReactElement) => ReactElement;
  children: ReactElement;
}) => ReactElement;
