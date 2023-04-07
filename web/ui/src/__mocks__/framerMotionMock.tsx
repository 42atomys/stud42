import * as React from 'react';

const actual = jest.requireActual('framer-motion');

// https://github.com/framer/motion/blob/main/src/render/dom/motion.ts
const custom = (
  Component: string | React.ComponentType<React.PropsWithChildren<any>>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _customMotionComponentConfig = {}
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const c = React.forwardRef((props, ref) => {
    const regularProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !actual.isValidMotionProp(key))
    );
    return typeof Component === 'string' ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <div ref={ref} {...regularProps} />
    ) : (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Component ref={ref} {...regularProps} />
    );
  });
  c.displayName = `motion.mock(${
    typeof Component === 'string'
      ? Component
      : Component.displayName || Component.name
  })`;
  return c;
};

const componentCache = new Map<string, unknown>();
const motion = new Proxy(custom, {
  get: (_target, key: string) => {
    if (!componentCache.has(key)) {
      componentCache.set(key, custom(key));
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return componentCache.get(key)!;
  },
});

const AnimatePresence = ({ children }: { children: typeof React.Children }) => (
  <>{children}</>
);

export { actual, AnimatePresence, motion };
