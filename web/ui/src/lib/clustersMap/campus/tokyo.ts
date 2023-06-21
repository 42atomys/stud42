import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Tokyo extends Campus implements ICampus {
  emoji = (): string => '🇯🇵';

  name = (): CampusNames => 'tokyo';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>s(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        totalWorkspaces: 218,
        // prettier-ignore
        map: [
          ['T:r5',  'W:c1r5s1',  'W:c1r5s2',  'W:c1r5s3',  'W:c1r5s4',  'W:c1r5s5',  'W:c1r5s6',  'W:c1r5s7',  'W:c1r5s8',  'W:c1r5s9',  'T:r5',      null,         null,         null   ],
          ['T:r6',  'W:c1r6s1',  'W:c1r6s2',  'W:c1r6s3',  'W:c1r6s4',  'W:c1r6s5',  'W:c1r6s6',  'W:c1r6s7',  'W:c1r6s8',  'W:c1r6s9',  'T:r6',      null,         null,         null   ],
          ['T:r7',  'W:c1r7s1',  'W:c1r7s2',  'W:c1r7s3',  'W:c1r7s4',  'W:c1r7s5',  'W:c1r7s6',  'W:c1r7s7',  'W:c1r7s8',  'W:c1r7s9',  'T:r7',      null,         null,         null   ],
          ['T:r8',  'W:c1r8s1',  'W:c1r8s2',  'W:c1r8s3',  'W:c1r8s4',  'W:c1r8s5',  'W:c1r8s6',  'W:c1r8s7',  'W:c1r8s8',  'W:c1r8s9',  'T:r8',      null,         null,         null   ],
          ['T:r9',  'W:c1r9s1',  'W:c1r9s2',  'W:c1r9s3',  'W:c1r9s4',  'W:c1r9s5',  'W:c1r9s6',  'W:c1r9s7',  'W:c1r9s8',  'W:c1r9s9',  'T:r9',      null,         null,         null   ],
          ['T:r10', 'W:c1r10s1', 'W:c1r10s2', 'W:c1r10s3', 'W:c1r10s4', 'W:c1r10s5', 'W:c1r10s6', 'W:c1r10s7', 'W:c1r10s8', 'W:c1r10s9', 'T:r10',     null,         null,         null   ],
          ['T:r11', 'W:c1r11s1', 'W:c1r11s2', 'W:c1r11s3', 'W:c1r11s4', 'W:c1r11s5', 'W:c1r11s6', 'W:c1r11s7', 'W:c1r11s8', 'W:c1r11s9', 'T:r11',     null,         null,         null   ],
          ['T:r12', 'W:c1r12s1', 'W:c1r12s2', 'W:c1r12s3', 'W:c1r12s4', 'W:c1r12s5', 'W:c1r12s6', 'W:c1r12s7', 'W:c1r12s8', 'W:c1r12s9', 'T:r12',     null,         null,         null   ],
          ['T:r13', 'W:c1r13s1', 'W:c1r13s2', 'W:c1r13s3', 'W:c1r13s4', 'W:c1r13s5', 'W:c1r13s6', 'W:c1r13s7', 'W:c1r13s8', 'W:c1r13s9', 'T:r13',     null,         null,         null   ],
          ['T:r14', 'W:c1r14s1', 'W:c1r14s2', 'W:c1r14s3', 'W:c1r14s4', 'W:c1r14s5', 'W:c1r14s6', 'W:c1r14s7', 'W:c1r14s8', 'W:c1r14s9', 'T:r14',     null,         null,         null   ],
          ['T:r15', 'W:c1r15s1', 'W:c1r15s2', 'W:c1r15s3', 'W:c1r15s4', 'W:c1r15s5', 'W:c1r15s6', 'W:c1r15s7', 'W:c1r15s8', 'W:c1r15s9', 'T:r15',     null,         null,         null   ],
          ['T:r16', 'W:c1r16s1', 'W:c1r16s2', 'W:c1r16s3', 'W:c1r16s4', 'W:c1r16s5', 'W:c1r16s6', 'W:c1r16s7', 'W:c1r16s8', 'W:c1r16s9', 'T:r16',     null,         null,         null   ],
          [null,    'T:r18',     'W:c1r18s1', 'W:c1r18s2', 'W:c1r18s3', 'W:c1r18s4', 'W:c1r18s5', 'W:c1r18s6', 'W:c1r18s7', 'W:c1r18s8', 'W:c1r18s9', 'W:c1r18s10', 'W:c1r18s11', 'T:r18'],
          [null,    'T:r19',     'W:c1r19s1', 'W:c1r19s2', 'W:c1r19s3', 'W:c1r19s4', 'W:c1r19s5', 'W:c1r19s6', 'W:c1r19s7', 'W:c1r19s8', 'W:c1r19s9', 'W:c1r19s10', 'W:c1r19s11', 'T:r19'],
          [null,    'T:r20',     'W:c1r20s1', 'W:c1r20s2', 'W:c1r20s3', 'W:c1r20s4', 'W:c1r20s5', 'W:c1r20s6', 'W:c1r20s7', 'W:c1r20s8', 'W:c1r20s9', 'W:c1r20s10', 'W:c1r20s11', 'T:r20'],
          [null,    'T:r21',     'W:c1r21s1', 'W:c1r21s2', 'W:c1r21s3', 'W:c1r21s4', 'W:c1r21s5', 'W:c1r21s6', 'W:c1r21s7', 'W:c1r21s8', 'W:c1r21s9', 'W:c1r21s10', 'W:c1r21s11', 'T:r21'],
          [null,    'T:r22',     'W:c1r22s1', 'W:c1r22s2', 'W:c1r22s3', 'W:c1r22s4', 'W:c1r22s5', 'W:c1r22s6', 'W:c1r22s7', 'W:c1r22s8', 'W:c1r22s9', 'W:c1r22s10', 'W:c1r22s11', 'T:r22'],
          [null,    'T:r23',     'W:c1r23s1', 'W:c1r23s2', 'W:c1r23s3', 'W:c1r23s4', 'W:c1r23s5', 'W:c1r23s6', 'W:c1r23s7', 'W:c1r23s8', 'W:c1r23s9', 'W:c1r23s10', 'W:c1r23s11', 'T:r23'],
          [null,    'T:r24',     'W:c1r24s1', 'W:c1r24s2', 'W:c1r24s3', 'W:c1r24s4', 'W:c1r24s5', 'W:c1r24s6', 'W:c1r24s7', 'W:c1r24s8', 'W:c1r24s9', 'W:c1r24s10', 'W:c1r24s11', 'T:r24'],
          [null,    'T:r25',     'W:c1r25s1', 'W:c1r25s2', 'W:c1r25s3', 'W:c1r25s4', 'W:c1r25s5', 'W:c1r25s6', 'W:c1r25s7', 'W:c1r25s8', 'W:c1r25s9', 'W:c1r25s10', 'W:c1r25s11', 'T:r25'],
          [null,    'T:r26',     'W:c1r26s1', 'W:c1r26s2', 'W:c1r26s3', 'W:c1r26s4', 'W:c1r26s5', 'W:c1r26s6', 'W:c1r26s7', 'W:c1r26s8', 'W:c1r26s9', 'W:c1r26s10', 'W:c1r26s11', 'T:r26'],
          [null,    'T:r27',     'W:c1r27s1', 'W:c1r27s2', 'W:c1r27s3', 'W:c1r27s4', 'W:c1r27s5', 'W:c1r27s6', 'W:c1r27s7', 'W:c1r27s8', 'W:c1r27s9', 'W:c1r27s10', 'W:c1r27s11', 'T:r27'],
        ],
      }),
    ];
  }
}
