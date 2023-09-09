import { ClusterMapEntity, ICluster } from './types';

/**
 * Cluster class represents a cluster in the cluster map. It contains the
 * cluster name, identifier, total number of workspaces and the cluster map.
 * @param name Cluster name (e.g. "Metropolis")
 * @param identifier Cluster identifier (e.g. "c1", "e1")
 * @param map Cluster map (2D array of ClusterMapEntity)
 */
export class Cluster implements ICluster {
  _name: string;

  _identifier: string;

  _totalWorkspaces: number;

  _map: ClusterMapEntity[][];

  constructor({
    name,
    identifier,
    map,
  }: {
    name?: string;
    identifier: string;
    map: ClusterMapEntity[][];
  }) {
    this._name = name || identifier;
    this._identifier = identifier;
    this._totalWorkspaces = this.calculateTotalWorkspaces(map);
    this._map = map;
  }

  /**
   * Custom cluster name (e.g. "Metropolis").
   * If not set, the cluster name will be the cluster identifier.
   */
  name = (): string => this._name;

  /**
   * Returns true if the cluster has a custom name.
   * Returns false if the cluster name is the same as the cluster identifier.
   */
  hasName = (): boolean => this._name !== this._identifier;

  /**
   * Cluster identifier (e.g. "c1", "e1").
   */
  identifier = (): string => this._identifier;

  /**
   * Total number of available workspaces in the cluster (e.g. 20).
   */
  totalWorkspaces = (): number => this._totalWorkspaces;

  /**
   * map() returns a 2D array of ClusterMapEntity.
   * Each entry in the array represents a row in the cluster map.
   * Each entry in the row represents an `ClusterMapEntity` in the cluster map.
   */
  map = (): ClusterMapEntity[][] => this._map;

  /**
   * Calculates the total number of workspaces in the cluster map by counting
   * the number of entities has identified as a workspace.
   */
  private calculateTotalWorkspaces(map: ClusterMapEntity[][]): number {
    return map.flat().filter((entity) => entity?.startsWith('W:')).length;
  }
}
