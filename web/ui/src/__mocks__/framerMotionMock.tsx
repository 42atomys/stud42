import {
  CustomDomComponent,
  CustomMotionComponentConfig,
} from 'framer-motion/types/render/dom/motion-proxy';
import * as React from 'react';

const actual = jest.requireActual('framer-motion');

// https://github.com/framer/motion/blob/main/src/render/dom/motion.ts
function custom<Props>(
  Component: string | React.ComponentType<Props>,
  _customMotionComponentConfig: CustomMotionComponentConfig = {}
): CustomDomComponent<Props> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return React.forwardRef((props, ref) => {
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
}

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
