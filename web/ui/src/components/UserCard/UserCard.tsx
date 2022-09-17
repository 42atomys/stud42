import Avatar from '@components/Avatar';
import { LocationBadge } from '@components/Badge';
import Name from '@components/Name';
import Tooltip from '@components/Tooltip';
import { Flag } from '@graphql.d';
import classNames from 'classnames';
import DropdownMenu from './DropDownMenu';
import { UserCardComponent } from './types';

export const UserCard: UserCardComponent = ({
  user,
  location,
  className,
  buttonAlwaysShow,
  refetchQueries,
}) => {
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
        login={user.duoLogin}
        duoAvatarURL={user.duoAvatarURL}
        size="xxxl"
        rounded
        className="mb-4 bg-slate-800 outline-offset-4"
        flags={user.flags}
      />
      <h2
        className={classNames('flex flex-row font-bold uppercase', {
          'text-fuchsia-500': user.flags?.includes(Flag.SPONSOR),
        })}
      >
        <span>{user.duoLogin}</span>
        {user.flags?.includes(Flag.SPONSOR) && (
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
      {!user.isMe && (
        <DropdownMenu
          user={user}
          isFriend={user.isFollowing}
          buttonAlwaysShow={buttonAlwaysShow}
          refetchQueries={refetchQueries}
        />
      )}
    </div>
  );
};

export default UserCard;
