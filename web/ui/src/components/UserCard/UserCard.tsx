import Avatar from '@components/Avatar';
import { LocationBadge } from '@components/Badge';
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

  return (
    <div
      className={classNames(
        'flex flex-col relative group items-center justify-center p-4',
        'text-center grow-[1] min-w-[200px] max-w-[200px] transition-all',
        'rounded-lg border-2 border-transparent hover:cursor-pointer',
        className
      )}
    >
      <Avatar
        userId={user.id}
        duoAvatarURL={user.duoAvatarSmallURL}
        size="3xl"
        rounded
        className="mb-4 bg-slate-800 outline-offset-4"
        flags={user.flags}
      />
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
      <LocationBadge location={location} />
      {!isMe(user) && (
        <DropdownMenu user={user} buttonAlwaysShow={buttonAlwaysShow} />
      )}
    </div>
  );
};

export default UserCard;
