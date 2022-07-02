export type NonNullable<T> = Exclude<T, null | undefined>;

export type NestedPartial<T> = {
  [P in keyof T]?: NestedPartial<T[P]>;
};