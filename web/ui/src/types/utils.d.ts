/**
 * A type that takes a generic type T and excludes the null and undefined values
 * from it. The resulting type is a subtype of T that guarantees that the value
 * is not null or undefined.
 */
export type NonNullable<T> = Exclude<T, null | undefined>;

/**
 * A type that takes a generic type T and makes all its properties optional,
 * including nested properties.
 * It creates a new type that recursively copies the structure of T with all
 * properties marked as optional using the ? symbol.
 */
export type NestedPartial<T> = {
  [P in keyof T]?: NestedPartial<T[P]>;
};

/**
 * A type that takes two generic types T and U and returns a type that
 * represents their exclusive or (XOR) operation.
 * The resulting type is either T or U, but not both or neither. If both types
 * overlap (i.e., they have common properties), the resulting type is never.
 */
export type XOR<T, U> = T | U extends T & U ? never : T | U;

/**
 * A type that takes a generic type T (defaulting to string) and defines an
 * object that has an optional link property, which is a function that takes an
 * optional obj of type T and returns a URL object.
 * The T type parameter allows specifying the type of the object that the link
 * function receives as input.
 */
export type ClickableLink<T> = {
  link?: (obj: T) => URL;
};
