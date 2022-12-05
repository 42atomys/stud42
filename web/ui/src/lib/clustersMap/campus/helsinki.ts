import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Helsinki extends Campus implements ICampus {
  emoji = (): string => '🇫🇮';

  name = (): CampusNames => 'helsinki';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        totalWorkspaces: 79,
        // prettier-ignore
        map: [
          ['T:r6', 'W:c1r6p1', 'W:c1r6p2', 'W:c1r6p3', 'W:c1r6p4', 'W:c1r6p5', 'W:c1r6p6', 'W:c1r6p7', 'W:c1r6p8', 'W:c1r6p9', null,       null,       null,       'W:c1r6p10', 'W:c1r6p11', 'W:c1r6p12', 'W:c1r6p13', 'W:c1r6p14', 'W:c1r6p15', 'W:c1r6p16', 'W:c1r6p17', 'W:c1r6p18', 'W:c1r6p19', 'W:c1r6p20', 'W:c1r6p21', 'T:r6'],
          ['T:r5', 'W:c1r5p1', 'W:c1r5p2', 'W:c1r5p3', 'W:c1r5p4', 'W:c1r5p5', 'W:c1r5p6', 'W:c1r5p7', 'W:c1r5p8', 'W:c1r5p9', null,       null,       null,       'W:c1r5p10', 'W:c1r5p11', 'W:c1r5p12', 'W:c1r5p13', 'W:c1r5p14', 'W:c1r5p15', 'W:c1r5p16', 'W:c1r5p17', 'W:c1r5p18', 'W:c1r5p19', 'W:c1r5p20', 'W:c1r5p21', 'T:r5'],
          [null,   null,       null,       null,       null,       'T:r4',     'W:c1r4p1', 'W:c1r4p2', 'W:c1r4p3', 'W:c1r4p4', 'W:c1r4p5', 'W:c1r4p6', 'W:c1r4p7', 'W:c1r4p8', null,        'W:c1r4p9',  'W:c1r4p10', 'W:c1r4p11', 'T:r4',      null,        null,        null,        null,        null,        null,        null   ],
          [null,   null,       null,       null,       null,       'T:r3',     'W:c1r3p1', 'W:c1r3p2', 'W:c1r3p3', null,       'W:c1r3p4', null,       'W:c1r3p5', null,       'W:c1r3p6',  'W:c1r3p7',  'W:c1r3p8',  'W:c1r3p9',  'T:r3',      null,        null,        null,        null,        null,        null,        null   ],
          [null,   null,       null,       null,       null,       'T:r2',     'W:c1r2p1', 'W:c1r2p2', null,       null,       null,       null,       null,       null,       'W:c1r2p3',  'W:c1r2p4',  'W:c1r2p5',  'W:c1r2p6',  'T:r2',      null,        null,        null,        null,        null,        null,        null   ],
          [null,   null,       null,       null,       null,       'T:r1',     'W:c1r1p1', 'W:c1r1p2', 'W:c1r1p3', 'W:c1r1p4', 'W:c1r1p5', 'W:c1r1p6', 'W:c1r1p7', 'W:c1r1p8', null,        'W:c1r1p9',  'W:c1r1p10', 'W:c1r1p11', 'T:r1',      null,        null,        null,        null,        null,        null,        null   ],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        totalWorkspaces: 76,
        // prettier-ignore
        map: [
          ['T:r6', 'W:c2r6p1', 'W:c2r6p2', 'W:c2r6p3', 'W:c2r6p4', 'W:c2r6p5', 'W:c2r6p6', 'W:c2r6p7', 'W:c2r6p8', 'W:c2r6p9', 'W:c2r6p10', 'W:c2r6p11', 'W:c2r6p12', 'W:c2r6p13', 'T:r6'],
          ['T:r5', 'W:c2r5p1', 'W:c2r5p2', 'W:c2r5p3', 'W:c2r5p4', 'W:c2r5p5', 'W:c2r5p6', 'W:c2r5p7', 'W:c2r5p8', 'W:c2r5p9', 'W:c2r5p10', 'W:c2r5p11', 'W:c2r5p12', 'W:c2r5p13', 'T:r5'],
          ['T:r4', 'W:c2r4p1', 'W:c2r4p2', 'W:c2r4p3', 'W:c2r4p4', 'W:c2r4p5', 'W:c2r4p6', 'W:c2r4p7', 'W:c2r4p8', null,       'W:c2r4p9',  'W:c2r4p10', 'W:c2r4p11', 'W:c2r4p12', 'T:r4'],
          ['T:r3', 'W:c2r3p1', 'W:c2r3p2', 'W:c2r3p3', 'W:c2r3p4', 'W:c2r3p5', 'W:c2r3p6', 'W:c2r3p7', 'W:c2r3p8', 'W:c2r3p9', 'W:c2r3p10', 'W:c2r3p11', 'W:c2r3p12', 'W:c2r3p13', 'T:r3'],
          ['T:r2', 'W:c2r2p1', 'W:c2r2p2', 'W:c2r2p3', 'W:c2r2p4', 'W:c2r2p5', 'W:c2r2p6', 'W:c2r2p7', 'W:c2r2p8', 'W:c2r2p9', 'W:c2r2p10', 'W:c2r2p11', 'W:c2r2p12', 'W:c2r2p13', 'T:r2'],
          ['T:r1', 'W:c2r1p1', 'W:c2r1p2', 'W:c2r1p3', 'W:c2r1p4', 'W:c2r1p5', 'W:c2r1p6', 'W:c2r1p7', 'W:c2r1p8', null,       'W:c2r1p9',  'W:c2r1p10', 'W:c2r1p11', 'W:c2r1p12', 'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        totalWorkspaces: 32,
        // prettier-ignore
        map: [
          [null, null,   'T:r5',     'W:c3r5p1', 'W:c3r5p2', 'W:c3r5p3', 'W:c3r5p4', 'W:c3r5p5', 'W:c3r5p6' ,'T:r5' , null, null],
          [null, null,   'T:r4',     'W:c3r4p1', 'W:c3r4p2', 'W:c3r4p3', 'W:c3r4p4', 'W:c3r4p5', 'W:c3r4p6' ,'T:r4' , null, null],
          [null, null,   'T:r3',     'W:c3r3p1', 'W:c3r3p2', 'W:c3r3p3', 'W:c3r3p4', 'W:c3r3p5', 'W:c3r3p6' ,'T:r3' , null, null],
          [null, 'T:r2', 'W:c3r2p1', 'W:c3r2p2', 'W:c3r2p3', 'W:c3r2p4', 'W:c3r2p5', 'W:c3r2p6', 'W:c3r2p7' ,'T:r2' , null, null],
          [null, 'T:r1', 'W:c3r1p1', 'W:c3r1p2', 'W:c3r1p3', 'W:c3r1p4', 'W:c3r1p5', 'W:c3r1p6', 'W:c3r1p7' ,'T:r1' , null, null],
        ],
      }),
    ];
  }
}
