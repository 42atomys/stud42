import Avatar from '@components/Avatar';
import { useMe } from '@ctx/currentUserContext';
import { ClusterMapAvatarSize } from '@graphql.d';
import useSettings from '@lib/useSettings';
import classNames from 'classnames';
import { Children } from 'react';
import { ClusterContext } from './ClusterContainer';
import { MapLocation } from './types';

/**
 * ClusterTableMap component is used to display a cluster map with a table style
 * like Paris maps.
 */
export const ClusterTableMap = ({
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
  const [settings] = useSettings();
  const { isMe, isFollowed } = useMe();

  return (
    <ClusterContext.Consumer>
      {({ highlight, hightlightVisibility }) => (
        <div
          className={classNames(
            'flex flex-1 flex-col justify-center items-center m-0.5 rounded cursor-pointer transition ease-in-out duration-200',
            isMe(location.user)
              ? 'bg-cyan-300/60 dark:bg-cyan-700/60 text-cyan-500'
              : isFollowed(location.user)
              ? 'bg-blue-300/60 dark:bg-blue-700/60 text-blue-500'
              : location.user.isSwimmer
              ? 'bg-yellow-300/30 dark:bg-yellow-700/30 text-yellow-500'
              : 'bg-emerald-300/30 dark:bg-emerald-700/30 text-emerald-500',
            highlight &&
              hightlightVisibility(location.identifier) == 'HIGHLIGHT'
              ? '!bg-indigo-500 shadow-sm shadow-indigo-500/50 !text-slate-100'
              : '',
            highlight && hightlightVisibility(location.identifier) == 'DIMMED'
              ? 'opacity-30'
              : 'opacity-100'
          )}
          onClick={(e) => onClick && onClick(e, location)}
          onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, location)}
          onMouseLeave={(e) => onMouseLeave && onMouseLeave(e, location)}
        >
          <span className="mb-1">
            <Avatar
              duoAvatarURL={location.user.duoAvatarSmallURL}
              rounded={false}
              flags={location.user.flags}
              size={
                settings.clusterMapAvatarSize === ClusterMapAvatarSize.LARGE
                  ? 'xl'
                  : settings.clusterMapAvatarSize ===
                    ClusterMapAvatarSize.MEDIUM
                  ? 'md'
                  : 'auto-based-on-witdth'
              }
            />
          </span>
          <span className="text-xs">{displayText || location.identifier}</span>
        </div>
      )}
    </ClusterContext.Consumer>
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
  displayText?: string;
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
