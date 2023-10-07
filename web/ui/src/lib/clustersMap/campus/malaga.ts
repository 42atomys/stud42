import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { ICampus } from '../types';

//
export class Malaga extends Campus implements ICampus {
  emoji = (): string => '🇪🇸';

  name = (): string => 'Malaga';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        // prettier-ignore
        map: [
          ['T:r15', 'W:c1r15p1', 'W:c1r15p2', 'W:c1r15p3', 'W:c1r15p4', 'W:c1r15p5', 'W:c1r15p6', 'T:r15'],
          ['T:r14', 'W:c1r14p1', 'W:c1r14p2', 'W:c1r14p3', 'W:c1r14p4', 'W:c1r14p5', 'W:c1r14p6', 'T:r14'],
          ['T:r13', 'W:c1r13p1', 'W:c1r13p2', 'W:c1r13p3', 'W:c1r13p4', 'W:c1r13p5', 'W:c1r13p6', 'T:r13'],
          ['T:r12', 'W:c1r12p1', 'W:c1r12p2', 'W:c1r12p3', 'W:c1r12p4', 'W:c1r12p5', 'W:c1r12p6', 'T:r12'],
          ['T:r11', 'W:c1r11p1', 'W:c1r11p2', 'W:c1r11p3', 'W:c1r11p4', 'W:c1r11p5', 'W:c1r11p6', 'T:r11'],
          ['T:r10', 'W:c1r10p1', 'W:c1r10p2', 'W:c1r10p3', 'W:c1r10p4', 'W:c1r10p5', 'W:c1r10p6', 'T:r10'],
          ['T:r9',  'W:c1r9p1',  'W:c1r9p2',  'W:c1r9p3',  'W:c1r9p4',  'W:c1r9p5',  'W:c1r9p6',  'T:r9' ],
          ['T:r8',  'W:c1r8p1',  'W:c1r8p2',  'W:c1r8p3',  'W:c1r8p4',  'W:c1r8p5',  'W:c1r8p6',  'T:r8' ],
          ['T:r7',  'W:c1r7p1',  'W:c1r7p2',  'W:c1r7p3',  'W:c1r7p4',  'W:c1r7p5',  'W:c1r7p6',  'T:r7' ],
          ['T:r6',  'W:c1r6p1',  'W:c1r6p2',  'W:c1r6p3',  'W:c1r6p4',  'W:c1r6p5',  'W:c1r6p6',  'T:r6' ],
          ['T:r5',  'W:c1r5p1',  'W:c1r5p2',  'W:c1r5p3',  'W:c1r5p4',  'W:c1r5p5',  'W:c1r5p6',  'T:r5' ],
          ['T:r4',  'W:c1r4p1',  'W:c1r4p2',  'W:c1r4p3',  'W:c1r4p4',  'W:c1r4p5',  'W:c1r4p6',  'T:r4' ],
          ['T:r3',  'W:c1r3p1',  'W:c1r3p2',  'W:c1r3p3',  'W:c1r3p4',  'W:c1r3p5',  'W:c1r3p6',  'T:r3' ],
          ['T:r2',  'W:c1r2p1',  'W:c1r2p2',  'W:c1r2p3',  'W:c1r2p4',  'W:c1r2p5',  'W:c1r2p6',  'T:r2' ],
          ['T:r1',  'W:c1r1p1',  'W:c1r1p2',  'W:c1r1p3',  'W:c1r1p4',  'W:c1r1p5',  'W:c1r1p6',  'T:r1' ],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        // prettier-ignore
        map: [
          ['T:r10', 'W:c2r10p1', 'W:c2r10p2', 'W:c2r10p3', 'W:c2r10p4', 'W:c2r10p5', 'W:c2r10p6', 'T:r10'],
          ['T:r9',  'W:c2r9p1',  'W:c2r9p2',  'W:c2r9p3',  'W:c2r9p4',  'W:c2r9p5',  'W:c2r9p6',  'T:r9' ],
          ['T:r8',  'W:c2r8p1',  'W:c2r8p2',  'W:c2r8p3',  'W:c2r8p4',  'W:c2r8p5',  'W:c2r8p6',  'T:r8' ],
          ['T:r7',  'W:c2r7p1',  'W:c2r7p2',  'W:c2r7p3',  'W:c2r7p4',  'W:c2r7p5',  'W:c2r7p6',  'T:r7' ],
          ['T:r6',  'W:c2r6p1',  'W:c2r6p2',  'W:c2r6p3',  'W:c2r6p4',  'W:c2r6p5',  'W:c2r6p6',  'T:r6' ],
          ['T:r5',  'W:c2r5p1',  'W:c2r5p2',  'W:c2r5p3',  'W:c2r5p4',  'W:c2r5p5',  'W:c2r5p6',  'T:r5' ],
          ['T:r4',  'W:c2r4p1',  'W:c2r4p2',  'W:c2r4p3',  'W:c2r4p4',  'W:c2r4p5',  'W:c2r4p6',  'T:r4' ],
          ['T:r3',  'W:c2r3p1',  'W:c2r3p2',  'W:c2r3p3',  'W:c2r3p4',  'W:c2r3p5',  'W:c2r3p6',  'T:r3' ],
          ['T:r2',  'W:c2r2p1',  'W:c2r2p2',  'W:c2r2p3',  'W:c2r2p4',  'W:c2r2p5',  'W:c2r2p6',  'T:r2' ],
          ['T:r1',  'W:c2r1p1',  'W:c2r1p2',  'W:c2r1p3',  'W:c2r1p4',  'W:c2r1p5',  'W:c2r1p6',  'T:r1' ],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        // prettier-ignore
        map: [
          ['T:r10', 'W:c2r10p6', 'W:c2r10p5', 'W:c2r10p4', 'W:c2r10p3', 'W:c2r10p2', 'W:c2r10p1', 'T:r10'],
          ['T:r9',  'W:c2r9p6',  'W:c2r9p5',  'W:c2r9p4',  'W:c2r9p3',  'W:c2r9p2',  'W:c2r9p1',  'T:r9' ],
          ['T:r8',  'W:c2r8p6',  'W:c2r8p5',  'W:c2r8p4',  'W:c2r8p3',  'W:c2r8p2',  'W:c2r8p1',  'T:r8' ],
          ['T:r7',  'W:c2r7p6',  'W:c2r7p5',  'W:c2r7p4',  'W:c2r7p3',  'W:c2r7p2',  'W:c2r7p1',  'T:r7' ],
          ['T:r6',  'W:c2r6p6',  'W:c2r6p5',  'W:c2r6p4',  'W:c2r6p3',  'W:c2r6p2',  'W:c2r6p1',  'T:r6' ],
          ['T:r5',  'W:c2r5p6',  'W:c2r5p5',  'W:c2r5p4',  'W:c2r5p3',  'W:c2r5p2',  'W:c2r5p1',  'T:r5' ],
          ['T:r4',  'W:c2r4p6',  'W:c2r4p5',  'W:c2r4p4',  'W:c2r4p3',  'W:c2r4p2',  'W:c2r4p1',  'T:r4' ],
          ['T:r3',  'W:c2r3p6',  'W:c2r3p5',  'W:c2r3p4',  'W:c2r3p3',  'W:c2r3p2',  'W:c2r3p1',  'T:r3' ],
          ['T:r2',  'W:c2r2p6',  'W:c2r2p5',  'W:c2r2p4',  'W:c2r2p3',  'W:c2r2p2',  'W:c2r2p1',  'T:r2' ],
          ['T:r1',  'W:c2r1p6',  'W:c2r1p5',  'W:c2r1p4',  'W:c2r1p3',  'W:c2r1p2',  'W:c2r1p1',  'T:r1' ],
        ],
      }),
    ];
  }
}
