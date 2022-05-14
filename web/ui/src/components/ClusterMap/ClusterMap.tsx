import Avatar from '@components/Avatar';
import classNames from 'classnames';
import { Children } from 'react';

export const ClusterMap = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      {Children.map(children, (c) => (
        <>{c}</>
      ))}
    </div>
  );
};

export const ClusterWorkspaceWithUser = ({
  displayText,
  location,
}: {
  identifier: string;
  displayText?: string;
  location: {
    identifier: string;
    user: { isFollowing: boolean; duoLogin: string };
  };
}) => {
  return (
    <div
      className={classNames(
        'flex flex-1 flex-col justify-center items-center m-0.5 rounded text-slate-500',
        location.user.isFollowing
          ? 'cursor-pointer bg-blue-300/30 dark:bg-blue-700/30 text-blue-500'
          : 'cursor-pointer bg-emerald-300/30 dark:bg-emerald-700/30 text-emerald-500'
      )}
    >
      <span className="mb-1">
        <Avatar login={location.user.duoLogin} rounded={false} size="md" />
      </span>
      <span className="text-xs">{displayText || location.identifier}</span>
    </div>
  );
};
export const ClusterWorkspace = ({
  identifier,
  displayText,
  connected,
  friend,
}: {
  identifier: string;
  displayText?: string;
  connected?: boolean;
  friend?: boolean;
}) => {
  return (
    <div
      className={classNames(
        'flex flex-1 flex-col justify-center items-center m-0.5 rounded text-slate-500',
        !connected && 'bg-slate-200/30 dark:bg-slate-900/30',
        connected &&
          !friend &&
          'cursor-pointer bg-emerald-300/30 dark:bg-emerald-700/30 text-emerald-500',
        connected &&
          friend &&
          'cursor-pointer bg-blue-300/30 dark:bg-blue-700/30 text-blue-500'
      )}
    >
      <span className="opacity-50">
        <i className="fa-light fa-computer"></i>
      </span>
      <span className="text-xs">{displayText || identifier}</span>
    </div>
  );
};

export const ClusterPillar = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center m-0.5 rounded bg-slate-200 dark:bg-slate-900"></div>
  );
};

export const ClusterEmpty = ({ displayText }: { displayText?: string }) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center m-0.5 rounded bg-transparent">
      {displayText}
    </div>
  );
};

export const ClusterRow = ({
  displayText,
  children,
}: {
  displayText: string;
  children: React.ReactNode[] | React.ReactNode;
}) => {
  return (
    <div className="flex flex-row flex-1">
      {displayText && <ClusterEmpty displayText={displayText} />}
      {Children.map(children, (c) => (
        <>{c}</>
      ))}
      {displayText && <ClusterEmpty displayText={displayText} />}
    </div>
  );
};
