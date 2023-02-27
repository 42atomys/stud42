import { UserFlag } from '@graphql.d';
import classNames from 'classnames';
import type { AvatarProps } from './types';

/**
 * Size classes to define the size of avatar from simplified props
 */
const sizeClasses = {
  xs: '[--avatar-size:16px]',
  sm: '[--avatar-size:24px]',
  md: '[--avatar-size:32px]',
  xl: '[--avatar-size:42px]',
  xxl: '[--avatar-size:56px]',
  xxxl: '[--avatar-size:96px]',
  'auto-based-on-witdth': '[--avatar-size:calc(1rem+1.3vw-(370px/100))]',
  'auto-based-on-steps':
    '[--avatar-size:16px] lg:[--avatar-size:32px] 2xl:[--avatar-size:42px] 4xl:[--avatar-size:56px]',
};

export const Avatar = ({
  duoAvatarURL,
  flags,
  size = 'sm',
  rounded = false,
  className,
}: AvatarProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${duoAvatarURL})`,
      }}
      className={classNames(
        className,
        rounded ? 'rounded-full' : 'rounded',
        'bg-clip-border bg-center bg-cover bg-slate-900/30 w-[var(--avatar-size)] h-[var(--avatar-size)]',
        'outline-offset-2 outline-2',
        sizeClasses[size],
        {
          'outline outline-fuchsia-500': flags?.includes(UserFlag.SPONSOR),
        }
      )}
    />
  );
};

export default Avatar;
