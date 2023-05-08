import { Avatar } from '@components/Avatar';
import { FlagBadge, LocationBadge, ThridPartyBadge } from '@components/Badge';
import { thirdPartySorted } from '@components/Badge/utils';
import { Emoji } from '@components/Emoji';
import { formatName } from '@components/Name';
import DropdownMenu from '@components/UserCard/DropDownMenu';
import { useMe } from '@ctx/currentUser';
import { UserFlag, UserProfileQuery, useUserProfileQuery } from '@graphql.d';
import { countryEmoji } from '@lib/clustersMap';
import useKeyDown from '@lib/useKeyDown';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { SkeletonLoader } from './SkeletonLoader';
import UserProfilePortal from './UserProfilePortal';
import { UserProfileProps } from './types';

/**
 * CursusProgress is a UI component that displays a user's progress in their
 * main cursus or in their piscine when no main cursus is available.
 *
 * It takes in an intraProxy prop, which is a user's intraProxy object.
 * The component uses the intraProxy object to determine the user's cursus
 * progress.
 */
const CursusProgress: React.FC<{
  intraProxy: NonNullable<UserProfileQuery['user']>['intraProxy'];
}> = ({ intraProxy }) => {
  const mainCursusUser = intraProxy.cursusUsers?.find((c) =>
    c.cursus?.kind.includes('main')
  );
  const piscineCursusUser = intraProxy.cursusUsers?.find((c) =>
    c.cursus?.kind.includes('piscine')
  );
  const cursusUser = mainCursusUser || piscineCursusUser;

  const level = Math.floor(cursusUser?.level || 0);
  const progress = Math.floor(((cursusUser?.level || 0) % 1) * 100);
  const isAPool = cursusUser?.cursus?.kind === 'piscine';

  return (
    <div className="overflow-hidden flex flex-col items-center space-y-3">
      <div className="w-full flex flex-row justify-around items-center">
        <div className="flex flex-col text-center">
          <h5 className="font-display">Cursus</h5>
          <p className="text-white">{cursusUser?.cursus.name}</p>
        </div>
        <div className="flex flex-col text-center">
          <h5 className="font-display">Grade</h5>
          <p className="text-white">{cursusUser?.grade}</p>
        </div>
      </div>

      <div
        className={classNames(
          'relative rounded-lg w-full h-8 overflow-hidden',
          isAPool
            ? 'bg-yellow-100/50 dark:bg-yellow-950/50'
            : 'bg-indigo-100/50 dark:bg-indigo-950/50'
        )}
      >
        <div
          className={classNames(
            'h-full bg-gradient-to-r',
            isAPool
              ? 'from-yellow-700 to-yellow-600'
              : 'from-indigo-700 to-indigo-600'
          )}
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-0 bottom-0 my-auto w-full flex items-center justify-between px-2">
          <span className="text-white font-bold">{level}</span>
          <span className="text-white font-bold mix-blend-soft-light">
            {progress}%
          </span>
          <span className="text-white font-bold">{level + 1}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Badges is a UI component that displays all user flags as badges.
 */
const Badges: React.FC<{ flags: UserFlag[] }> = ({ flags }) => {
  return (
    <div className="flex flex-row self-start ml-4 justify-center items-center rounded-lg bg-slate-950/70 backdrop-blur-sm backdrop-filter">
      {flags.map((flag) => (
        <FlagBadge key={`user-profile-badge-${flag}`} flag={flag} />
      ))}
    </div>
  );
};

/**
 * ThridPartyAccounts is a UI component that displays all user third party
 * accounts as badges.
 */
const ThridPartyAccounts: React.FC<{
  user: NonNullable<UserProfileQuery['user']>;
}> = ({ user }) => {
  const accounts = thirdPartySorted(user.accounts, user.duoLogin);
  return (
    <ul className="flex flex-row space-x-3 ml-2 justify-start items-center">
      {accounts?.map(
        (account) =>
          account && (
            <ThridPartyBadge
              key={`user-profile-acount-tooltip-${account.providerAccountId}`}
              {...account}
            />
          )
      )}
    </ul>
  );
};

/**
 * UserProfile is a UI component that displays a user's profile as a slideover.
 * This component is animated using framer-motion and uses a portal to render
 * the slideover outside of the root div of app.
 */
export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  open,
  setOpen,
}) => {
  const { isMe } = useMe();
  const { data, loading, error } = useUserProfileQuery({
    variables: { userID: userId },
    skip: !open,
  });
  const { user } = data || {};

  const numberFormater = Intl.NumberFormat('en', { notation: 'compact' });

  useKeyDown(['Escape'], () => {
    setOpen(false);
  });

  return (
    <UserProfilePortal>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-end h-full backdrop-blur-sm backdrop-brightness-50"
            data-testid="user-profile-slideover"
            onClick={(e) => e.currentTarget === e.target && setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              onClick={() => setOpen(false)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, x: '100px' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100px' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className=""
            >
              <i className="fal fa-xmark text p-2 m-2 cursor-pointer" />
            </motion.button>
            <motion.div
              className="overflow-y-auto bg-clip-border bg-center bg-cover relative transform overflow-hidden h-[100vh] bg-white dark:bg-slate-900 text-left shadow-xl w-full sm:max-w-lg"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              style={{}}
            >
              <div className="bg-opacity-80 backdrop-filter backdrop-blur-3xl bg-slate-900 px-4 pt-5 pb-4 sm:p-6 min-h-full">
                <motion.div
                  className="space-y-3"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{
                    type: 'spring',
                    bounce: 0.25,
                    duration: 0.5,
                    delay: 0.1,
                  }}
                >
                  {loading && <SkeletonLoader />}
                  {error && <p>An error occurred. Please try again later</p>}

                  {user && (
                    <>
                      <div className="bg-slate-900 rounded-lg text-center flex flex-col items-center">
                        <div className="relative mb-12 w-full">
                          <div
                            style={{
                              backgroundImage: `url(${
                                user.coverURL || (loading ? '' : '')
                              })`,
                              height: user.coverURL ? '300px' : '125px',
                            }}
                            className="w-full bg-clip-border bg-center bg-cover rounded-lg bg-indigo-200 dark:bg-indigo-800/50"
                          />
                          <div className="absolute bottom-0 w-full h-1/3 rounded-lg bg-gradient-to-t from-slate-950/75 to-slate-950/0" />
                          <div className="absolute bottom-0 left-4 translate-y-1/3 flex flex-row w-[calc(100%_-_1rem)]">
                            <Avatar
                              profileLink={false}
                              size="4xl"
                              duoAvatarURL={user.duoAvatarSmallURL}
                              // rounded
                              className="ring-8 ring-white !bg-slate-200 dark:ring-slate-900 dark:!bg-slate-800"
                            />

                            <div className="relative flex flex-col justify-between flex-1">
                              <div className="flex flex-row justify-around items-center mt-8">
                                <div className="flex flex-col text-center drop-shadow-2xl">
                                  <p className="text-white/90 font-display font-bold">
                                    {numberFormater.format(user.followersCount)}
                                  </p>
                                  <h5 className="text-white/80">Followers</h5>
                                </div>
                                <div className="flex flex-col text-center drop-shadow-2xl">
                                  <p className="text-white/90 font-display font-bold">
                                    {numberFormater.format(
                                      user.followingsCount
                                    )}
                                  </p>
                                  <h5 className="text-white/80">Following</h5>
                                </div>
                              </div>

                              {user.flags.length > 1 && (
                                <Badges flags={user.flags} />
                              )}
                            </div>
                          </div>

                          {!isMe(user) && (
                            <DropdownMenu
                              buttonAlwaysShow={true}
                              user={user}
                              className="bottom-[-3.10rem] top-auto"
                            />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col text-left ml-4 !mt-5">
                        <h2 className="font-display text-slate-900 dark:text-white font-bold text-2xl">
                          {formatName(user)}
                        </h2>
                        <p>@{user.duoLogin}</p>
                      </div>

                      <ThridPartyAccounts user={user} />

                      {user.isSwimmer && (
                        <div className="bg-yellow-950 text-yellow-500 font-display rounded-lg p-2 text-center">
                          Making a splash as a swimmer in the 42&apos;s
                          selection pool!
                        </div>
                      )}

                      <div className="flex flex-row space-x-3">
                        {user.currentCampus && (
                          <div className="bg-slate-950 rounded-lg p-2 flex-1">
                            <h5 className="text-center font-display">Campus</h5>
                            <div className="flex flex-col justify-center items-center text-center text-white">
                              <div className="flex justify-center items-center flex-row space-x-1">
                                <Emoji
                                  emoji={
                                    countryEmoji[
                                      user.currentCampus.country || ''
                                    ]
                                  }
                                  size={14}
                                  title={user.currentCampus.name}
                                />
                                <span>42 {user.currentCampus.name}</span>
                              </div>
                              <p className="text-sm">
                                {user.currentCampus.city},{' '}
                                {user.currentCampus.country}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="bg-slate-950 rounded-lg p-2 flex-1">
                          <h5 className="text-center font-display">Location</h5>
                          <div className="flex flex-row justify-center items-center space-x-2">
                            <LocationBadge location={user.lastLocation} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-950 rounded-lg overflow-hidden p-2 flex flex-col space-y-3 flex-1">
                        {user?.intraProxy && (
                          <>
                            <CursusProgress intraProxy={user.intraProxy} />
                            <div className="grid gap-4 grid-cols-3">
                              <div className="ring-1 ring-slate-800 rounded-lg p-2 text-center flex flex-col place-content-center">
                                <h5 className="font-display">Pool</h5>
                                <p className="text-white first-letter:uppercase">
                                  {user.poolMonth} {user.poolYear}
                                </p>
                              </div>
                              <div className="ring-1 ring-slate-800 rounded-lg p-2 text-center flex flex-col place-content-center">
                                <h5 className="font-display">Eval Points</h5>
                                <p className="text-white">
                                  {user.intraProxy.correctionPoint}
                                </p>
                              </div>
                              <div className="ring-1 ring-slate-800 rounded-lg p-2 text-center flex flex-col place-content-center">
                                <h5 className="font-display">Wallet</h5>
                                <p className="text-white">
                                  {user.intraProxy.wallet}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </UserProfilePortal>
  );
};
