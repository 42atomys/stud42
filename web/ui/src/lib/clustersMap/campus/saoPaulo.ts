import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { ICampus } from '../types';

//
export class SaoPaulo extends Campus implements ICampus {
  emoji = (): string => '🇧🇷';

  name = (): string => 'São Paulo';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        name: 'Nave-8A',
        // prettier-ignore
        map: [
          [ 'T:r10',  null, 'W:c1r10p1', 'W:c1r10p2', 'W:c1r10p3', 'W:c1r10p4', null, 'T:r10' ],
          [ 'T:r9',   null, 'W:c1r9p1',  'W:c1r9p2',  'W:c1r9p3',  'W:c1r9p4' , null, 'T:r9'  ],
          [ 'T:r8',   null, 'W:c1r8p1',  'W:c1r8p2',  'W:c1r8p3',  'W:c1r8p4' , null, 'T:r8'  ],
          [ 'T:r7',   null, 'W:c1r7p1',  'W:c1r7p2',  'W:c1r7p3',  'W:c1r7p4' , null, 'T:r7'  ],
          [ 'T:r6',   null, 'W:c1r6p1',  'W:c1r6p2',  'W:c1r6p3',  'W:c1r6p4' , null, 'T:r6'  ],
          [ 'T:r5',   null, 'W:c1r5p1',  'W:c1r5p2',  'W:c1r5p3',  'W:c1r5p4' , null, 'T:r5'  ],
          [ 'T:r4',   null, 'W:c1r4p1',  'W:c1r4p2',  'W:c1r4p3',  'W:c1r4p4' , null, 'T:r4'  ],
          [ 'T:r3',   null, 'W:c1r3p1',  'W:c1r3p2',  'W:c1r3p3',  'W:c1r3p4' , null, 'T:r3'  ],
          [ 'T:r2',   null, 'W:c1r2p1',  'W:c1r2p2',  'W:c1r2p3',  'W:c1r2p4' , null, 'T:r2'  ],
          [ 'T:r1',   null, 'W:c1r1p1',  'W:c1r1p2',  'W:c1r1p3',  'W:c1r1p4' , null, 'T:r1'  ],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        name: 'Nave-7A',
        // prettier-ignore
        map: [
          [ 'T:r12',  null, 'W:c2r12p1', 'W:c2r12p2', 'W:c2r12p3', 'W:c2r12p4', 'W:c2r12p5', 'W:c2r12p6', null, 'T:r12' ],
          [ 'T:r11',  null, 'W:c2r11p1', 'W:c2r11p2', 'W:c2r11p3', 'W:c2r11p4', 'W:c2r11p5', 'W:c2r11p6', null, 'T:r11' ],
          [ 'T:r10',  null, 'W:c2r10p1', 'W:c2r10p2', 'W:c2r10p3', 'W:c2r10p4', 'W:c2r10p5', 'W:c2r10p6', null, 'T:r10' ],
          [ 'T:r9',   null, 'W:c2r9p1',  'W:c2r9p2',  'W:c2r9p3',  'W:c2r9p4' , 'W:c2r9p5',  'W:c2r9p6',  null, 'T:r9'  ],
          [ 'T:r8',   null, 'W:c2r8p1',  'W:c2r8p2',  'W:c2r8p3',  'W:c2r8p4' , 'W:c2r8p5',  'W:c2r8p6',  null, 'T:r8'  ],
          [ 'T:r7',   null, 'W:c2r7p1',  'W:c2r7p2',  'W:c2r7p3',  'W:c2r7p4' , 'W:c2r7p5',  'W:c2r7p6',  null, 'T:r7'  ],
          [ 'T:r6',   null, 'W:c2r6p1',  'W:c2r6p2',  'W:c2r6p3',  'W:c2r6p4' , 'W:c2r6p5',  'W:c2r6p6',  null, 'T:r6'  ],
          [ 'T:r5',   null, 'W:c2r5p1',  'W:c2r5p2',  'W:c2r5p3',  'W:c2r5p4' , 'W:c2r5p5',  'W:c2r5p6',  null, 'T:r5'  ],
          [ 'T:r4',   null, 'W:c2r4p1',  'W:c2r4p2',  'W:c2r4p3',  'W:c2r4p4' , 'W:c2r4p5',  'W:c2r4p6',  null, 'T:r4'  ],
          [ 'T:r3',   null, 'W:c2r3p1',  'W:c2r3p2',  'W:c2r3p3',  'W:c2r3p4' , 'W:c2r3p5',  'W:c2r3p6',  null, 'T:r3'  ],
          [ 'T:r2',   null, 'W:c2r2p1',  'W:c2r2p2',  'W:c2r2p3',  'W:c2r2p4' , 'W:c2r2p5',  'W:c2r2p6',  null, 'T:r2'  ],
          [ 'T:r1',   null, 'W:c2r1p1',  'W:c2r1p2',  'W:c2r1p3',  'W:c2r1p4' , 'W:c2r1p5',  'W:c2r1p6',  null, 'T:r1'  ],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        name: 'Nave-7B',
        // prettier-ignore
        map: [
          [ null,  null,        null,       null,       null,       'T:r13',    'W:c3r13p1',  'W:c3r13p2',  'W:c3r13p3',  'W:c3r13p4',  'W:c3r13p5',  'T:r13' ],
          [ null,  null,        null,       null,       null,       'T:r12',    'W:c3r12p1',  'W:c3r12p2',  'W:c3r12p3',  'W:c3r12p4',  'W:c3r12p5',  'T:r12' ],
          [ null,  null,        null,       null,       null,       'T:r11',    'W:c3r11p1',  'W:c3r11p2',  'W:c3r11p3',  'W:c3r11p4',  'W:c3r11p5',  'T:r11' ],
          [ null,  null,        null,       null,       null,       'T:r10',    'W:c3r10p1',  'W:c3r10p2',  'W:c3r10p3',  'W:c3r10p4',  'W:c3r10p5',  'T:r10' ],
          ['T:r9', 'W:c3r9p1',  'W:c3r9p2', 'W:c3r9p3', 'W:c3r9p4', 'W:c3r9p5', 'T:r9',       null,         null,         null,         null,         null    ],
          ['T:r8', 'W:c3r8p1',  'W:c3r8p2', 'W:c3r8p3', 'W:c3r8p4', 'W:c3r8p5', 'T:r8',       null,         null,         null,         null,         null    ],
          ['T:r7', 'W:c3r7p1',  'W:c3r7p2', 'W:c3r7p3', 'W:c3r7p4', 'W:c3r7p5', 'T:r7',       null,         null,         null,         null,         null    ],
          ['T:r6', 'W:c3r6p1',  'W:c3r6p2', 'W:c3r6p3', 'W:c3r6p4', 'W:c3r6p5', 'T:r6',       null,         null,         null,         null,         null    ],
          [ null,  null,        null,       null,       null,       'T:r5',     'W:c3r5p1',   'W:c3r5p2',   'W:c3r5p3',   'W:c3r5p4',   'W:c3r5p5',   'T:r5'  ],
          [ null,  null,        null,       null,       null,       'T:r4',     'W:c3r4p1',   'W:c3r4p2',   'W:c3r4p3',   'W:c3r4p4',   'W:c3r4p5',   'T:r4'  ],
          [ null,  null,        null,       null,       null,       'T:r3',     'W:c3r3p1',   'W:c3r3p2',   'W:c3r3p3',   'W:c3r3p4',   'W:c3r3p5',   'T:r3'  ],
          [ null,  null,        null,       null,       null,       'T:r2',     'W:c3r2p1',   'W:c3r2p2',   'W:c3r2p3',   'W:c3r2p4',   'W:c3r2p5',   'T:r2'  ],
          [ null,  null,        null,       null,       null,       'T:r1',     'W:c3r1p1',   'W:c3r1p2',   'W:c3r1p3',   'W:c3r1p4',   'W:c3r1p5',   'T:r1'  ],
        ],
      }),
    ];
  }
}
