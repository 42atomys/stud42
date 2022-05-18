import type { Actions, PayloadOf } from "@components/UserPopup";
import type { ClusterViewQuery } from "@graphql.d";

type MapLocation = {
  identifier: string
  user: {
    duoLogin: string;
    firstName: string;
    usualFirstName?: string | null | undefined;
    lastName: string;
    isFollowing: boolean;
  }
}

type Connection = {
  edges: Array<{ node?: Pick<MapLocation, "identifier"> | null } | null>;
};

type NodeFinderFunc = <T extends Connection>(
  connection: T,
  identifier: string
) => NonNullable<T['edges'][number]>['node'] | null;

type NodeIndexFinderFunc = <T extends Connection>(
  connection: T,
  identifier: string
) => number | -1;

// ClusterComponent.tsx 

type ClusterContainerChildrenProps = {
  locations: ClusterViewQuery['locationsByCluster']
  showPopup: (s: PayloadOf<Actions, "SHOW_POPUP">) => void
  hidePopup: () => void
}

type ClusterContainerProps = {
  campus: 'Paris'
  cluster: 'e1' | 'e2' | 'e3'
  children: (props: ClusterContainerChildrenProps) => JSX.Element
}

type ClusterContainerComponent = (props: ClusterContainerProps) => JSX.Element