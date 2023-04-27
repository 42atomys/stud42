import { Avatar } from '@components/Avatar';
import { Name } from '@components/Name';
import { useUserProfileQuery } from '@graphql.d';
import useKeyDown from '@lib/useKeyDown';
import { AnimatePresence, motion } from 'framer-motion';
import UserProfilePortal from './UserProfilePortal';

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
              className="bg-clip-border bg-center bg-cover relative transform overflow-hidden h-[100vh] bg-white dark:bg-slate-900 text-left shadow-xl w-full sm:max-w-lg"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              style={{}}
            >
              <div className="bg-opacity-80 backdrop-filter backdrop-blur-3xl bg-slate-900 px-4 pt-5 pb-4 sm:p-6 h-full">
                <motion.div
                  className=""
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
                      <div className="bg-slate-950 rounded-lg overflow-hidden p-2">
                        <div className="relative mb-20">
                          <div
                            style={{
                              backgroundImage: `url(${
                                user.coverURL ||
                                (loading ? '' : 'https://picsum.photos/640/360')
                              })`,
                            }}
                            className="w-full h-[300px] bg-clip-border bg-center bg-cover rounded-lg"
                          ></div>
                          <Avatar
                            profileLink={false}
                            size="4xl"
                            duoAvatarURL={user.duoAvatarSmallURL}
                            rounded
                            className="absolute bottom-0 left-8 translate-y-1/2 ring-8 ring-white dark:ring-slate-950"
                          />
                        </div>
                        <Name
                          className="text-slate-900 dark:text-white font-bold text-xl"
                          user={user}
                          displayLogin={false}
                          hasNickname={!!user.nickname}
                        />
                        <p>@{user.duoLogin}</p>
                        <ul>
                          {user.accounts?.map((account) => {
                            if (!account) return null;
                            return (
                              <li key={account.uid}>
                                {account.provider} - {account.username}
                              </li>
                            );
                          })}
                        </ul>
                        {user.currentCampus?.name}
                        {(user.isSwimmer && <p>Swimmer</p>) || (
                          <p>Not a swimmer</p>
                        )}
                        {user.flags?.map((flag) => {
                          return <p key={flag}>{flag}</p>;
                        })}
                        {user.lastLocation && (
                          <p>{user.lastLocation.identifier}</p>
                        )}
                        {user.poolMonth} {user.poolYear}
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

export default UserProfile;
