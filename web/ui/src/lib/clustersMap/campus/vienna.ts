import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Vienna extends Campus implements ICampus {
  emoji = (): string => '🇦🇹';

  name = (): CampusNames => 'vienna';

  extractor = (identifier: string) => {
    const regex =
      /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

    const result = regex.exec(identifier);
    if (!result || !result.groups) {
      throw new Error(
        `Invalid identifier: ${identifier}. Expected format: c1r2p3`
      );
    }

    return result.groups as ReturnType<ICampus['extractor']>;
  };

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        totalWorkspaces: 20,
        // prettier-ignore
        map: [
          [null, null, 'T:r1', 'W:c1r1p1', 'W:c1r1p2', 'W:c1r1p3', 'W:c1r1p4', 'W:c1r1p5', 'W:c1r1p6', null, null, null, null, 'W:c1r1p7', 'W:c1r1p8', 'W:c1r1p9', 'W:c1r1p10', 'T:r1', null, null],
          [null, null, 'T:r2', 'W:c1r2p1', 'W:c1r2p2', 'W:c1r2p3', 'W:c1r2p4', 'W:c1r2p5', 'W:c1r2p6', null, null, null, null, 'W:c1r2p7', 'W:c1r2p8', 'W:c1r2p9', 'W:c1r2p10', 'T:r2', null, null],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        totalWorkspaces: 64,
        // prettier-ignore
        map: [
          [null, 'T:r7',      null, 'T:r6',     null, null,   null,       null,       null,       null,       null,       null,       null,       null,       null,       null,         null, null,         null,         null,         null,         null  ],
          [null, 'W:c2r7p1',  null, 'W:c2r6p1', null, 'T:r5', 'W:c2r5p1', 'W:c2r5p2', 'W:c2r5p3', 'W:c2r5p4', 'W:c2r5p5', 'W:c2r5p6', 'W:c2r5p7', 'W:c2r5p8', 'W:c2r5p9', 'W:c2r5p10',  null, 'W:c2r5p11',  'W:c2r5p12',  'W:c2r5p13',  'W:c2r5p15',  'T:r5'],
          [null, 'W:c2r7p2',  null, 'W:c2r6p2', null, null,   null,       null,       null,       'T:r4',     'W:c2r4p1', 'W:c2r4p2', 'W:c2r4p3', 'W:c2r4p4', 'W:c2r4p5', 'W:c2r4p6',   null, 'W:c2r4p7',   'W:c2r4p8',   'W:c2r4p9',   'W:c2r4p10',  'T:r4'],
          [null, 'W:c2r7p3',  null, 'W:c2r6p3', null, null,   null,       null,       null,       'T:r3',     'W:c2r3p1', 'W:c2r3p2', 'W:c2r3p3', 'W:c2r3p4', 'W:c2r3p5', 'W:c2r3p6',   null, 'W:c2r3p7',   'W:c2r3p8',   'W:c2r3p9',   'W:c2r3p10',  'T:r3'],
          [null, 'W:c2r7p4',  null, 'W:c2r6p4', null, null,   null,       null,       null,       'T:r2',     'W:c2r2p1', 'W:c2r2p2', 'W:c2r2p3', 'W:c2r2p4', 'W:c2r2p5', 'W:c2r2p6',   null, 'W:c2r2p7',   'W:c2r2p8',   'W:c2r2p9',   null,         'T:r2'],
          [null, 'W:c2r7p5',  null, 'W:c2r6p5', null, null,   null,       null,       null,       'T:r1',     'W:c2r1p1', 'W:c2r1p2', 'W:c2r1p3', 'W:c2r1p4', 'W:c2r1p5', 'W:c2r1p6',   null, 'W:c2r1p7',   'W:c2r1p8',   'W:c2r1p9',   null,         'T:r1'],
          [null, 'W:c2r7p6',  null, 'W:c2r6p6', null, null,   null,       null,       null,       null,       null,       null,       null,       null,       null,       null,         null, null,         null,         null,         null,         null  ],
          [null, 'T:r7',      null, 'T:r6',     null, null,   null,       null,       null,       null,       null,       null,       null,       null,       null,       null,         null, null,         null,         null,         null,         null  ],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        totalWorkspaces: 64,
        // prettier-ignore
        map: [
        ],
      }),
    ];
  }
}
