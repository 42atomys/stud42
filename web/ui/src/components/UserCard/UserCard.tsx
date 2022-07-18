import Avatar from '@components/Avatar';
import { LocationBadge } from '@components/Badge';
import Name from '@components/Name';
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
        'flex flex-col relative group items-center justify-center p-4 text-center grow-[1] min-w-[200px] max-w-[200px] transition-all rounded-lg border-2 border-transparent hover:cursor-pointer',
        className
      )}
    >
      <Avatar
        login={user.duoLogin}
        duoAvatarURL={user.duoAvatarURL}
        size="xxxl"
        rounded
        className="mb-4 bg-slate-800"
      />
      <h2 className="font-bold uppercase">{user.duoLogin}</h2>
      <Name className="font-light" user={user} />
      <LocationBadge location={location} />
      <DropdownMenu
        userID={user.id}
        isFriend={user.isFollowing}
        buttonAlwaysShow={buttonAlwaysShow}
        refetchQueries={refetchQueries}
      />
    </div>
  );
};

export default UserCard;
