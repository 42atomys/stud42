'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const UserProfilePortal: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // create div element only once using ref
  const elementContainer = useRef<HTMLDivElement | null>(null);
  if (!elementContainer.current)
    elementContainer.current = document?.createElement('div');

  useEffect(() => {
    // non-null assertion because it will never be null in browser context
    const portalElement = document.getElementById('user-profile-portal')!;
    const el = elementContainer.current!;
    portalElement?.appendChild(el);
    return () => {
      portalElement?.removeChild(el);
    };
  }, []);

  if (!window) return null;

  return createPortal(children, elementContainer.current);
};

export default UserProfilePortal;
