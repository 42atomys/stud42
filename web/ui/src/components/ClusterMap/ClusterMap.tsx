import Avatar from '@components/Avatar';
import classNames from 'classnames';
import { Children } from 'react';
import { MapLocation } from './types';

/**
 * ClusterMap component is used to display a cluster map with a table style
 * like Paris maps.
 */
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

/**
 * ClusterWorkspaceWithUser component is used to display a workspace with
 * user avatar and interaction strategy when the user is actually connected to
 * this workspace.
 * and identifier in a `ClusterRow`
 */
export const ClusterWorkspaceWithUser = ({
  displayText,
  location,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  identifier: string;
  displayText?: string;
  location: MapLocation;
  onMouseEnter?: (
    e: React.MouseEvent<HTMLDivElement>,
    location: MapLocation
  ) => void;
  onMouseLeave?: (
    e: React.MouseEvent<HTMLDivElement>,
    location: MapLocation
  ) => void;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    location: MapLocation
  ) => void;
}) => {
  return (
    <div
      className={classNames(
        'flex flex-1 flex-col justify-center items-center m-0.5 rounded text-slate-500',
        location.user.isFollowing
          ? 'cursor-pointer bg-blue-300/30 dark:bg-blue-700/30 text-blue-500'
          : 'cursor-pointer bg-emerald-300/30 dark:bg-emerald-700/30 text-emerald-500'
      )}
      onClick={(e) => onClick && onClick(e, location)}
      onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, location)}
      onMouseLeave={(e) => onMouseLeave && onMouseLeave(e, location)}
    >
      <span className="mb-1">
        <Avatar
          login={location.user.duoLogin}
          duoAvatarURL={location.user.duoAvatarURL}
          rounded={false}
          size="md"
        />
      </span>
      <span className="text-xs">{displayText || location.identifier}</span>
    </div>
  );
};

/**
 * ClusterWorkspace component is used to display a workspace with compouter icon
 * and identifier in a `ClusterRow`
 */
export const ClusterWorkspace = ({
  identifier,
  displayText,
}: {
  identifier: string;
  displayText?: string;
}) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center m-0.5 rounded text-slate-500">
      <span className="opacity-50">
        <i className="fa-light fa-computer"></i>
      </span>
      <span className="text-xs">{displayText || identifier}</span>
    </div>
  );
};

/**
 * ClusterPillar component is used to display a simple pillar in a `ClusterRow`
 * Principally used to display a pillar or something cannot be used as path.
 */
export const ClusterPillar = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center m-0.5 rounded bg-slate-200 dark:bg-slate-900"></div>
  );
};

/**
 * ClusterPillar component is used to display an empty space in a `ClusterRow`.
 * Principally used to display a path in the cluster.
 */
export const ClusterEmpty = ({ displayText }: { displayText?: string }) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center m-0.5 rounded bg-transparent">
      {displayText}
    </div>
  );
};

/**
 * ClusterRow component is used to display a row in cluster map row with a table
 * style like Paris maps.
 */
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
