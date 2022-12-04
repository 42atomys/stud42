import type { Actions, PayloadOf } from '@components/UserPopup';
import type { ClusterViewQuery } from '@graphql.d';
import { CampusNames } from '@lib/clustersMap';
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

export type ClusterContainerProps = {
  [Key in CampusNames as readonly Key]: {
    campus: Key;
    // TODO Found a way to make this type more specific than `string`?
    cluster: string;
    children: (props: ClusterContainerChildrenProps) => JSX.Element;
  };
}[CampusNames];

type ClusterContainerComponent = (props: ClusterContainerProps) => JSX.Element;

// Represents that state made available via this reducer
type ClusterState = {
  highlight: boolean;
  hightlightVisibility: (identifier: string) => 'HIGHLIGHT' | 'DIMMED';
};

// This is what our PopupContext will be expecting as its value prop.
type ClusterContextInterface = readonly ClusterState;
