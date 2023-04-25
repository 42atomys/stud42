import UserCard from '@components/UserCard';
import { useMe } from '@ctx/currentUser';
import { User, UserFlag } from '@graphql.d';
import classNames from 'classnames';
import { createRef, useEffect } from 'react';

const POPUP_WIDTH = 200;
const POPUP_HEIGHT = 250;
const MARGIN = 4;

export const UserPopup = ({
  user,
  location,
  position,
  onClickOutside,
}: {
  user: User;
  location: any;
  position: DOMRectReadOnly | null;
  onClickOutside: () => void;
}) => {
  const { isFollowed } = useMe();
  const ref = createRef<HTMLDivElement>();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  if (!position) return null;

  const top =
    position.top + POPUP_HEIGHT > window.innerHeight
      ? position.top - POPUP_HEIGHT + position.height
      : position.top;

  const left =
    position.left + position.width + POPUP_WIDTH + MARGIN > window.innerWidth
      ? position.left - POPUP_WIDTH - MARGIN
      : position.left + position.width + MARGIN;

  return (
    <div
      ref={ref}
      className={classNames(
        'bg-slate-200 dark:bg-slate-900 dark:to-slate-900 shadow-2xl shadow-slate-400/50 dark:shadow-black/50 rounded fixed left-0 top-0',
        isFollowed(user)
          ? 'border-blue-200 dark:border-blue-800'
          : 'border-emerald-200 dark:border-emerald-800'
      )}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <UserCard
        user={user}
        location={location}
        className={classNames('max-h-[250px] h-[250px] border-0', {
          'bg-gradient-to-b from-fuchsia-500/20 to-transparent':
            user.flags?.includes(UserFlag.SPONSOR),
        })}
        buttonAlwaysShow={true}
      />
    </div>
  );
};
