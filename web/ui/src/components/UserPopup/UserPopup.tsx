import UserCard from '@components/UserCard';
import classNames from 'classnames';

const POPUP_WIDTH = 200;
const POPUP_HEIGHT = 250;
const MARGIN = 4;

export const UserPopup = ({
  user,
  location,
  position,
}: {
  user: any;
  location: any;
  position: DOMRectReadOnly | null;
}) => {
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
      className={classNames(
        'bg-slate-200 dark:bg-slate-900 dark:to-slate-900 shadow-2xl shadow-slate-400/50 dark:shadow-black/50 rounded fixed left-0 top-0',
        user?.isFollowing
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
        className="max-h-[250px] h-[250px]"
      />
    </div>
  );
};
