import { ReactElement } from 'react';

export type ConditionalWrapperFn = (props: {
  condition: boolean;
  trueWrapper: (children: ReactElement) => ReactElement;
  falseWrapper?: (children: ReactElement) => ReactElement = (children) =>
    children;
  children: ReactElement;
}) => ReactElement;
