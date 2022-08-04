import type { Actions, PayloadOf } from '@components/UserPopup';
import type { ClusterViewQuery } from '@graphql.d';
import { NonNullable } from 'types/utils';

// ClusterMap.tsx
export type MapLocation = NonNullable<
  ClusterViewQuery['locationsByCluster']['edges'][number]['node']
>;

type Connection = {
  edges: Array<{ node?: Pick<MapLocation, 'identifier'> | null } | null>;
};

type NodeFinderFunc = <T extends Connection>(
  connection: T,
  identifier: string
) => NonNullable<T['edges'][number]>['node'] | null;

type NodeIndexFinderFunc = <T extends Connection>(
  connection: T,
  identifier: string
) => number | -1;

// ClusterContainer.tsx
type ClusterContainerChildrenProps = {
  locations: ClusterViewQuery['locationsByCluster'];
  showPopup: (s: PayloadOf<Actions, 'SHOW_POPUP'>) => void;
  hidePopup: () => void;
};

type CampusClusterMap = {
  Paris: 'e1' | 'e2' | 'e3';
  Helsinki: 'c1' | 'c2' | 'c3';
  Malaga: 'c1' | 'c2' | 'c3';
};

export type ClusterContainerProps = {
  [Key in keyof CampusClusterMap]: {
    campus: Key;
    cluster: CampusClusterMap[Key];
    children: (props: ClusterContainerChildrenProps) => JSX.Element;
  };
}[keyof CampusClusterMap];

type ClusterContainerComponent = (props: ClusterContainerProps) => JSX.Element;

// Represents that state made available via this reducer
type ClusterState = {
  highlight: boolean;
  hightlightVisibility: (identifier: string) => 'HIGHLIGHT' | 'DIMMED';
};

// This is what our PopupContext will be expecting as its value prop.
type ClusterContextInterface = readonly ClusterState;
