import Avatar from '@components/Avatar';
import { Tooltip } from '@components/Tooltip';
import { useMe } from '@ctx/currentUser';
import { ClusterMapAvatarSize } from '@graphql.d';
import classNames from 'classnames';
import { motion } from 'framer-motion';
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
    <motion.div layout layoutRoot className="flex flex-col w-full h-full">
      {Children.map(children, (c) => (
        <>{c}</>
      ))}
    </motion.div>
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
    location: MapLocation,
  ) => void;
  onMouseLeave?: (
    e: React.MouseEvent<HTMLDivElement>,
    location: MapLocation,
  ) => void;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    location: MapLocation,
  ) => void;
}) => {
  const {
    isMe,
    isFollowed,
    me: { settings },
  } = useMe();

  return (
    <ClusterContext.Consumer>
      {({ highlight, hightlightVisibility }) => (
        <motion.div
          layoutId={`user-popup-${location.user.id}`}
          transition={{ duration: 0 }}
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
              : 'opacity-100',
          )}
          onClick={(e) => onClick && onClick(e, location)}
          onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, location)}
          onMouseLeave={(e) => onMouseLeave && onMouseLeave(e, location)}
        >
          <span className="mb-1">
            <Avatar
              duoAvatarURL={location.user.duoAvatarSmallURL}
              profileLink={false}
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
        </motion.div>
      )}
    </ClusterContext.Consumer>
  );
};

/**
 * ClusterWorkspace component is used to display a workspace with computer icon
 * and identifier in a `ClusterRow`
 */
export const ClusterWorkspace = ({
  identifier,
  displayText,
  kind = 'WORKSPACE',
}: {
  identifier: string;
  displayText?: string;
  kind?: 'WORKSPACE' | 'PERSONAL_WORKSPACE';
}) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center m-0.5 rounded text-slate-500">
      <Tooltip
        text={kind === 'WORKSPACE' ? identifier : 'Personal Workspace'}
        size="xs"
        color="black"
        direction="top"
        className="flex flex-col justify-center items-center"
      >
        <span className="opacity-50">
          <i
            className={classNames('fa-light', {
              'fa-computer': kind === 'WORKSPACE',
              'fa-laptop': kind === 'PERSONAL_WORKSPACE',
            })}
          ></i>
        </span>
        <span className="text-xs">{displayText || identifier}</span>
      </Tooltip>
    </div>
  );
};

/**
 * ClusterPillar component is used to display a simple pillar in a `ClusterRow`
 * Principally used to display a pillar or something cannot be used as path.
 */
export const ClusterPillar = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center m-0.5 rounded bg-slate-200 dark:bg-slate-950"></div>
  );
};

/**
 * ClusterEmpty component is used to display an empty space in a `ClusterRow`.
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
