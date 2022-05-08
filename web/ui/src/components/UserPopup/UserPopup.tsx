import Avatar from '@components/Avatar';
import { LocationBadge } from '@components/Badge';
import Name from '@components/Name';
import { Location } from 'types/globals';
import DropdownMenu from './DropDownMenu';
import { UserPopupProps } from './types';

export const UserPopup = ({ user }: UserPopupProps) => {
  return (
    <div className="flex flex-col relative group items-center p-4 m-2 text-center grow-[1] min-w-[200px] max-w-[200px] transition-all rounded-lg border-2 border-transparent hover:cursor-pointer hover:scale-[102%] hover:border-indigo-500">
      <Avatar
        login={user.duoLogin}
        size="xxxl"
        rounded
        className="mb-4 bg-slate-800"
      />
      <h2 className="font-bold uppercase">{user.duoLogin}</h2>
      <Name className="font-light" user={user} />
      {/* @ts-ignore */}
      <LocationBadge {...(user.currentLocation as Location)} />
      <DropdownMenu userID={user.id} />
    </div>
  );
};

export default UserPopup;
