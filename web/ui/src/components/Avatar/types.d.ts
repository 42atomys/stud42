type AvatarSize = 'xs' | 'sm' | 'md' | 'xl' | 'xxl' | 'xxxl';

export type AvatarProps = {
  login: string;
  duoAvatarURL?: string | null;
  size?: AvatarSize;
  rounded?: boolean;
  className?: string;
};
