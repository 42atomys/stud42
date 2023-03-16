import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Nice extends Campus implements ICampus {
  emoji = (): string => '🇫🇷';

  name = (): CampusNames => 'nice';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>e(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        name: 'Cluster 1',
        totalWorkspaces: 48,
        // prettier-ignore
        map: [
          [  null,        null,        null,        null,  null, 'W:c1r1p9',  'W:c1r1p8',  'W:c1r1p7', 'W:c1r1p6', 'W:c1r1p5', 'W:c1r1p4', 'W:c1r1p3', 'W:c1r1p2', 'W:c1r1p1', 'T:r1'],
          [  null,        null,        null,        null,  null, 'W:c1r2p9',  'W:c1r2p8',  'W:c1r2p7', 'W:c1r2p6', 'W:c1r2p5', 'W:c1r2p4', 'W:c1r2p3', 'W:c1r2p2', 'W:c1r2p1', 'T:r2'],
          ['T:r5',  'W:c1r5p1',  'W:c1r5p2',  'W:c1r5p3',  null, 'W:c1r3p9',  'W:c1r3p8',  'W:c1r3p7', 'W:c1r3p6', 'W:c1r3p5', 'W:c1r3p4', 'W:c1r3p3', 'W:c1r3p2', 'W:c1r3p1', 'T:r3'],
          ['T:r6',  'W:c1r6p1',  'W:c1r6p2',  'W:c1r6p3',  null, 'W:c1r4p9',  'W:c1r4p8',  'W:c1r4p7', 'W:c1r4p6', 'W:c1r4p5', 'W:c1r4p4', 'W:c1r4p3', 'W:c1r4p2', 'W:c1r4p1', 'T:r4'],
          ['T:r7',  'W:c1r7p1',  'W:c1r7p2',  'W:c1r7p3',  null,       null,        null,        null,        null,      null,       null,       null,       null,       null,   null],
          ['T:r8',  'W:c1r8p1',  'W:c1r8p2',  'W:c1r8p3',  null,       null,        null,        null,        null,      null,       null,       null,       null,       null,   null],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        name: 'Cluster 2',
        totalWorkspaces: 72,
        // prettier-ignore
        map: [
          ['T:r9',   'W:c2r9p1',   'W:c2r9p2',   'W:c2r9p3',  null,       null,        null,        null, 'W:c2r1p6', 'W:c2r1p5', 'W:c2r1p4', 'W:c2r1p3', 'W:c2r1p2', 'W:c2r1p1', 'T:r1'],
          ['T:r10', 'W:c2r10p1',  'W:c2r10p2',  'W:c2r10p3',  null,       null,        null,        null, 'W:c2r2p6', 'W:c2r2p5', 'W:c2r2p4', 'W:c2r2p3', 'W:c2r2p2', 'W:c2r2p1', 'T:r2'],
          ['T:r11', 'W:c2r11p1',  'W:c2r11p2',  'W:c2r11p3',  null,       null,        null,        null, 'W:c2r3p6', 'W:c2r3p5', 'W:c2r3p4', 'W:c2r3p3', 'W:c2r3p2', 'W:c2r3p1', 'T:r3'],
          ['T:r12', 'W:c2r12p1',  'W:c2r12p2',  'W:c2r12p3',  null, 'W:c2r4p9',  'W:c2r4p8',  'W:c2r4p7', 'W:c2r4p6', 'W:c2r4p5', 'W:c2r4p4', 'W:c2r4p3', 'W:c2r4p2', 'W:c2r4p1', 'T:r4'],
          [   null,        null,         null,         null,  null, 'W:c2r5p9',  'W:c2r5p8',  'W:c2r5p7', 'W:c2r5p6', 'W:c2r5p5', 'W:c2r5p4', 'W:c2r5p3', 'W:c2r5p2', 'W:c2r5p1', 'T:r5'],
          [   null,        null,         null,         null,  null, 'W:c2r6p9',  'W:c2r6p8',  'W:c2r6p7', 'W:c2r6p6', 'W:c2r6p5', 'W:c2r6p4', 'W:c2r6p3', 'W:c2r6p2', 'W:c2r6p1', 'T:r6'],
          [   null,        null,         null,         null,  null, 'W:c2r7p9',  'W:c2r7p8',  'W:c2r7p7', 'W:c2r7p6', 'W:c2r7p5', 'W:c2r7p4', 'W:c2r7p3', 'W:c2r7p2', 'W:c2r7p1', 'T:r7'],
          [   null,        null,         null,         null,  null,       null,        null,        null, 'W:c2r8p6', 'W:c2r8p5', 'W:c2r8p4', 'W:c2r8p3', 'W:c2r8p2', 'W:c2r8p1', 'T:r8'],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        name: 'Cluster 3',
        totalWorkspaces: 12,
        // prettier-ignore
        map: [
          ['T:r1', 'W:c3r1p6', 'W:c3r1p5', 'W:c3r1p4', 'W:c3r1p3', 'W:c3r1p2', 'W:c3r1p1'],
          ['T:r2', 'W:c3r2p6', 'W:c3r2p5', 'W:c3r2p4', 'W:c3r2p3', 'W:c3r2p2', 'W:c3r2p1'],
        ],
      }),
      new Cluster({
        identifier: 'c4',
        name: 'Cluster 4',
        totalWorkspaces: 12,
        // prettier-ignore
        map: [
          ['T:r1', 'W:c4r1p6', 'W:c4r1p5', 'W:c4r1p4', 'W:c4r1p3', 'W:c4r1p2', 'W:c4r1p1'],
          ['T:r2', 'W:c4r2p6', 'W:c4r2p5', 'W:c4r2p4', 'W:c4r2p3', 'W:c4r2p2', 'W:c4r2p1'],
        ],
      }),
    ];
  }
}
