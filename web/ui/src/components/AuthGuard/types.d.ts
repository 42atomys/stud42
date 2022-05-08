import { NextComponentType, NextPageContext } from 'next';
import React from 'react';

export interface WithAuthGuard {
  auth: {
    required: boolean;
    loading: JSX.Element;
    unauthorized?: Function;
  };
}

export type ComponentWithAuthGuard<PageProp = any> = React.FC<PageProp> &
  WithAuthGuard;

export type NextComponentWithAuth = NextComponentType<
  NextPageContext,
  any,
  {}
> &
  Partial<ComponentWithAuthGuard>;
