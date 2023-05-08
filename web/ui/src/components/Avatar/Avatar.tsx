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
          // clipPath: 'polygon(92.32051% 40%, 93.79385% 43.1596%, 94.69616% 46.52704%, 95% 50%, 94.69616% 53.47296%, 93.79385% 56.8404%, 92.32051% 60%, 79.82051% 81.65064%, 77.82089% 84.50639%, 75.35575% 86.97152%, 72.5% 88.97114%, 69.3404% 90.44449%, 65.97296% 91.34679%, 62.5% 91.65064%, 37.5% 91.65064%, 34.02704% 91.34679%, 30.6596% 90.44449%, 27.5% 88.97114%, 24.64425% 86.97152%, 22.17911% 84.50639%, 20.17949% 81.65064%, 7.67949% 60%, 6.20615% 56.8404%, 5.30384% 53.47296%, 5% 50%, 5.30384% 46.52704%, 6.20615% 43.1596%, 7.67949% 40%, 20.17949% 18.34936%, 22.17911% 15.49361%, 24.64425% 13.02848%, 27.5% 11.02886%, 30.6596% 9.55551%, 34.02704% 8.65321%, 37.5% 8.34936%, 62.5% 8.34936%, 65.97296% 8.65321%, 69.3404% 9.55551%, 72.5% 11.02886%, 75.35575% 13.02848%, 77.82089% 15.49361%, 79.82051% 18.34936%)',
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
