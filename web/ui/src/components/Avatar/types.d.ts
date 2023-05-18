import { User } from '@graphql.d';

type AvatarSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  // auto-based-on-width will only be used on cluster map currently and will be
  // removed once we have a better solution for the cluster map avatar sizing
  | 'auto-based-on-witdth'
  // auto-based-on-steps generate a size based on the screen width  with
  // tailwind breakpoints
  | 'auto-based-on-steps';

export type AvatarProps = {
  duoAvatarURL?: string | null;
  size?: AvatarSize;
  rounded?: boolean;
  flags?: User['flags'];
} & (
  | {
      profileLink?: false;
      userId?: never;
    }
  | {
      profileLink?: true;
      userId: string;
    }
);
