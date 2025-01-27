import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { ICampus } from '../types';

export class Malaga extends Campus implements ICampus {
  emoji = (): string => '🇪🇸';

  name = (): string => 'Malaga';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>s(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        // prettier-ignore
        map: [...Array(15)].map((_, r) => ['T:r' + (15 - r), ...Array(6).fill(0).map((_, p) => `W:c1r${15 - r}s${p + 1}`), 'T:r' + (15 - r)]),
      }),
      new Cluster({
        identifier: 'c2',
        // prettier-ignore
        map: [...Array(10)].map((_, r) => ['T:r' + (10 - r), ...Array(6).fill(0).map((_, p) => `W:c2r${10 - r}s${p + 1}`), 'T:r' + (10 - r)]),
      }),
      new Cluster({
        identifier: 'c3',
        // prettier-ignore
        map: [...Array(10)].map((_, r) => ['T:r' + (10 - r), ...Array(6).fill(0).map((_, p) => `W:c3r${10 - r}s${p + 1}`), 'T:r' + (10 - r)]),
      }),
    ];
  }
}
