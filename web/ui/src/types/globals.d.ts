/**
 * Allow to extend the type of the props of a component
 * @typedef {Object} ClassNameProps
 * @property {string} className
 * @deprecated Use PropsWithClassName instead
 */
export type ClassNameProps = {
  className?: string;
};

/**
 * Allow to extend the type of the props of a component
 * @typedef {Object} PropsWithClassName
 * @property {string} className
 * @example
 * import { PropsWithClassName } from 'types/globals';
 *
 * const Component: React.FC<PropsWithClassName<{id: string}>> = ({ className, id }) => <></>
 */
export type PropsWithClassName<P = unknown> = P & { className?: string };

/**
 * This type is used to define a type that can be null or undefined
 * @typedef {T | null | undefined} Maybe
 * @example
 * import { Maybe } from 'types/globals';
 * const foo: Maybe<string> = 'bar';
 */
export type Maybe<T> = T | null | undefined;

declare global {
  interface String {
    equalsIgnoreCase(searchString: string): boolean;
  }

  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}
