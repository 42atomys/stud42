import { Avatar } from '@components/Avatar';
import { LocationBadge } from '@components/Badge';
import { Emoji } from '@components/Emoji';
import { Name } from '@components/Name';
import { Tooltip } from '@components/Tooltip';
import {
  Account,
  AccountProvider,
  UserFlag,
  UserProfileQuery,
  useUserProfileQuery,
} from '@graphql.d';
import { countryEmoji } from '@lib/clustersMap';
import useKeyDown from '@lib/useKeyDown';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import UserProfilePortal from './UserProfilePortal';

const ProviderIconAndLink: {
  [key in AccountProvider]: {
    icon: string;
    profileLink: (uid: string) => string;
  };
} = {
  [AccountProvider.DUO]: {
    icon: 'fa-kit fa-duoquadra',
    profileLink: (uid) => `https://profile.intra.42.fr/users/${uid}`,
  },
  [AccountProvider.GITHUB]: {
    icon: 'fab fa-github',
    profileLink: (uid) => `https://github.com/${uid}`,
  },
  [AccountProvider.DISCORD]: {
    icon: 'fab fa-discord',
    profileLink: (uid) => `https://discord.com/users/${uid}`,
  },
};

type ThridPartyAccountType = Pick<
  Account,
  'provider' | 'providerAccountId' | 'username'
>;

const ThridPartyAccount: React.FC<ThridPartyAccountType> = ({
  provider,
  username,
  providerAccountId,
}) => {
  const { icon, profileLink } = ProviderIconAndLink[provider];

  return (
    <Link
      className="bg-slate-950 rounded-lg p-2"
      key={`user-profile-acount-tooltip-${providerAccountId}`}
      href={profileLink(username)}
    >
      <i className={classNames('fa-fw', icon)} />
    </Link>
  );
};

const ThridPartyAccounts: React.FC<{
  user: NonNullable<UserProfileQuery['user']>;
}> = ({ user }) => {
  let accounts: ThridPartyAccountType[] = [];
  user?.accounts?.forEach((a) => a && accounts.push(a));

  /**
   * If the user don't have a duo account in database due to the fact that
   * the user didn't login yet to the application, we add it to the user
   * object to be able to display it in the user profile.
   */
  if (!accounts.some((a) => a?.provider === AccountProvider.DUO)) {
    accounts.push({
      provider: AccountProvider.DUO,
      username: user?.duoLogin,
      providerAccountId: '',
    });
  }

  return (
    <ul className="flex flex-row space-x-3 justify-center items-center">
      <Link
        className="bg-slate-950 rounded-lg p-2"
        href={`https://42born2code.slack.com/messages/@${user?.duoLogin}`}
      >
        <i className="fab fa-fw fa-slack" />
      </Link>
      {accounts?.map(
        (account) =>
          account && (
            <ThridPartyAccount
              key={`user-profile-acount-tooltip-${account.providerAccountId}`}
              {...account}
            />
          )
      )}
    </ul>
  );
};

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
    <div className="bg-slate-950 rounded-lg overflow-hidden p-2 flex flex-col items-center space-y-3">
      <div className="w-full flex flex-row justify-around items-center">
        <div className="flex flex-col text-center">
          <h5 className="">Cursus</h5>
          <p className="text-white">{cursusUser?.cursus.name}</p>
        </div>
        <div className="flex flex-col text-center">
          <h5 className="">Grade</h5>
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

const Badges = ({ flags }: { flags: UserFlag[] }) => {
  const flagToBadge = (flag: UserFlag): string => {
    switch (flag) {
      case UserFlag.STAFF:
        return 'fa-duotone fa-hat-wizard text-indigo-500';
      case UserFlag.SPONSOR:
        return 'fa-duotone fa-user-astronaut text-pink-500';
      case UserFlag.BETA:
        return 'fa-duotone fa-flask text-orange-500';
      case UserFlag.COLLABORATOR:
        return 'fa-duotone fa-code-compare text-cyan-500';
      case UserFlag.CONTRIBUTOR:
        return 'fa-duotone fa-code-pull-request text-green-500';
      case UserFlag.DISCORD:
        return 'fa-brands fa-discord text-slate-500';
      default:
        throw new Error(`Unknown flag: ${flag}`);
    }
  };

  return (
    <div className="absolute top-2 right-2 p-2 flex flex-row space-x-3 justify-center items-center rounded-lg bg-slate-950/70 backdrop-blur-sm backdrop-filter">
      {flags.map((flag) => (
        <Tooltip
          key={`user-profile-badge-${flag}`}
          text={flag.toLowerCase()}
          direction="bottom"
          size="sm"
          allowInteractions={false}
          showArrow={false}
          className="![--tooltip-mb:1rem]"
        >
          <i
            className={classNames('fa-fw cursor-pointer', flagToBadge(flag))}
          />
        </Tooltip>
      ))}
    </div>
  );
};

