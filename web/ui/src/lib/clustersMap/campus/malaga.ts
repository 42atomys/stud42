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
        map: [
          ['T:r15', 'W:c1r15s1', 'W:c1r15s2', 'W:c1r15s3', 'W:c1r15s4', 'W:c1r15s5', 'W:c1r15s6', 'T:r15'],
          ['T:r14', 'W:c1r14s1', 'W:c1r14s2', 'W:c1r14s3', 'W:c1r14s4', 'W:c1r14s5', 'W:c1r14s6', 'T:r14'],
          ['T:r13', 'W:c1r13s1', 'W:c1r13s2', 'W:c1r13s3', 'W:c1r13s4', 'W:c1r13s5', 'W:c1r13s6', 'T:r13'],
          ['T:r12', 'W:c1r12s1', 'W:c1r12s2', 'W:c1r12s3', 'W:c1r12s4', 'W:c1r12s5', 'W:c1r12s6', 'T:r12'],
          ['T:r11', 'W:c1r11s1', 'W:c1r11s2', 'W:c1r11s3', 'W:c1r11s4', 'W:c1r11s5', 'W:c1r11s6', 'T:r11'],
          ['T:r10', 'W:c1r10s1', 'W:c1r10s2', 'W:c1r10s3', 'W:c1r10s4', 'W:c1r10s5', 'W:c1r10s6', 'T:r10'],
          ['T:r9',  'W:c1r9s1',  'W:c1r9s2',  'W:c1r9s3',  'W:c1r9s4',  'W:c1r9s5',  'W:c1r9s6',  'T:r9' ],
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
          ['T:r10', 'W:c1r10s1', 'W:c1r10s2', 'W:c1r10s3', 'W:c1r10s4', 'W:c1r10s5', 'W:c1r10s6', 'T:r10'],
          ['T:r9',  'W:c1r9s1',  'W:c1r9s2',  'W:c1r9s3',  'W:c1r9s4',  'W:c1r9s5',  'W:c1r9s6',  'T:r9' ],
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
        identifier: 'c3',
        // prettier-ignore
        map: [
          ['T:r10', 'W:c3r10s6', 'W:c3r10s5', 'W:c3r10s4', 'W:c3r10s3', 'W:c3r10s2', 'W:c3r10s1', 'T:r10'],
          ['T:r9',  'W:c3r9s6',  'W:c3r9s5',  'W:c3r9s4',  'W:c3r9s3',  'W:c3r9s2',  'W:c3r9s1',  'T:r9' ],
          ['T:r8',  'W:c3r8s6',  'W:c3r8s5',  'W:c3r8s4',  'W:c3r8s3',  'W:c3r8s2',  'W:c3r8s1',  'T:r8' ],
          ['T:r7',  'W:c3r7s6',  'W:c3r7s5',  'W:c3r7s4',  'W:c3r7s3',  'W:c3r7s2',  'W:c3r7s1',  'T:r7' ],
          ['T:r6',  'W:c3r6s6',  'W:c3r6s5',  'W:c3r6s4',  'W:c3r6s3',  'W:c3r6s2',  'W:c3r6s1',  'T:r6' ],
          ['T:r5',  'W:c3r5s6',  'W:c3r5s5',  'W:c3r5s4',  'W:c3r5s3',  'W:c3r5s2',  'W:c3r5s1',  'T:r5' ],
          ['T:r4',  'W:c3r4s6',  'W:c3r4s5',  'W:c3r4s4',  'W:c3r4s3',  'W:c3r4s2',  'W:c3r4s1',  'T:r4' ],
          ['T:r3',  'W:c3r3s6',  'W:c3r3s5',  'W:c3r3s4',  'W:c3r3s3',  'W:c3r3s2',  'W:c3r3s1',  'T:r3' ],
          ['T:r2',  'W:c3r2s6',  'W:c3r2s5',  'W:c3r2s4',  'W:c3r2s3',  'W:c3r2s2',  'W:c3r2s1',  'T:r2' ],
          ['T:r1',  'W:c3r1s6',  'W:c3r1s5',  'W:c3r1s4',  'W:c3r1s3',  'W:c3r1s2',  'W:c3r1s1',  'T:r1' ],
        ],
      }),
    ];
  }
}
