'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PropsWithClassName } from 'types/globals';

/**
 * MultiplePortal is used to create a portal that is not unique in the DOM.
 * It is useful when you want to render a component in a portal, and you want
 * to create a new portal element in the DOM every time the component is
 * rendered. The `portalId` prop is used to identify the portal element in the
 * DOM. The `key` prop is used to identify the portal in React. The `key` prop
 * is optional, but it is recommended to use it to avoid React warnings.
 */
const MultiplePortal: React.FC<
  React.PropsWithChildren<PropsWithClassName<PortalInstance>>
> = ({ key, portalDOMId: portalId, children, className }) => {
  // create div element only once using ref
  const elementContainer = useRef<HTMLDivElement | null>(null);
  if (!elementContainer.current && typeof document !== 'undefined')
    elementContainer.current = document?.createElement('div');

  useEffect(() => {
    // non-null assertion because it will never be null in browser context
    let portalElement = document.getElementById(portalId);
    // create element if it doesn't exist
    if (!portalElement) {
      portalElement = document.createElement('div');
      portalElement.id = portalId;
      if (className) portalElement.classList.value = className;
      document.body.appendChild(portalElement);
    }

    const el = elementContainer.current!;
    portalElement?.appendChild(el);
    return () => {
      portalElement?.removeChild(el);
    };
  }, [portalId, className]);

  if (!window) return null;

  return createPortal(children, elementContainer.current!, key);
};

/**
 * SingletonPortal is used to create a portal that is unique in the DOM.
 * It is useful when you want to render a component in a portal, but you don't
 * want to create a new portal element in the DOM every time the component is
 * rendered. The `portalId` prop is used to identify the portal element in the
 * DOM. The `key` prop is used to identify the portal in React. The `key` prop
 * is optional, but it is recommended to use it to avoid React warnings.
 */
const SingletonPortal: React.FC<
  React.PropsWithChildren<PropsWithClassName<PortalInstance>>
> = ({ key, portalDOMId: portalId, children, className }) => {
  // create div element only once using ref
  const elementContainer = useRef<HTMLElement | null>(null);
  if (!elementContainer.current && typeof document !== 'undefined') {
    elementContainer.current = document.getElementById(portalId);
    // create element if it doesn't exist
    if (!elementContainer.current) {
      elementContainer.current = document.createElement('div');
      elementContainer.current.id = portalId;
      if (className) elementContainer.current.classList.value = className;
      document.body.appendChild(elementContainer.current);
    }
  }

  if (typeof window === 'undefined') return null;

  return createPortal(children, elementContainer.current!, key);
};

/**
 * Portal is a component that renders its children into a new "subtree" outside
 * of current component hierarchy. You can create an unique portal with
 * `singleton` set as true, or multiple portals with `singleton` prop set to
 * `false`. The `portalId` prop is used to identify the portal element in the
 * DOM. The `key` prop is used to identify the portal in React. The `key` prop
 * is optional, but it is recommended to use it to avoid React warnings.
 */
export const Portal: React.FC<
  React.PropsWithChildren<PropsWithClassName<PortalProps>>
> = ({ singleton, ...props }) => {
  if (singleton) {
    return SingletonPortal.call(null, props);
  }

  return MultiplePortal.call(null, props);
};
