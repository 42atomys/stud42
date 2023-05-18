import Avatar from '@components/Avatar';
import { AkaBadgy, LocationBadge } from '@components/Badge';
import Name from '@components/Name';
import Tooltip from '@components/Tooltip';
import { useMe } from '@ctx/currentUser';
import { UserFlag } from '@graphql.d';
import classNames from 'classnames';
import { PropsWithClassName } from 'types/globals';
import DropdownMenu from './DropDownMenu';
import { UserCardProps } from './types';

export const UserCard: React.FC<PropsWithClassName<UserCardProps>> = ({
  user,
  location,
  className,
  buttonAlwaysShow,
}) => {
  const { isMe } = useMe();

  if (!user) return null;

  const hasCover = !!user.coverURL && user.coverURL !== '';
  return (
    <div
      className={classNames(
        'relative group',
        'text-center grow-[1] min-w-[200px] max-w-[200px] transition-all',
        'rounded-lg border-2 border-transparent hover:cursor-pointer overflow-hidden',
        className
      )}
    >
      {hasCover && (
        <div
          className={classNames(
            'absolute top-0 left-0 right-0 bg-cover bg-center w-full h-full blur-sm scale-110',
            '[-webkit-mask-image:linear-gradient(rgb(0,0,0)0%,rgba(0,0,0,0)58%)]',
            'dark:[-webkit-mask-image:linear-gradient(rgb(0,0,0)42%,rgba(0,0,0,0.2)58%)]'
          )}
          style={{
            backgroundImage: `url(${user.coverURL})`,
          }}
        />
      )}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-4 z-10">
        <Avatar
          userId={user.id}
          duoAvatarURL={user.duoAvatarSmallURL}
          size="3xl"
          rounded
          className="mb-4 bg-slate-800 outline-offset-4"
          flags={user.flags}
        />
        <div className="flex-1 flex flex-col justify-start items-center">
          <h2
            className={classNames('flex flex-row font-bold uppercase', {
              'text-fuchsia-500': user.flags?.includes(UserFlag.SPONSOR),
            })}
          >
            <span>{user.duoLogin}</span>
            {user.flags?.includes(UserFlag.SPONSOR) && (
              <Tooltip
                allowInteractions={false}
                text="Github Sponsor"
                direction="top"
                color="fuchsia"
                size="xs"
                className="ml-2 normal-case"
              >
                <i className="fa-solid fa-user-astronaut"></i>
              </Tooltip>
            )}
          </h2>
          <Name className="font-light min-w-0 w-full" user={user} />
          {user.nickname && user.nickname !== '' && (
            <p className="flex justify-start items-center space-x-1 my-1 text-sm">
              <AkaBadgy /> <span>{user.nickname}</span>
            </p>
          )}
        </div>
        <LocationBadge location={location} />
        {!isMe(user) && (
          <DropdownMenu user={user} buttonAlwaysShow={buttonAlwaysShow} />
        )}
      </div>
    </div>
  );
};

export default UserCard;
