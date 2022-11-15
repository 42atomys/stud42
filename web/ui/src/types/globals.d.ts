/**
 * Allow to extend the type of the props of a component
 * @typedef {Object} ClassNameProps
 * @property {string} className
 */
export type ClassNameProps = {
  className?: string;
};

declare global {
  interface String {
    equalsIgnoreCase(searchString: string): boolean;
  }
}
