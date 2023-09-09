import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Seoul extends Campus implements ICampus {
  emoji = (): string => '🇰🇷';

  name = (): CampusNames => 'seoul';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>cx?(?<cluster>[\d]+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>s(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        // prettier-ignore
        map: [
          ['T:r1', 'W:c1r1s7', 'W:c1r1s6', 'W:c1r1s5', 'W:c1r1s4', 'W:c1r1s3', 'W:c1r1s2', 'W:c1r1s1', 'T:r1'],
          ['T:r2', 'W:c1r2s7', 'W:c1r2s6', 'W:c1r2s5', 'W:c1r2s4', 'W:c1r2s3', 'W:c1r2s2', 'W:c1r2s1', 'T:r2'],
          ['T:r3', 'W:c1r3s7', 'W:c1r3s6', 'W:c1r3s5', 'W:c1r3s4', 'W:c1r3s3', 'W:c1r3s2', 'W:c1r3s1', 'T:r3'],
          ['T:r4', 'W:c1r4s7', 'W:c1r4s6', 'W:c1r4s5', 'W:c1r4s4', 'W:c1r4s3', 'W:c1r4s2', 'W:c1r4s1', 'T:r4'],
          ['T:r5', 'W:c1r5s7', 'W:c1r5s6', 'W:c1r5s5', 'W:c1r5s4', 'W:c1r5s3', 'W:c1r5s2', 'W:c1r5s1', 'T:r5'],
          ['T:r6', 'W:c1r6s7', 'W:c1r6s6', 'W:c1r6s5', 'W:c1r6s4', 'W:c1r6s3', 'W:c1r6s2', 'W:c1r6s1', 'T:r6'],
          ['T:r7', 'W:c1r7s7', 'W:c1r7s6', 'W:c1r7s5', 'W:c1r7s4', 'W:c1r7s3', 'W:c1r7s2', 'W:c1r7s1', 'T:r7'],
          ['T:r8', 'W:c1r8s7', 'W:c1r8s6', 'W:c1r8s5', 'W:c1r8s4', 'W:c1r8s3', 'W:c1r8s2', 'W:c1r8s1', 'T:r8'],
          ['T:r9', 'W:c1r9s7', 'W:c1r9s6', 'W:c1r9s5', 'W:c1r9s4', 'W:c1r9s3', 'W:c1r9s2', 'W:c1r9s1', 'T:r9'],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        // prettier-ignore
        map: [
          ['T:r10', 'W:c2r10s8', 'W:c2r10s7', 'W:c2r10s6', 'W:c2r10s5', 'W:c2r10s4', 'W:c2r10s3', 'W:c2r10s2', 'W:c2r10s1', 'T:r10'],
          ['T:r9',  'W:c2r9s8',  'W:c2r9s7',  'W:c2r9s6',  'W:c2r9s5',  'W:c2r9s4',  'W:c2r9s3',  'W:c2r9s2',  'W:c2r9s1',  'T:r9' ],
          ['T:r8',  'W:c2r8s8',  'W:c2r8s7',  'W:c2r8s6',  'W:c2r8s5',  'W:c2r8s4',  'W:c2r8s3',  'W:c2r8s2',  'W:c2r8s1',  'T:r8' ],
          ['T:r7',  'W:c2r7s8',  'W:c2r7s7',  'W:c2r7s6',  'W:c2r7s5',  'W:c2r7s4',  'W:c2r7s3',  'W:c2r7s2',  'W:c2r7s1',  'T:r7' ],
          ['T:r6',  'W:c2r6s8',  'W:c2r6s7',  'W:c2r6s6',  'W:c2r6s5',  'W:c2r6s4',  'W:c2r6s3',  'W:c2r6s2',  'W:c2r6s1',  'T:r6' ],
          ['T:r5',  'W:c2r5s8',  'W:c2r5s7',  'W:c2r5s6',  'W:c2r5s5',  'W:c2r5s4',  'W:c2r5s3',  'W:c2r5s2',  'W:c2r5s1',  'T:r5' ],
          ['T:r4',  'W:c2r4s8',  'W:c2r4s7',  'W:c2r4s6',  'W:c2r4s5',  'W:c2r4s4',  'W:c2r4s3',  'W:c2r4s2',  'W:c2r4s1',  'T:r4' ],
          ['T:r3',  'W:c2r3s8',  'W:c2r3s7',  'W:c2r3s6',  'W:c2r3s5',  'W:c2r3s4',  'W:c2r3s3',  'W:c2r3s2',  'W:c2r3s1',  'T:r3' ],
          ['T:r2',  'W:c2r2s8',  'W:c2r2s7',  'W:c2r2s6',  'W:c2r2s5',  'W:c2r2s4',  'W:c2r2s3',  'W:c2r2s2',  'W:c2r2s1',  'T:r2' ],
          ['T:r1',  'W:c2r1s8',  'W:c2r1s7',  'W:c2r1s6',  'W:c2r1s5',  'W:c2r1s4',  'W:c2r1s3',  'W:c2r1s2',  'W:c2r1s1',  'T:r1' ],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        // prettier-ignore
        map: [
          ['T:r1', 'W:c3r1s7', 'W:c3r1s6', 'W:c3r1s5', 'W:c3r1s4', 'W:c3r1s3', 'W:c3r1s2', 'W:c3r1s1', 'T:r1'],
          ['T:r2', 'W:c3r2s7', 'W:c3r2s6', 'W:c3r2s5', 'W:c3r2s4', 'W:c3r2s3', 'W:c3r2s2', 'W:c3r2s1', 'T:r2'],
          ['T:r3', 'W:c3r3s7', 'W:c3r3s6', 'W:c3r3s5', 'W:c3r3s4', 'W:c3r3s3', 'W:c3r3s2', 'W:c3r3s1', 'T:r3'],
          ['T:r4', 'W:c3r4s7', 'W:c3r4s6', 'W:c3r4s5', 'W:c3r4s4', 'W:c3r4s3', 'W:c3r4s2', 'W:c3r4s1', 'T:r4'],
          ['T:r5', 'W:c3r5s7', 'W:c3r5s6', 'W:c3r5s5', 'W:c3r5s4', 'W:c3r5s3', 'W:c3r5s2', 'W:c3r5s1', 'T:r5'],
          ['T:r6', 'W:c3r6s7', 'W:c3r6s6', 'W:c3r6s5', 'W:c3r6s4', 'W:c3r6s3', 'W:c3r6s2', 'W:c3r6s1', 'T:r6'],
          ['T:r7', 'W:c3r7s7', 'W:c3r7s6', 'W:c3r7s5', 'W:c3r7s4', 'W:c3r7s3', 'W:c3r7s2', 'W:c3r7s1', 'T:r7'],
          ['T:r8', 'W:c3r8s7', 'W:c3r8s6', 'W:c3r8s5', 'W:c3r8s4', 'W:c3r8s3', 'W:c3r8s2', 'W:c3r8s1', 'T:r8'],
          ['T:r9', 'W:c3r9s7', 'W:c3r9s6', 'W:c3r9s5', 'W:c3r9s4', 'W:c3r9s3', 'W:c3r9s2', 'W:c3r9s1', 'T:r9'],
        ],
      }),
      new Cluster({
        identifier: 'c4',
        // prettier-ignore
        map: [
          ['T:r10', 'W:c4r10s8', 'W:c4r10s7', 'W:c4r10s6', 'W:c4r10s5', 'W:c4r10s4', 'W:c4r10s3', 'W:c4r10s2', 'W:c4r10s1', 'T:r10'],
          ['T:r9',  'W:c4r9s8',  'W:c4r9s7',  'W:c4r9s6',  'W:c4r9s5',  'W:c4r9s4',  'W:c4r9s3',  'W:c4r9s2',  'W:c4r9s1',  'T:r9' ],
          ['T:r8',  'W:c4r8s8',  'W:c4r8s7',  'W:c4r8s6',  'W:c4r8s5',  'W:c4r8s4',  'W:c4r8s3',  'W:c4r8s2',  'W:c4r8s1',  'T:r8' ],
          ['T:r7',  'W:c4r7s8',  'W:c4r7s7',  'W:c4r7s6',  'W:c4r7s5',  'W:c4r7s4',  'W:c4r7s3',  'W:c4r7s2',  'W:c4r7s1',  'T:r7' ],
          ['T:r6',  'W:c4r6s8',  'W:c4r6s7',  'W:c4r6s6',  'W:c4r6s5',  'W:c4r6s4',  'W:c4r6s3',  'W:c4r6s2',  'W:c4r6s1',  'T:r6' ],
          ['T:r5',  'W:c4r5s8',  'W:c4r5s7',  'W:c4r5s6',  'W:c4r5s5',  'W:c4r5s4',  'W:c4r5s3',  'W:c4r5s2',  'W:c4r5s1',  'T:r5' ],
          ['T:r4',  'W:c4r4s8',  'W:c4r4s7',  'W:c4r4s6',  'W:c4r4s5',  'W:c4r4s4',  'W:c4r4s3',  'W:c4r4s2',  'W:c4r4s1',  'T:r4' ],
          ['T:r3',  'W:c4r3s8',  'W:c4r3s7',  'W:c4r3s6',  'W:c4r3s5',  'W:c4r3s4',  'W:c4r3s3',  'W:c4r3s2',  'W:c4r3s1',  'T:r3' ],
          ['T:r2',  'W:c4r2s8',  'W:c4r2s7',  'W:c4r2s6',  'W:c4r2s5',  'W:c4r2s4',  'W:c4r2s3',  'W:c4r2s2',  'W:c4r2s1',  'T:r2' ],
          ['T:r1',  'W:c4r1s8',  'W:c4r1s7',  'W:c4r1s6',  'W:c4r1s5',  'W:c4r1s4',  'W:c4r1s3',  'W:c4r1s2',  'W:c4r1s1',  'T:r1' ],
        ],
      }),
      new Cluster({
        identifier: 'c5',
        // prettier-ignore
        map: [
          ['T:r1', 'W:c5r1s7', 'W:c5r1s6', 'W:c5r1s5', 'W:c5r1s4', 'W:c5r1s3', 'W:c5r1s2', 'W:c5r1s1', 'T:r1'],
          ['T:r2', 'W:c5r2s7', 'W:c5r2s6', 'W:c5r2s5', 'W:c5r2s4', 'W:c5r2s3', 'W:c5r2s2', 'W:c5r2s1', 'T:r2'],
          ['T:r3', 'W:c5r3s7', 'W:c5r3s6', 'W:c5r3s5', 'W:c5r3s4', 'W:c5r3s3', 'W:c5r3s2', 'W:c5r3s1', 'T:r3'],
          ['T:r4', 'W:c5r4s7', 'W:c5r4s6', 'W:c5r4s5', 'W:c5r4s4', 'W:c5r4s3', 'W:c5r4s2', 'W:c5r4s1', 'T:r4'],
          ['T:r5', 'W:c5r5s7', 'W:c5r5s6', 'W:c5r5s5', 'W:c5r5s4', 'W:c5r5s3', 'W:c5r5s2', 'W:c5r5s1', 'T:r5'],
          ['T:r6', 'W:c5r6s7', 'W:c5r6s6', 'W:c5r6s5', 'W:c5r6s4', 'W:c5r6s3', 'W:c5r6s2', 'W:c5r6s1', 'T:r6'],
          ['T:r7', 'W:c5r7s7', 'W:c5r7s6', 'W:c5r7s5', 'W:c5r7s4', 'W:c5r7s3', 'W:c5r7s2', 'W:c5r7s1', 'T:r7'],
          ['T:r8', 'W:c5r8s7', 'W:c5r8s6', 'W:c5r8s5', 'W:c5r8s4', 'W:c5r8s3', 'W:c5r8s2', 'W:c5r8s1', 'T:r8'],
          ['T:r9', 'W:c5r9s7', 'W:c5r9s6', 'W:c5r9s5', 'W:c5r9s4', 'W:c5r9s3', 'W:c5r9s2', 'W:c5r9s1', 'T:r9'],
        ],
      }),
      new Cluster({
        identifier: 'c6',
        // prettier-ignore
        map: [
          ['T:r10', 'W:c6r10s8', 'W:c6r10s7', 'W:c6r10s6', 'W:c6r10s5', 'W:c6r10s4', 'W:c6r10s3', 'W:c6r10s2', 'W:c6r10s1', 'T:r10'],
          ['T:r9' , 'W:c6r9s8',  'W:c6r9s7',  'W:c6r9s6',  'W:c6r9s5',  'W:c6r9s4',  'W:c6r9s3',  'W:c6r9s2',  'W:c6r9s1',  'T:r9' ],
          ['T:r8' , 'W:c6r8s8',  'W:c6r8s7',  'W:c6r8s6',  'W:c6r8s5',  'W:c6r8s4',  'W:c6r8s3',  'W:c6r8s2',  'W:c6r8s1',  'T:r8' ],
          ['T:r7' , 'W:c6r7s8',  'W:c6r7s7',  'W:c6r7s6',  'W:c6r7s5',  'W:c6r7s4',  'W:c6r7s3',  'W:c6r7s2',  'W:c6r7s1',  'T:r7' ],
          ['T:r6' , 'W:c6r6s8',  'W:c6r6s7',  'W:c6r6s6',  'W:c6r6s5',  'W:c6r6s4',  'W:c6r6s3',  'W:c6r6s2',  'W:c6r6s1',  'T:r6' ],
          ['T:r5' , 'W:c6r5s8',  'W:c6r5s7',  'W:c6r5s6',  'W:c6r5s5',  'W:c6r5s4',  'W:c6r5s3',  'W:c6r5s2',  'W:c6r5s1',  'T:r5' ],
          ['T:r4' , 'W:c6r4s8',  'W:c6r4s7',  'W:c6r4s6',  'W:c6r4s5',  'W:c6r4s4',  'W:c6r4s3',  'W:c6r4s2',  'W:c6r4s1',  'T:r4' ],
          ['T:r3' , 'W:c6r3s8',  'W:c6r3s7',  'W:c6r3s6',  'W:c6r3s5',  'W:c6r3s4',  'W:c6r3s3',  'W:c6r3s2',  'W:c6r3s1',  'T:r3' ],
          ['T:r2' , 'W:c6r2s8',  'W:c6r2s7',  'W:c6r2s6',  'W:c6r2s5',  'W:c6r2s4',  'W:c6r2s3',  'W:c6r2s2',  'W:c6r2s1',  'T:r2' ],
          ['T:r1' , 'W:c6r1s8',  'W:c6r1s7',  'W:c6r1s6',  'W:c6r1s5',  'W:c6r1s4',  'W:c6r1s3',  'W:c6r1s2',  'W:c6r1s1',  'T:r1' ],
        ],
      }),
      new Cluster({
        identifier: 'c7',
        // prettier-ignore
        map: [
          [null,   null,        null,       null,       null,       null,       null,       null,       null,       null,       null,       null,   null, null, null,   null,       'T:r9',     'W:c7r5s1', 'W:c7r5s2', 'W:c7r5s3', 'W:c7r5s4', 'W:c7r5s5', 'W:c7r5s6', 'T:r9'],
          ['T:r4', 'W:c7r4s8',  'W:c7r4s7', 'W:c7r4s6', 'W:c7r4s5', 'W:c7r4s4', 'W:c7r4s3', 'W:c7r4s2', 'W:c7r4s1', 'T:r4',     null,       null,   null, null, null,   null,       'T:r8',     'W:c7r5s1', 'W:c7r5s2', 'W:c7r5s3', 'W:c7r5s4', 'W:c7r5s5', 'W:c7r5s6', 'T:r8'],
          ['T:r3', 'W:c7r3s10', 'W:c7r3s9', 'W:c7r3s8', 'W:c7r3s7', 'W:c7r3s6', 'W:c7r3s5', 'W:c7r3s4', 'W:c7r3s3', 'W:c7r3s2', 'W:c7r3s1', 'T:r3', null, null, 'T:r7', 'W:c7r5s1', 'W:c7r5s2', 'W:c7r5s3', 'W:c7r5s4', 'W:c7r5s5', 'W:c7r5s6', 'W:c7r5s7', 'W:c7r5s8', 'T:r7'],
          ['T:r2', 'W:c7r2s10', 'W:c7r2s9', 'W:c7r2s8', 'W:c7r2s7', 'W:c7r2s6', 'W:c7r2s5', 'W:c7r2s4', 'W:c7r2s3', 'W:c7r2s2', 'W:c7r2s1', 'T:r2', null, null, 'T:r6', 'W:c7r5s1', 'W:c7r5s2', 'W:c7r5s3', 'W:c7r5s4', 'W:c7r5s5', 'W:c7r5s6', 'W:c7r5s7', 'W:c7r5s8', 'T:r6'],
          ['T:r1', 'W:c7r1s10', 'W:c7r1s9', 'W:c7r1s8', 'W:c7r1s7', 'W:c7r1s6', 'W:c7r1s5', 'W:c7r1s4', 'W:c7r1s3', 'W:c7r1s2', 'W:c7r1s1', 'T:r1', null, null, 'T:r5', 'W:c7r5s1', 'W:c7r5s2', 'W:c7r5s3', 'W:c7r5s4', 'W:c7r5s5', 'W:c7r5s6', 'W:c7r5s7', 'W:c7r5s8', 'T:r5'],
        ],
      }),
      new Cluster({
        identifier: 'c8',
        // prettier-ignore
        map: [
          ['T:r8',      'T:r7',      'T:r6'     , 'T:r5',      'T:r4',      'T:r3',      'T:r2',      'T:r1'     ],
          ['W:c8r8s1',  'W:c8r7s1',  'W:c8r6s1',  'W:c8r5s1',  'W:c8r4s1',  'W:c8r3s1',  'W:c8r2s1',  'W:c8r1s1' ],
          ['W:c8r8s2',  'W:c8r7s2',  'W:c8r6s2',  'W:c8r5s2',  'W:c8r4s2',  'W:c8r3s2',  'W:c8r2s2',  'W:c8r1s2' ],
          ['W:c8r8s3',  'W:c8r7s3',  'W:c8r6s3',  'W:c8r5s3',  'W:c8r4s3',  'W:c8r3s3',  'W:c8r2s3',  'W:c8r1s3' ],
          ['W:c8r8s4',  'W:c8r7s4',  'W:c8r6s4',  'W:c8r5s4',  'W:c8r4s4',  'W:c8r3s4',  'W:c8r2s4',  'W:c8r1s4' ],
          ['W:c8r8s5',  'W:c8r7s5',  'W:c8r6s5',  'W:c8r5s5',  'W:c8r4s5',  'W:c8r3s5',  'W:c8r2s5',  'W:c8r1s5' ],
          ['W:c8r8s6',  'W:c8r7s6',  'W:c8r6s6',  'W:c8r5s6',  'W:c8r4s6',  'W:c8r3s6',  'W:c8r2s6',  'W:c8r1s6' ],
          ['W:c8r8s7',  'W:c8r7s7',  'W:c8r6s7',  'W:c8r5s7',  'W:c8r4s7',  'W:c8r3s7',  'W:c8r2s7',  'W:c8r1s7' ],
          ['W:c8r8s8',  'W:c8r7s8',  'W:c8r6s8',  'W:c8r5s8',  'W:c8r4s8',  'W:c8r3s8',  'W:c8r2s8',  'W:c8r1s8' ],
          [null,        'W:c8r7s9',  'W:c8r6s9',  'W:c8r5s9',  'W:c8r4s9',  'W:c8r3s9',  'W:c8r2s9',  'W:c8r1s9' ],
          [null,        'W:c8r7s10', 'W:c8r6s10', 'W:c8r5s10', 'W:c8r4s10', 'W:c8r3s10', 'W:c8r2s10', 'W:c8r1s10'],
          ['W:c8r8s9' , 'W:c8r7s11', 'W:c8r6s11', 'W:c8r5s11', 'W:c8r4s11', 'W:c8r3s11', 'W:c8r2s11', 'W:c8r1s11'],
          ['W:c8r8s10', 'W:c8r7s12', 'W:c8r6s12', 'W:c8r5s12', 'W:c8r4s12', 'W:c8r3s12', 'W:c8r2s12', 'W:c8r1s12'],
          ['W:c8r8s11', 'W:c8r7s13', 'W:c8r6s13', 'W:c8r5s13', 'W:c8r4s13', 'W:c8r3s13', 'W:c8r2s13', 'W:c8r1s13'],
          ['W:c8r8s12', 'W:c8r7s14', 'W:c8r6s14', 'W:c8r5s14', 'W:c8r4s14', 'W:c8r3s14', 'W:c8r2s14', 'W:c8r1s14'],
          ['T:r8',      'T:r7',      'T:r6',      'T:r5',      'T:r4',      'T:r3',      'T:r2',      'T:r1'     ],
        ],
      }),
      new Cluster({
        identifier: 'c9',
        // prettier-ignore
        map: [
          ['T:r5', 'W:c9r5s8',  'W:c9r5s7',  'W:c9r5s6',  'W:c9r5s5', 'W:c9r5s4', 'W:c9r5s3', 'W:c9r5s2', 'W:c9r5s1', 'T:r5',     null,       null,       null,       null  ],
          ['T:r4', 'W:c9r4s12', 'W:c9r4s11', 'W:c9r4s10', 'W:c9r4s9', 'W:c9r4s8', 'W:c9r4s7', 'W:c9r4s6', 'W:c9r4s5', 'W:c9r4s4', 'W:c9r4s3', 'W:c9r4s2', 'W:c9r4s1', 'T:r4'],
          ['T:r3', 'W:c9r3s12', 'W:c9r3s11', 'W:c9r3s10', 'W:c9r3s9', 'W:c9r3s8', 'W:c9r3s7', 'W:c9r3s6', 'W:c9r3s5', 'W:c9r3s4', 'W:c9r3s3', 'W:c9r3s2', 'W:c9r3s1', 'T:r3'],
          ['T:r2', 'W:c9r2s12', 'W:c9r2s11', 'W:c9r2s10', 'W:c9r2s9', 'W:c9r2s8', 'W:c9r2s7', 'W:c9r2s6', 'W:c9r2s5', 'W:c9r2s4', 'W:c9r2s3', 'W:c9r2s2', 'W:c9r2s1', 'T:r2'],
          [null,   null,        null,        null,        'T:r1',     'W:c9r1s8', 'W:c9r1s7', 'W:c9r1s6', 'W:c9r1s5', 'W:c9r1s4', 'W:c9r1s3', 'W:c9r1s2', 'W:c9r1s1', 'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'c10',
        // prettier-ignore
        map: [
          ['T:r8',       'T:r7',       'T:r6',       'T:r5',       'T:r4',       'T:r3',       'T:r2',       'T:r1'      ],
          ['W:c10r8s1',  'W:c10r7s1',  'W:c10r6s1',  'W:c10r5s1',  'W:c10r4s1',  'W:c10r3s1',  'W:c10r2s1',  'W:c10r1s1' ],
          ['W:c10r8s2',  'W:c10r7s2',  'W:c10r6s2',  'W:c10r5s2',  'W:c10r4s2',  'W:c10r3s2',  'W:c10r2s2',  'W:c10r1s2' ],
          ['W:c10r8s3',  'W:c10r7s3',  'W:c10r6s3',  'W:c10r5s3',  'W:c10r4s3',  'W:c10r3s3',  'W:c10r2s3',  'W:c10r1s3' ],
          ['W:c10r8s4',  'W:c10r7s4',  'W:c10r6s4',  'W:c10r5s4',  'W:c10r4s4',  'W:c10r3s4',  'W:c10r2s4',  'W:c10r1s4' ],
          ['W:c10r8s5',  'W:c10r7s5',  'W:c10r6s5',  'W:c10r5s5',  'W:c10r4s5',  'W:c10r3s5',  'W:c10r2s5',  'W:c10r1s5' ],
          ['W:c10r8s6',  'W:c10r7s6',  'W:c10r6s6',  'W:c10r5s6',  'W:c10r4s6',  'W:c10r3s6',  'W:c10r2s6',  'W:c10r1s6' ],
          ['W:c10r8s7',  'W:c10r7s7',  'W:c10r6s7',  'W:c10r5s7',  'W:c10r4s7',  'W:c10r3s7',  'W:c10r2s7',  'W:c10r1s7' ],
          ['W:c10r8s8',  'W:c10r7s8',  'W:c10r6s8',  'W:c10r5s8',  'W:c10r4s8',  'W:c10r3s8',  'W:c10r2s8',  'W:c10r1s8' ],
          [null,         'W:c10r7s9',  'W:c10r6s9',  'W:c10r5s9',  'W:c10r4s9',  'W:c10r3s9',  'W:c10r2s9',  'W:c10r1s9' ],
          [null,         'W:c10r7s10', 'W:c10r6s10', 'W:c10r5s10', 'W:c10r4s10', 'W:c10r3s10', 'W:c10r2s10', 'W:c10r1s10'],
          ['W:c10r8s9',  'W:c10r7s11', 'W:c10r6s11', 'W:c10r5s11', 'W:c10r4s11', 'W:c10r3s11', 'W:c10r2s11', 'W:c10r1s11'],
          ['W:c10r8s10', 'W:c10r7s12', 'W:c10r6s12', 'W:c10r5s12', 'W:c10r4s12', 'W:c10r3s12', 'W:c10r2s12', 'W:c10r1s12'],
          ['W:c10r8s11', 'W:c10r7s13', 'W:c10r6s13', 'W:c10r5s13', 'W:c10r4s13', 'W:c10r3s13', 'W:c10r2s13', 'W:c10r1s13'],
          ['W:c10r8s12', 'W:c10r7s14', 'W:c10r6s14', 'W:c10r5s14', 'W:c10r4s14', 'W:c10r3s14', 'W:c10r2s14', 'W:c10r1s14'],
          ['T:r8',       'T:r7',       'T:r6',       'T:r5',       'T:r4',       'T:r3',       'T:r2',       'T:r1'      ],
        ],
      }),
      new Cluster({
        identifier: 'cx1',
        // prettier-ignore
        map: [
          [null,   'T:r3',      'T:r3',      null,   null, null, null,   null,        null,        null,        null,        null  ],
          ['T:r3', 'W:cx1r3s4', null,        'T:r3', null, null, null,   null,        null,        null,        null,        null  ],
          ['T:r3',  null,       'W:cx1r3s3', 'T:r3', null, null, null,   null,        null,        null,        null,        null  ],
          ['T:r3',  null,       'W:cx1r3s2', 'T:r3', null, null, null,   null,        null,        null,        null,        null  ],
          ['T:r3', 'W:cx1r3s1', null,        'T:r3', null, null, null,   null,        null,        null,        null,        null  ],
          [null,   'T:r3',      'T:r3',      null,   null, null, null,   null,        null,        null,        null,        null  ],
          [null,   'T:r2',      'T:r2',      null,   null, null, null,   'T:r5',      'T:r5',      'T:r5',      'T:r5',      null  ],
          ['T:r2', 'W:cx1r2s4', null,        'T:r2', null, null, 'T:r5', null,        'W:cx1r5s6', 'W:cx1r5s7', null,        'T:r5'],
          ['T:r2', null,        'W:cx1r2s3', 'T:r2', null, null, 'T:r5', 'W:cx1r5s5', null,        null,        'W:cx1r5s8', 'T:r5'],
          ['T:r2', null,        'W:cx1r2s2', 'T:r2', null, null, 'T:r5', 'W:cx1r5s1', null,        null,        'W:cx1r5s4', 'T:r5'],
          ['T:r2', 'W:cx1r2s1', null,        'T:r2', null, null, 'T:r5', null,        'W:cx1r5s2', 'W:cx1r5s3', null,        'T:r5'],
          [null,   'T:r2',      'T:r2',      null,   null, null, null,   'T:r5',      'T:r5',      'T:r5',      'T:r5',      null  ],
          [null,   'T:r1',      'T:r1',      null,   null, null, null,   'T:r4',      'T:r4',      'T:r4',      'T:r4',      null  ],
          ['T:r1', 'W:cx1r1s4', null,        'T:r1', null, null, 'T:r4', null,        'W:cx1r4s6', 'W:cx1r4s7', null,        'T:r4'],
          ['T:r1', null,        'W:cx1r1s3', 'T:r1', null, null, 'T:r4', 'W:cx1r4s5', null,        null,        'W:cx1r4s8', 'T:r4'],
          ['T:r1', null,        'W:cx1r1s2', 'T:r1', null, null, 'T:r4', 'W:cx1r4s1', null,        null,        'W:cx1r4s4', 'T:r4'],
          ['T:r1', 'W:cx1r1s1', null,        'T:r1', null, null, 'T:r4', null,        'W:cx1r4s2', 'W:cx1r4s3', null,        'T:r4'],
          [null,   'T:r1',      'T:r1',      null,   null, null, null,   'T:r4',      'T:r4',      'T:r4',      'T:r4',      null  ]
        ],
      }),
      new Cluster({
        identifier: 'cx2',
        // prettier-ignore
        map: [
          ['T:r8', null,         null,        null,        null,        'W:cx2r8s3', 'W:cx2r8s2', null,        null,        null,        null,        'T:r8'],
          [null,   null,         null,        null,        'W:cx2r8s4', null,        null,        'W:cx2r8s1', null,        null,        null,        null  ],
          ['T:r7', null,         'W:cx2r7s9', 'W:cx2r7s8', 'W:cx2r7s7', 'W:cx2r7s6', 'W:cx2r7s5', 'W:cx2r7s4', 'W:cx2r7s3', 'W:cx2r7s2', null,        'T:r7'],
          [null,   'W:cx2r7s10', null,        null,        null,        null,        null,        null,        null,        null,        'W:cx2r7s1', null  ],
          ['T:r6', null,         null,        'W:cx2r6s7', 'W:cx2r6s6', 'W:cx2r6s5', 'W:cx2r6s4', 'W:cx2r6s3', 'W:cx2r6s2', null,        null,        'T:r6'],
          [null  , null,         'W:cx2r6s8', null,        null,        null,        null,        null,        null,        'W:cx2r6s1', null,        null  ],
          ['T:r5', null,         null,        null,        'W:cx2r5s5', 'W:cx2r5s4', 'W:cx2r5s3', 'W:cx2r5s2', null,        null,        null,        'T:r5'],
          [null,   null,         null,        'W:cx2r5s6', null,        null,        null,        null,        'W:cx2r5s1', null,        null,        null  ],
          [null,   null,         null,        null,        null,        null,        null,        null,        null,        null,        null,        null  ],
          ['T:r4', null,         null,        'W:cx2r4s6', null,        null,        null,        null,        'W:cx2r4s1', null,        null,        'T:r4'],
          [null,   null,         null,        null,        'W:cx2r4s5', 'W:cx2r4s4', 'W:cx2r4s3', 'W:cx2r4s2', null,        null,        null,        null  ],
          ['T:r3', null,         'W:cx2r3s8', null,        null,        null,         null,       null,        null,        'W:cx2r3s1', null,        'T:r3'],
          [null,   null,         null,        'W:cx2r3s7', 'W:cx2r3s6', 'W:cx2r3s5', 'W:cx2r3s4', 'W:cx2r3s3', 'W:cx2r3s2', null,        null,        null  ],
          ['T:r2', 'W:cx2r2s10', null,        null,        null,        null,        null,        null,        null,        null,        'W:cx2r2s1', 'T:r2'],
          [null,   null,         'W:cx2r2s9', 'W:cx2r2s8', 'W:cx2r2s7', 'W:cx2r2s6', 'W:cx2r2s5', 'W:cx2r2s4', 'W:cx2r2s3', 'W:cx2r2s2', null,        null  ],
          ['T:r1', null,         null,        null,        'W:cx2r1s4', null,        null,        'W:cx2r1s1', null,        null,        null,        'T:r1'],
          [null,   null,         null,        null,        null,        'W:cx2r1s3', 'W:cx2r1s2', null,        null,        null,        null,        null  ],
        ],
      }),
    ];
  }
}
