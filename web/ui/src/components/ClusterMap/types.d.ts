type Connection = {
  edges: Array<{ node?: { identifier: string } | null } | null>;
};

type NodeFinderFunc = <T extends Connection>(
  connection: T,
  identifier: string
) => NonNullable<T['edges'][number]>['node'] | null;

type NodeIndexFinderFunc = <T extends Connection>(
  connection: T,
  identifier: string
) => number | -1;
