'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const MultiplePortal: React.FC<React.PropsWithChildren<PortalInstance>> = ({
  key,
  portalId,
  children,
}) => {
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
      document.body.appendChild(portalElement);
    }

    const el = elementContainer.current!;
    portalElement?.appendChild(el);
    return () => {
      portalElement?.removeChild(el);
    };
  }, [portalId]);

  if (!window) return null;

  return createPortal(children, elementContainer.current!, key);
};

const SingletonPortal: React.FC<React.PropsWithChildren<PortalInstance>> = ({
  key,
  portalId,
  children,
}) => {
  // create div element only once using ref
  const elementContainer = useRef<HTMLElement | null>(null);
  if (!elementContainer.current && typeof document !== 'undefined') {
    elementContainer.current = document.getElementById(portalId);
    // create element if it doesn't exist
    if (!elementContainer.current) {
      elementContainer.current = document.createElement('div');
      elementContainer.current.id = portalId;
      document.body.appendChild(elementContainer.current);
    }
  }

  if (typeof window === 'undefined') return null;

  return createPortal(children, elementContainer.current!, key);
};

export const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({
  singleton,
  ...props
}) => {
  if (singleton) {
    return SingletonPortal.call(null, props);
  }

  return MultiplePortal.call(null, props);
};
