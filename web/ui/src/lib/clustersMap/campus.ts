import Campuses from '.';
import { ICampus, ICluster } from './types';
import { CampusIdentifier, CampusLink } from './types.generated';

/**
 * Campus class represents a campus in the cluster map. It contains the
 * campus name, emoji, extractor function, and the list of clusters.
 */
export class Campus implements ICampus {
  emoji(): string {
    throw new Error('Method not implemented.');
  }

  name(): string {
    throw new Error('Method not implemented.');
  }

  identifier(): CampusIdentifier {
    return Object.keys(Campuses).find(
      (key) => Campuses[key as CampusIdentifier] === this,
    ) as CampusIdentifier;
  }

  link(): CampusLink {
    return this.identifier()
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase() as CampusLink;
  }

  extractorRegexp(): RegExp {
    throw new Error('Method not implemented.');
  }

  extractor(identifier: string) {
    const result = this.extractorRegexp().exec(identifier);
    if (!result || !result.groups) {
      const err = new Error(
        `Invalid identifier for ${this.name()}: ${identifier}`,
      );
      return {
        cluster: err.message,
        row: err.message,
        workspace: err.message,
        clusterWithLetter: err.message,
        rowWithLetter: err.message,
        workspaceWithLetter: err.message,
      };
    }

    return result.groups as ReturnType<ICampus['extractor']>;
  }

  /**
   * List of clusters for this campus
   */
  clusters(): ICluster[] {
    throw new Error('Method not implemented.');
  }

  /**
   * Find a cluster by its identifier (e.g. "c1").
   * Returns undefined if not found. Otherwise, returns the cluster.
   */
  cluster(identifier: string): ICluster | undefined {
    return this.clusters().find(
      (cluster) => cluster.identifier() === identifier,
    );
  }
}
