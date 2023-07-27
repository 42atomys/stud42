import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Mulhouse extends Campus implements ICampus {
  emoji = (): string => '🇫🇷';

  name = (): CampusNames => 'mulhouse';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>k(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'k0',
        totalWorkspaces: 56,
        // prettier-ignore
        map: [
          ['T:r4', 'W:k0r4p1', 'W:k0r4p2', 'W:k0r4p3', 'W:k0r4p4', 'W:k0r4p5', 'W:k0r4p6', 'W:k0r4p7', 'W:k0r4p8', 'W:k0r4p9', 'W:k0r4p10', 'W:k0r4p11', 'W:k0r4p12', null, null, 'W:k0r4p13', 'W:k0r4p14', 'T:r4'],
          ['T:r3', 'W:k0r3p1', 'W:k0r3p2', 'W:k0r3p3', 'W:k0r3p4', 'W:k0r3p5', 'W:k0r3p6', 'W:k0r3p7', 'W:k0r3p8', 'W:k0r3p9', 'W:k0r3p10', 'W:k0r3p11', 'W:k0r3p12', null, null, 'W:k0r3p13', 'W:k0r3p14', 'T:r3'],
          [null,   null,       null,       null,       null,       null,       null,       null,       null,       null,       null,        null,        null,        null, null, null,       null,         null  ],
          [null,   null,       null,       null,       null,       null,       null,       null,       null,       null,       null,        null,        null,        null, null, null,       null,         null  ],
          ['T:r2', 'W:k0r2p1', 'W:k0r2p2', 'W:k0r2p3', 'W:k0r2p4', 'W:k0r2p5', 'W:k0r2p6', 'W:k0r2p7', 'W:k0r2p8', 'W:k0r2p9', 'W:k0r2p10', 'W:k0r2p11', 'W:k0r2p12', null, null, 'W:k0r2p13', 'W:k0r2p14', 'T:r2'],
          ['T:r1', 'W:k0r1p1', 'W:k0r1p2', 'W:k0r1p3', 'W:k0r1p4', 'W:k0r1p5', 'W:k0r1p6', 'W:k0r1p7', 'W:k0r1p8', 'W:k0r1p9', 'W:k0r1p10', 'W:k0r1p11', 'W:k0r1p12', null, null, 'W:k0r1p13', 'W:k0r1p14', 'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'k1',
        totalWorkspaces: 64,
        // prettier-ignore
        map: [
          ['T:r4', 'W:k1r4p1', 'W:k1r4p2', 'W:k1r4p3', 'W:k1r4p4', 'W:k1r4p5', 'W:k1r4p6', 'W:k1r4p7', 'W:k1r4p8', null, null, 'W:k1r4p9', 'W:k1r4p10', 'W:k1r4p11', 'W:k1r4p12', 'W:k1r4p13', 'W:k1r4p14', 'W:k1r4p15', 'W:k1r4p16', 'T:r4'],
          ['T:r3', 'W:k1r3p1', 'W:k1r3p2', 'W:k1r3p3', 'W:k1r3p4', 'W:k1r3p5', 'W:k1r3p6', 'W:k1r3p7', 'W:k1r3p8', null, null, 'W:k1r3p9', 'W:k1r3p10', 'W:k1r3p11', 'W:k1r3p12', 'W:k1r3p13', 'W:k1r3p14', 'W:k1r3p15', 'W:k1r3p16', 'T:r3'],
          [null,   null,       null,       null,       null,       null,       null,       null,       null,       null, null, null,       null,        null,        null,        null,       null,         null,       null,         null  ],
          [null,   null,       null,       null,       null,       null,       null,       null,       null,       null, null, null,       null,        null,        null,        null,       null,         null,       null,         null  ],
          ['T:r2', 'W:k1r2p1', 'W:k1r2p2', 'W:k1r2p3', 'W:k1r2p4', 'W:k1r2p5', 'W:k1r2p6', 'W:k1r2p7', 'W:k1r2p8', null, null, 'W:k1r2p9', 'W:k1r2p10', 'W:k1r2p11', 'W:k1r2p12', 'W:k1r2p13', 'W:k1r2p14', 'W:k1r2p15', 'W:k1r2p16', 'T:r2'],
          ['T:r1', 'W:k1r1p1', 'W:k1r1p2', 'W:k1r1p3', 'W:k1r1p4', 'W:k1r1p5', 'W:k1r1p6', 'W:k1r1p7', 'W:k1r1p8', null, null, 'W:k1r1p9', 'W:k1r1p10', 'W:k1r1p11', 'W:k1r1p12', 'W:k1r1p13', 'W:k1r1p14', 'W:k1r1p15', 'W:k1r1p16', 'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'k2',
        totalWorkspaces: 40,
        // prettier-ignore
        map: [
          ['T:r4', 'W:k2r4p1', 'W:k2r4p2', null, null, 'W:k2r4p3', 'W:k2r4p4', 'W:k2r4p5', 'W:k2r4p6', 'W:k2r4p7', 'W:k2r4p8', 'W:k2r4p9', 'W:k2r4p10', 'T:r4'],
          ['T:r3', 'W:k2r3p1', 'W:k2r3p2', null, null, 'W:k2r3p3', 'W:k2r3p4', 'W:k2r3p5', 'W:k2r3p6', 'W:k2r3p7', 'W:k2r3p8', 'W:k2r3p9', 'W:k2r3p10', 'T:r3'],
          [null,   null,       null,       null, null, null,       null,       null,       null,       null,       null,       null,       null,        null  ],
          [null,   null,       null,       null, null, null,       null,       null,       null,       null,       null,       null,       null,        null  ],
          ['T:r2', 'W:k2r2p1', 'W:k2r2p2', null, null, 'W:k2r2p3', 'W:k2r2p4', 'W:k2r2p5', 'W:k2r2p6', 'W:k2r2p7', 'W:k2r2p8', 'W:k2r2p9', 'W:k2r2p10', 'T:r2'],
          ['T:r1', 'W:k2r1p1', 'W:k2r1p2', null, null, 'W:k2r1p3', 'W:k2r1p4', 'W:k2r1p5', 'W:k2r1p6', 'W:k2r1p7', 'W:k2r1p8', 'W:k2r1p9', 'W:k2r1p10', 'T:r1'],
        ],
      }),
    ];
  }
}