const Waving = () => (
  <motion.div
    style={{
      rotate: -20,
      display: 'inline-block',
      scale: 1.4,
    }}
    animate={{ rotate: 40 }}
    transition={{
      from: 0,
      duration: 0.4,
      ease: 'linear',
      type: 'tween',
      repeatType: 'reverse',
      repeat: Infinity,
    }}
  >
    <i className="fal fa-hand-wave"></i>
  </motion.div>
);

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  open,
  setOpen,
}) => {
  const { data, loading, error } = useUserProfileQuery({
    variables: { userID: userId },
    skip: !open,
  });
  const { user } = data || {};

  useKeyDown(['Escape'], () => {
    setOpen(false);
  });

  return (
    <UserProfilePortal>
      <AnimatePresence>
        {open && (
          <motion.div
            className="font-display fixed inset-0 z-50 flex items-start justify-end h-full backdrop-blur-sm backdrop-brightness-50"
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
                  {loading && (
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-1/4"></div>
                  )}
                  {error && <p>An error occurred. Please try again later</p>}

                  {user && (
                    <>
                      <div className="bg-slate-900 rounded-lg p-2 text-center flex flex-col items-center">
                        <div className="relative mb-20 w-full">
                          <div
                            style={{
                              backgroundImage: `url(${
                                user.coverURL || (loading ? '' : '')
                              })`,
                            }}
                            className="w-full h-[300px] bg-clip-border bg-center bg-cover rounded-lg bg-slate-200 dark:bg-slate-800"
                          ></div>
                          <Avatar
                            profileLink={false}
                            size="4xl"
                            duoAvatarURL={user.duoAvatarSmallURL}
                            rounded
                            className="absolute bottom-0 left-0 right-0 mx-auto translate-y-1/2 ring-8 ring-white !bg-slate-200 dark:ring-slate-900 dark:!bg-slate-800"
                          />
                          <Badges flags={user.flags} />
                        </div>
                        <Name
                          className="text-slate-900 dark:text-white font-bold text-xl"
                          user={user}
                          displayLogin={false}
                          hasNickname={!!user.nickname}
                        />
                        <p>@{user.duoLogin}</p>
                      </div>

                      <ThridPartyAccounts user={user} />

                      <div className="bg-slate-950 rounded-lg overflow-hidden p-2 flex flex-row justify-around items-center">
                        <div className="flex flex-col text-center">
                          <h5 className="">Followers</h5>
                          <p className="text-white !text-orange-500">12k</p>
                        </div>
                        <div className="flex flex-col text-center">
                          <h5 className="">Following</h5>
                          <p className="text-white !text-orange-500">123</p>
                        </div>
                      </div>

                      {!user.isSwimmer && (
                        <div className="bg-yellow-950 text-yellow-500 rounded-lg overflow-hidden p-2 flex flex-row justify-around items-center text-center">
                          <Waving />
                          <p>
                            Making a splash as a swimmer in the 42&apos;s
                            selection pool!
                          </p>
                        </div>
                      )}

                      <div className="flex flex-row space-x-3">
                        {user.currentCampus && (
                          <div className="bg-slate-950 rounded-lg overflow-hidden p-2 flex-1">
                            <h5 className="text-center">Campus</h5>
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
                        <div className="bg-slate-950 rounded-lg overflow-hidden p-2 flex-1">
                          <h5 className="text-center">Location</h5>
                          <div className="flex flex-row justify-center items-center space-x-2">
                            <LocationBadge location={user.lastLocation} />
                          </div>
                        </div>
                      </div>

                      {user?.intraProxy && (
                        <>
                          <div className="flex flex-row justify-around items-center space-x-3">
                            <div className="bg-slate-950 rounded-lg p-2 flex flex-1 flex-col text-center">
                              <h5>Pool</h5>
                              <p className="text-white first-letter:uppercase">
                                {user.poolMonth} {user.poolYear}
                              </p>
                            </div>
                            <div className="bg-slate-950 rounded-lg p-2 flex flex-1 flex-col text-center">
                              <h5>Evaluation Points</h5>
                              <p className="text-white">
                                {user.intraProxy.correctionPoint}
                              </p>
                            </div>
                            <div className="bg-slate-950 rounded-lg p-2 flex flex-1 flex-col text-center">
                              <h5>Wallet</h5>
                              <p className="text-white">
                                {user.intraProxy.wallet}
                              </p>
                            </div>
                          </div>
                          <CursusProgress intraProxy={user.intraProxy} />
                        </>
                      )}

                      {/* </div> */}
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

export default UserProfile;
