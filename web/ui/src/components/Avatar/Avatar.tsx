import { UserProfile } from '@components/UserProfile';
import { UserFlag } from '@graphql.d';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { PropsWithClassName } from 'types/globals';
import type { AvatarProps } from './types';

/**
 * Size classes to define the size of avatar from simplified props
 */
const sizeClasses = {
  xs: '[--avatar-size:16px]',
  sm: '[--avatar-size:24px]',
  md: '[--avatar-size:32px]',
  xl: '[--avatar-size:42px]',
  '2xl': '[--avatar-size:56px]',
  '3xl': '[--avatar-size:96px]',
  '4xl': '[--avatar-size:128px]',
  'auto-based-on-witdth': '[--avatar-size:calc(1rem+1.3vw-(370px/100))]',
  'auto-based-on-steps':
    '[--avatar-size:16px] lg:[--avatar-size:32px] 2xl:[--avatar-size:42px] 4xl:[--avatar-size:56px]',
};

export const Avatar: React.FC<PropsWithClassName<AvatarProps>> = ({
  userId,
  duoAvatarURL,
  flags,
  size = 'sm',
  rounded = false,
  profileLink = true,
  className,
}) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <motion.div
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
            'group/avatar flex overflow-hidden transition-none': profileLink,
          }
        )}
      >
        {profileLink && (
          <button
            onClick={() => setShowProfile(true)}
            className="invisible group-hover/avatar:visible flex-1 text-sm w-full h-full bg-slate-900/60 text-white font-bold"
          >
            View profile
          </button>
        )}
      </motion.div>
      {profileLink && (
        <UserProfile
          open={showProfile}
          setOpen={setShowProfile}
          userId={userId as string}
        />
      )}
    </>
  );
};

export default Avatar;
