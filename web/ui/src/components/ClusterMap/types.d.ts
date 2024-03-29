import type { Actions, PayloadOf } from '@components/UserPopup';
import type { ClusterViewQuery } from '@graphql.d';
import { NonNullable } from 'types/utils';
import { ICampus, ICluster } from '@lib/clustersMap';

// ClusterMap.tsx
export type MapLocation = NonNullable<
  ClusterViewQuery['locationsByCluster']['edges'][number]['node']
>;

type Connection = {
  edges: Array<{ node?: Pick<MapLocation, 'identifier'> | null } | null>;
};

type NodeFinderFunc = <T extends Connection>(
  connection: T,
  identifier: string,
) => NonNullable<T['edges'][number]>['node'] | null;

type NodeIndexFinderFunc = <T extends Connection>(
  connection: T,
  identifier: string,
) => number | -1;

// ClusterContainer.tsx
type ClusterContainerChildrenProps = {
  locations: ClusterViewQuery['locationsByCluster'];
  showPopup: (s: PayloadOf<Actions, 'SHOW_POPUP'>) => void;
  hidePopup: () => void;
};

export type ClusterContainerProps = {
  campus: ICampus;
  cluster: ICluster;
  children: (props: ClusterContainerChildrenProps) => JSX.Element;
};

type ClusterContainerComponent = (props: ClusterContainerProps) => JSX.Element;

// Represents that state made available via this reducer
type ClusterState = {
  highlight: boolean;
  hightlightVisibility: (identifier: string) => 'HIGHLIGHT' | 'DIMMED';
};

// This is what our PopupContext will be expecting as its value prop.
type ClusterContextInterface = readonly ClusterState;
