import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Lausanne extends Campus implements ICampus {
  emoji = (): string => '🇨🇭';

  name = (): CampusNames => 'lausanne';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>s(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        name: 'Gotham',
        totalWorkspaces: 110,
        // prettier-ignore
        map: [
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,     'T:r11',        null,     'T:r9',        null,     'T:r7',        null,     'T:r5',        null,     'T:r3',        null,     'T:r1'],
          ['T:r12', 'W:c1r12s1', 'W:c1r12s2', 'W:c1r12s3', 'W:c1r12s4', 'W:c1r12s5', 'W:c1r12s6', 'W:c1r12s7',        null,        null,        null, 'W:c1r11s1',        null, 'W:c1r9s1',        null, 'W:c1r7s1',        null, 'W:c1r5s1',        null, 'W:c1r3s1',        null, 'W:c1r1s1'],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c1r11s2',        null, 'W:c1r9s2',        null, 'W:c1r7s2',        null, 'W:c1r5s2',        null, 'W:c1r3s2',        null, 'W:c1r1s2'],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c1r11s3',        null, 'W:c1r9s3',        null, 'W:c1r7s3',        null, 'W:c1r5s3',        null, 'W:c1r3s3',        null, 'W:c1r1s3'],
          ['T:r13', 'W:c1r13s1', 'W:c1r13s2', 'W:c1r13s3', 'W:c1r13s4', 'W:c1r13s5', 'W:c1r13s6', 'W:c1r13s7',        null,        null,        null, 'W:c1r11s4',        null, 'W:c1r9s4',        null, 'W:c1r7s4',        null, 'W:c1r5s4',        null, 'W:c1r3s4',        null, 'W:c1r1s4'],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c1r11s5',        null, 'W:c1r9s5',        null, 'W:c1r7s5',        null, 'W:c1r5s5',        null, 'W:c1r3s5',        null, 'W:c1r1s5'],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c1r11s6',        null, 'W:c1r9s6',        null, 'W:c1r7s6',        null, 'W:c1r5s6',        null, 'W:c1r3s6',        null, 'W:c1r1s6'],
          ['T:r14', 'W:c1r14s1', 'W:c1r14s2', 'W:c1r14s3', 'W:c1r14s4', 'W:c1r14s5', 'W:c1r14s6', 'W:c1r14s7',        null,        null,        null, 'W:c1r11s7',        null, 'W:c1r9s7',        null, 'W:c1r7s7',        null, 'W:c1r5s7',        null, 'W:c1r3s7',        null, 'W:c1r1s7'],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c1r11s8',        null, 'W:c1r9s8',        null, 'W:c1r7s8',        null, 'W:c1r5s8',        null, 'W:c1r3s8',        null, 'W:c1r1s8'],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,       null,        null,       null,        null,       null,        null,       null,        null,       null],
          ['T:r15', 'W:c1r15s1', 'W:c1r15s2', 'W:c1r15s3', 'W:c1r15s4', 'W:c1r15s5', 'W:c1r15s6', 'W:c1r15s7',        null,        null,        null,        null,        null,       null,        null,       null,        null,       null,        null,       null,        null,       null],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,       null,        null,       null,        null,       null,        null,       null,        null,       null],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,       null,        null,       null,        null,       null,        null,       null,        null,       null],
          ['T:r16', 'W:c1r16s1', 'W:c1r16s2', 'W:c1r16s3', 'W:c1r16s4', 'W:c1r16s5', 'W:c1r16s6', 'W:c1r16s7',        null,        null,        null,        null,        null,       null,        null,       null,        null,       null,        null,       null,        null,       null],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c1r10s4',        null, 'W:c1r8s4',        null, 'W:c1r6s4',        null, 'W:c1r4s4',        null, 'W:c1r2s4',        null,       null],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c1r10s3',        null, 'W:c1r8s3',        null, 'W:c1r6s3',        null, 'W:c1r4s3',        null, 'W:c1r2s3',        null,       null],
          ['T:r17', 'W:c1r17s1', 'W:c1r17s2', 'W:c1r17s3', 'W:c1r17s4', 'W:c1r17s5', 'W:c1r17s6', 'W:c1r17s7',        null,        null,        null, 'W:c1r10s2',        null, 'W:c1r8s2',        null, 'W:c1r6s2',        null, 'W:c1r4s2',        null, 'W:c1r2s2',        null,       null],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c1r10s1',        null, 'W:c1r8s1',        null, 'W:c1r6s1',        null, 'W:c1r4s1',        null, 'W:c1r2s1',        null,       null],
          [   null,        null,        null,        null,        null,        null,        null,        null,        null,        null,        null,     'T:r10',        null,     'T:r8',        null,     'T:r6',        null,     'T:r4',        null,     'T:r2',        null,       null],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        name: 'Asgard',
        totalWorkspaces: 71,
        // prettier-ignore
        map: [
          [null,        null,        null,        null,        null,        null,        null,        null,        null,     'T:r4',     'T:r5',     'T:r6',     'T:r7',     'T:r8',     'T:r9' ],
          [null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c2r4s1', 'W:c2r5s1', 'W:c2r6s1', 'W:c2r7s1', 'W:c2r8s1', 'W:c2r9s1' ],
          [null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c2r4s2', 'W:c2r5s2', 'W:c2r6s2', 'W:c2r7s2', 'W:c2r8s2', 'W:c2r9s2' ],
          [null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c2r4s3', 'W:c2r5s3', 'W:c2r6s3', 'W:c2r7s3', 'W:c2r8s3', 'W:c2r9s3' ],
          [null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c2r4s4', 'W:c2r5s4', 'W:c2r6s4', 'W:c2r7s4', 'W:c2r8s4', 'W:c2r9s4' ],
          [null,        null,        null,        null,        null,        null,        null,        null,        null, 'W:c2r4s5', 'W:c2r5s5', 'W:c2r6s5', 'W:c2r7s5', 'W:c2r8s5', 'W:c2r9s5' ],
          ['T:r3','W:c2r3s1',  'W:c2r3s2',  'W:c2r3s3',  'W:c2r3s4',  'W:c2r3s5',  'W:c2r3s6',  'W:c2r3s7',        null,       null,       null,       null,       null,       null,       null ],
          ['T:r2','W:c2r2s1',  'W:c2r2s2',  'W:c2r2s3',  'W:c2r2s4',  'W:c2r2s5',  'W:c2r2s6',  'W:c2r2s7',        null,       null, 'W:c2r5s6',       null, 'W:c2r7s6', 'W:c2r8s6', 'W:c2r9s6' ],
          ['T:r1','W:c2r1s1',  'W:c2r1s2',  'W:c2r1s3',  'W:c2r1s4',  'W:c2r1s5',  'W:c2r1s6',  'W:c2r1s7',        null,       null, 'W:c2r5s7',       null, 'W:c2r7s7', 'W:c2r8s7', 'W:c2r9s7' ],
          [null,        null,        null,        null,        null,        null,        null,        null,        null,       null, 'W:c2r5s8',       null, 'W:c2r7s8', 'W:c2r8s8', 'W:c2r9s8' ],
          [null,        null,        null,        null,        null,        null,        null,        null,        null,       null, 'W:c2r5s9',       null, 'W:c2r7s9', 'W:c2r8s9', 'W:c2r9s9' ],
          [null,        null,        null,        null,        null,        null,        null,        null,        null,       null, 'W:c2r5s10',      null,'W:c2r7s10','W:c2r8s10', 'W:c2r9s10'],
          [null,        null,        null,        null,        null,        null,        null,        null,        null,       null,      'T:r5',      null,     'T:r7',     'T:r8',      'T:r9'],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        name: 'Salle sur demande',
        totalWorkspaces: 30,
        // prettier-ignore
        map: [
          [null, 'T:r6', 'W:c3r6s1', 'W:c3r6s2', 'W:c3r6s3', 'W:c3r6s4', 'W:c3r6s5', null, null, null, null,  null],
          [null, 'T:r5', 'W:c3r5s1', 'W:c3r5s2', 'W:c3r5s3', 'W:c3r5s4', 'W:c3r5s5', null, null, null, null,  null],
          [null, 'T:r4', 'W:c3r4s1', 'W:c3r4s2', 'W:c3r4s3', 'W:c3r4s4', 'W:c3r4s5', null, null, null, null,  null],
          [null, 'T:r3', 'W:c3r3s1', 'W:c3r3s2', 'W:c3r3s3', 'W:c3r3s4', 'W:c3r3s5', null, null, null, null,  null],
          [null, 'T:r2', 'W:c3r2s1', 'W:c3r2s2', 'W:c3r2s3', 'W:c3r2s4', 'W:c3r2s5', null, null, null, null,  null],
          [null, 'T:r1', 'W:c3r1s1', 'W:c3r1s2', 'W:c3r1s3', 'W:c3r1s4', 'W:c3r1s5', null, null, null, null,  null],
        ],
      }),
    ];
  }
}
