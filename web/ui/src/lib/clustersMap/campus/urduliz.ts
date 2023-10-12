import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Urduliz extends Campus implements ICampus {
  emoji = (): string => '🇪🇸';

  name = (): CampusNames => 'urduliz';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>s(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        // prettier-ignore
        map: [
          ['T:r8',  'W:c1r8s1',  'W:c1r8s2',  'W:c1r8s3',  'W:c1r8s4',  'W:c1r8s5',  'W:c1r8s6',  'T:r8' ],
          ['T:r7',  'W:c1r7s1',  'W:c1r7s2',  'W:c1r7s3',  'W:c1r7s4',  'W:c1r7s5',  'W:c1r7s6',  'T:r7' ],
          ['T:r6',  'W:c1r6s1',  'W:c1r6s2',  'W:c1r6s3',  'W:c1r6s4',  'W:c1r6s5',  'W:c1r6s6',  'T:r6' ],
          ['T:r5',  'W:c1r5s1',  'W:c1r5s2',  'W:c1r5s3',  'W:c1r5s4',  'W:c1r5s5',  'W:c1r5s6',  'T:r5' ],
          ['T:r4',  'W:c1r4s1',  'W:c1r4s2',  'W:c1r4s3',  'W:c1r4s4',  'W:c1r4s5',  'W:c1r4s6',  'T:r4' ],
          ['T:r3',  'W:c1r3s1',  'W:c1r3s2',  'W:c1r3s3',  'W:c1r3s4',  'W:c1r3s5',  'W:c1r3s6',  'T:r3' ],
          ['T:r2',  'W:c1r2s1',  'W:c1r2s2',  'W:c1r2s3',  'W:c1r2s4',  'W:c1r2s5',  'W:c1r2s6',  'T:r2' ],
          ['T:r1',  'W:c1r1s1',  'W:c1r1s2',  'W:c1r1s3',  'W:c1r1s4',  'W:c1r1s5',  'W:c1r1s6',  'T:r1' ],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        // prettier-ignore
        map: [
          ['T:r8',  'W:c2r8s1',  'W:c2r8s2',  'W:c2r8s3',  'W:c2r8s4',  'W:c2r8s5',  'W:c2r8s6',  'T:r8' ],
          ['T:r7',  'W:c2r7s1',  'W:c2r7s2',  'W:c2r7s3',  'W:c2r7s4',  'W:c2r7s5',  'W:c2r7s6',  'T:r7' ],
          ['T:r6',  'W:c2r6s1',  'W:c2r6s2',  'W:c2r6s3',  'W:c2r6s4',  'W:c2r6s5',  'W:c2r6s6',  'T:r6' ],
          ['T:r5',  'W:c2r5s1',  'W:c2r5s2',  'W:c2r5s3',  'W:c2r5s4',  'W:c2r5s5',  'W:c2r5s6',  'T:r5' ],
          ['T:r4',  'W:c2r4s1',  'W:c2r4s2',  'W:c2r4s3',  'W:c2r4s4',  'W:c2r4s5',  'W:c2r4s6',  'T:r4' ],
          ['T:r3',  'W:c2r3s1',  'W:c2r3s2',  'W:c2r3s3',  'W:c2r3s4',  'W:c2r3s5',  'W:c2r3s6',  'T:r3' ],
          ['T:r2',  'W:c2r2s1',  'W:c2r2s2',  'W:c2r2s3',  'W:c2r2s4',  'W:c2r2s5',  'W:c2r2s6',  'T:r2' ],
          ['T:r1',  'W:c2r1s1',  'W:c2r1s2',  'W:c2r1s3',  'W:c2r1s4',  'W:c2r1s5',  'W:c2r1s6',  'T:r1' ],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        // prettier-ignore
        map: [
          ['T:r8',  'W:c3r8s1',  'W:c3r8s2',  'W:c3r8s3',  'W:c3r8s4',  'W:c3r8s5',  'W:c3r8s6',  'T:r8' ],
          ['T:r7',  'W:c3r7s1',  'W:c3r7s2',  'W:c3r7s3',  'W:c3r7s4',  'W:c3r7s5',  'W:c3r7s6',  'T:r7' ],
          ['T:r6',  'W:c3r6s1',  'W:c3r6s2',  'W:c3r6s3',  'W:c3r6s4',  'W:c3r6s5',  'W:c3r6s6',  'T:r6' ],
          ['T:r5',  'W:c3r5s1',  'W:c3r5s2',  'W:c3r5s3',  'W:c3r5s4',  'W:c3r5s5',  'W:c3r5s6',  'T:r5' ],
          ['T:r4',  'W:c3r4s1',  'W:c3r4s2',  'W:c3r4s3',  'W:c3r4s4',  'W:c3r4s5',  'W:c3r4s6',  'T:r4' ],
          ['T:r3',  'W:c3r3s1',  'W:c3r3s2',  'W:c3r3s3',  'W:c3r3s4',  'W:c3r3s5',  'W:c3r3s6',  'T:r3' ],
          ['T:r2',  'W:c3r2s1',  'W:c3r2s2',  'W:c3r2s3',  'W:c3r2s4',  'W:c3r2s5',  'W:c3r2s6',  'T:r2' ],
          ['T:r1',  'W:c3r1s1',  'W:c3r1s2',  'W:c3r1s3',  'W:c3r1s4',  'W:c3r1s5',  'W:c3r1s6',  'T:r1' ],
        ],
      }),
			new Cluster({
        identifier: 'c4',
        // prettier-ignore
        map: [
          ['T:r8',  'W:c4r8s1',  'W:c4r8s2',  'W:c4r8s3',  'W:c4r8s4',  'W:c4r8s5',  'W:c4r8s6',  'T:r8' ],
          ['T:r7',  'W:c4r7s1',  'W:c4r7s2',  'W:c4r7s3',  'W:c4r7s4',  'W:c4r7s5',  'W:c4r7s6',  'T:r7' ],
          ['T:r6',  'W:c4r6s1',  'W:c4r6s2',  'W:c4r6s3',  'W:c4r6s4',  'W:c4r6s5',  'W:c4r6s6',  'T:r6' ],
          ['T:r5',  'W:c4r5s1',  'W:c4r5s2',  'W:c4r5s3',  'W:c4r5s4',  'W:c4r5s5',  'W:c4r5s6',  'T:r5' ],
          ['T:r4',  'W:c4r4s1',  'W:c4r4s2',  'W:c4r4s3',  'W:c4r4s4',  'W:c4r4s5',  'W:c4r4s6',  'T:r4' ],
          ['T:r3',  'W:c4r3s1',  'W:c4r3s2',  'W:c4r3s3',  'W:c4r3s4',  'W:c4r3s5',  'W:c4r3s6',  'T:r3' ],
          ['T:r2',  'W:c4r2s1',  'W:c4r2s2',  'W:c4r2s3',  'W:c4r2s4',  'W:c4r2s5',  'W:c4r2s6',  'T:r2' ],
          ['T:r1',  'W:c4r1s1',  'W:c4r1s2',  'W:c4r1s3',  'W:c4r1s4',  'W:c4r1s5',  'W:c4r1s6',  'T:r1' ],
        ],
      }),
    ];
  }
}