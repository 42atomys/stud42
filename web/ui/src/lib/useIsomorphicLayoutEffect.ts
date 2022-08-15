// Copyright (c) 2020 Julien CARON
// Credits go to https://github.com/juliencrn/usehooks-ts
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
