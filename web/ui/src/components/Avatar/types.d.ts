type AvatarSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  // auto-based-on-width will only be used on cluster map currently and will be
  // removed once we have a better solution for the cluster map avatar sizing
  | 'auto-based-on-witdth'
  // auto-based-on-steps generate a size based on the screen width  with
  // tailwind breakpoints
  | 'auto-based-on-steps';

export type AvatarProps = {
  login: string;
  duoAvatarURL?: string | null;
  size?: AvatarSize;
  rounded?: boolean;
  className?: string;
};
