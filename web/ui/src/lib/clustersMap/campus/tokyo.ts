import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { ICampus } from '../types';

//
export class Tokyo extends Campus implements ICampus {
  emoji = (): string => '🇯🇵';

  name = (): string => 'Tokyo';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>s(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        name: 'KOI',
        // prettier-ignore
        map: [
          [null,   null,       null,       null,       null,       null,       null,       null,       null,       null,   'P',  'PW',       'PW',       'W:c1r8s4', 'W:c1r8s3', 'W:c1r8s2', 'W:c1r8s1', 'T:r8'],
          [null,   null,       null,       null,       null,       null,       null,       null,       null,       null,   'P',  'PW',       'PW',       'W:c1r9s4', 'W:c1r9s3', 'W:c1r9s2', 'W:c1r9s1', 'T:r9'],
          ['T:r1', 'W:c1r1s8', 'W:c1r1s7', 'W:c1r1s6', 'W:c1r1s5', 'W:c1r1s4', 'W:c1r1s3', 'W:c1r1s2', 'W:c1r1s1', 'T:r1', 'P',  'W:c1r8s5', 'W:c1r9s5', 'P',        'P',        'P',        'P',        'P'   ],
          ['T:r2', 'W:c1r2s8', 'W:c1r2s7', 'W:c1r2s6', 'W:c1r2s5', 'W:c1r2s4', 'W:c1r2s3', 'W:c1r2s2', 'W:c1r2s1', 'T:r2', 'P',  'W:c1r8s6', 'W:c1r9s6', 'P',        null,       null,       null,       'P'   ],
          ['T:r3', 'W:c1r3s8', 'W:c1r3s7', 'W:c1r3s6', 'W:c1r3s5', 'W:c1r3s4', 'W:c1r3s3', 'W:c1r3s2', 'W:c1r3s1', 'T:r3', 'P',  'W:c1r8s7', 'P',        'P',        null,       null,       null,       'P'   ],
          ['T:r4', 'W:c1r4s8', 'W:c1r4s7', 'W:c1r4s6', 'W:c1r4s5', 'W:c1r4s4', 'W:c1r4s3', 'W:c1r4s2', 'W:c1r4s1', 'T:r4', 'P',  'W:c1r8s8', 'W:c1r9s7', 'P',        null,       null,       null,       'P'   ],
          ['T:r5', 'W:c1r5s8', 'W:c1r5s7', 'W:c1r5s6', 'W:c1r5s5', 'W:c1r5s4', 'W:c1r5s3', 'W:c1r5s2', 'W:c1r5s1', 'T:r5', 'P',  'W:c1r8s9', 'W:c1r9s8', 'P',        'P',        'P',        'P',        'P'   ],
          ['T:r6', 'W:c1r6s8', 'W:c1r6s7', 'W:c1r6s6', 'W:c1r6s5', 'W:c1r6s4', 'W:c1r6s3', 'W:c1r6s2', 'W:c1r6s1', 'T:r6', null, 'T:r8',     'T:r9',     null,       null,       null,       null,       null  ],
          ['T:r7', 'W:c1r7s8', 'W:c1r7s7', 'W:c1r7s6', 'W:c1r7s5', 'W:c1r7s4', 'W:c1r7s3', 'W:c1r7s2', 'W:c1r7s1', 'T:r7', 'P',  'PW',       'P',        null,       null,       null,       null,       null  ],
        ],
      }),

      new Cluster({
        identifier: 'c2',
        name: 'UME',
        // prettier-ignore
        map: [
          ['T:r4',     null,   null,   null,        null,       null,       null,       null,       null,       null,       null,       null,       null,       null  ],
          ['W:c2r4s1', null,   null,   null,        null,       null,       null,       null,       null,       null,       null,       null,       null,       null  ],
          ['W:c2r4s2', null,   'T:r1', 'W:c2r1s6',  'W:c2r1s5', 'W:c2r1s4', 'W:c2r1s3', 'W:c2r1s2', 'W:c2r1s1', null,       null,       null,       null,       'T:r1'],
          ['W:c2r4s3', null,   'T:r2', 'W:c2r2s10', 'W:c2r2s9', 'W:c2r2s8', 'W:c2r2s7', 'W:c2r2s6', 'W:c2r2s5', 'W:c2r2s4', 'W:c2r2s3', 'W:c2r2s2', 'W:c2r2s1', 'T:r2'],
          ['W:c2r4s4', null,   'T:r3', 'W:c2r3s10', 'W:c2r3s9', 'W:c2r3s8', 'W:c2r3s7', 'W:c2r3s6', 'W:c2r3s5', 'W:c2r3s4', 'W:c2r3s3', 'W:c2r3s2', 'W:c2r3s1', 'T:r3'],
          ['T:r4',     null,   null,   null,        null,       null,       null,       null,       null,       null,       null,       null,       null,       null  ],
          ['P',        null,   'P',    'P',         'P',        'P',        'P',        'P',        'P',        'P',        'P',        'P',        'P',        null  ],
          ['T:r9',     null,   null,   null,        null,       null,       null,       null,       null,       null,       null,       null,       null,       null  ],
          ['W:c2r9s1', null,   'T:r5', 'W:c2r5s10', 'W:c2r5s9', 'W:c2r5s8', 'W:c2r5s7', 'W:c2r5s6', 'W:c2r5s5', 'W:c2r5s4', 'W:c2r5s3', 'W:c2r5s2', 'W:c2r5s1', 'T:r5'],
          ['W:c2r9s2', null,   'T:r6', 'W:c2r6s10', 'W:c2r6s9', 'W:c2r6s8', 'W:c2r6s7', 'W:c2r6s6', 'W:c2r6s5', 'W:c2r6s4', 'W:c2r6s3', 'W:c2r6s2', 'W:c2r6s1', 'T:r6'],
          ['W:c2r9s3', null,   'T:r7', 'W:c2r7s10', 'W:c2r7s9', 'W:c2r7s8', 'W:c2r7s7', 'W:c2r7s6', 'W:c2r7s5', 'W:c2r7s4', 'W:c2r7s3', 'W:c2r7s2', 'W:c2r7s1', 'T:r7'],
          ['W:c2r9s4', null,   'T:r8', 'W:c2r8s10', 'W:c2r8s9', 'W:c2r8s8', 'W:c2r8s7', 'W:c2r8s6', 'W:c2r8s5', 'W:c2r8s4', 'W:c2r8s3', 'W:c2r8s2', 'W:c2r8s1', 'T:r8'],
          ['T:r9',     null,   null,   null,        null,       null,       null,       null,       null,       null,       null,       null,       null,       null  ],
        ],
      }),

      new Cluster({
        identifier: 'c3',
        name: 'WASHI',
        // prettier-ignore
        map: [
          ['T:r1', 'W:c3r1s6', 'W:c3r1s5', 'W:c3r1s4', 'W:c3r1s3', 'W:c3r1s2', 'W:c3r1s1', null,       null,       'T:r1'],
          ['T:r2', 'W:c3r2s8', 'W:c3r2s7', 'W:c3r2s6', 'W:c3r2s5', 'W:c3r2s4', 'W:c3r2s3', 'W:c3r2s2', 'W:c3r2s1', 'T:r2'],
          ['T:r3', 'W:c3r3s8', 'W:c3r3s7', 'W:c3r3s6', 'W:c3r3s5', 'W:c3r3s4', 'W:c3r3s3', 'W:c3r3s2', 'W:c3r3s1', 'T:r3'],
          ['T:r4', 'W:c3r4s8', 'W:c3r4s7', 'W:c3r4s6', 'W:c3r4s5', 'W:c3r4s4', 'W:c3r4s3', 'W:c3r4s2', 'W:c3r4s1', 'T:r4'],
          ['T:r5', 'W:c3r5s8', 'W:c3r5s7', 'W:c3r5s6', 'W:c3r5s5', 'W:c3r5s4', 'W:c3r5s3', 'W:c3r5s2', 'W:c3r5s1', 'T:r5'],
          ['T:r6', 'W:c3r6s8', 'W:c3r6s7', 'W:c3r6s6', 'W:c3r6s5', 'W:c3r6s4', 'W:c3r6s3', 'W:c3r6s2', 'W:c3r6s1', 'T:r6'],
        ],
      }),

      new Cluster({
        identifier: 'c4',
        name: 'FUJI',
        // prettier-ignore
        map: [
          ['T:r3',      'T:r2',      'T:r1',      'P',     'PW', 'PW', 'PW'],
          ['W:c4r3s1',  'W:c4r2s1',  'W:c4r1s1',  'P',     'PW', null, null],
          ['W:c4r3s2',  'W:c4r2s2',  'W:c4r1s2',  'P',     'PW', null, null],
          ['W:c4r3s3',  'W:c4r2s3',  'W:c4r1s3',  'P',     'PW', null, null],
          ['W:c4r3s4',  'W:c4r2s4',  'W:c4r1s4',  'P',     'PW', 'PW', 'PW'],
          ['W:c4r3s5',  'W:c4r2s5',  'W:c4r1s5',  'P',     null, null, null],
          ['W:c4r3s6',  'W:c4r2s6',  'W:c4r1s6',  'P',     null, null, null],
          ['W:c4r3s7',  'W:c4r2s7',  'W:c4r1s7',  'P',     'PW', 'PW', 'PW'],
          ['W:c4r3s8',  'W:c4r2s8',  'W:c4r1s8',  'P',     'PW', null, 'PW'],
          ['W:c4r3s9',  'W:c4r2s9',  null,        'P',     'PW', null, 'PW'],
          ['W:c4r3s10', 'W:c4r2s10', null,        'P',     'PW', 'PW', 'PW'],
          ['W:c4r3s11', 'W:c4r2s11', null,        'P',     'PW', null, 'PW'],
          ['W:c4r3s12', 'W:c4r2s12', null,        'P',     'PW', null, 'PW'],
          [null,         null,       null,        'T:NEKO',null, null, null],
          ['W:c4r3s13', 'W:c4r2s13', null,        'P',     null, null, null],
          ['W:c4r3s14', 'W:c4r2s14', null,        'P',     'PW', 'PW', 'PW'],
          ['W:c4r3s15', 'W:c4r2s15', 'W:c4r1s9',  'P',     null, 'PW', null],
          ['W:c4r3s16', 'W:c4r2s16', 'W:c4r1s10', 'P',     null, 'PW', null],
          ['W:c4r3s17', 'W:c4r2s17', 'W:c4r1s11', 'P',     null, 'PW', null],
          ['W:c4r3s18', 'W:c4r2s18', 'W:c4r1s12', 'P',     null, 'PW', null],
        ],
      }),

      new Cluster({
        identifier: 'c5',
        name: 'SAKURA',
        // prettier-ignore
        map: [
          ['T:r4',      'T:r3',      'T:r2',      'T:r1'     ],
          [null,        'W:c5r3s1',  'W:c5r2s1',  null       ],
          [null,        'W:c5r3s2',  'W:c5r2s2',  null       ],
          [null,        'W:c5r3s3',  'W:c5r2s3',  null       ],
          ['W:c5r4s1',  'W:c5r3s4',  'W:c5r2s4',  'W:c5r1s1' ],
          ['W:c5r4s2',  'W:c5r3s5',  'W:c5r2s5',  'W:c5r1s2' ],
          ['W:c5r4s3',  'W:c5r3s6',  'W:c5r2s6',  'W:c5r1s3' ],
          ['W:c5r4s4',  'W:c5r3s7',  'W:c5r2s7',  'W:c5r1s4' ],
          ['W:c5r4s5',  'W:c5r3s8',  'W:c5r2s8',  null       ],
          ['W:c5r4s6',  null,        null,        null       ],
          ['W:c5r4s7',  'W:c5r3s9',  'W:c5r2s9',  null       ],
          ['W:c5r4s8',  'W:c5r3s10', 'W:c5r2s10', 'W:c5r1s5' ],
          ['W:c5r4s9',  'W:c5r3s11', 'W:c5r2s11', 'W:c5r1s6' ],
          [null,        'W:c5r3s12', 'W:c5r2s12', 'W:c5r1s7' ],
          [null,        'W:c5r3s13', 'W:c5r2s13', 'W:c5r1s8' ],
          [null,        'W:c5r3s14', 'W:c5r2s14', null       ],
        ],
      }),

      new Cluster({
        identifier: 'c6',
        name: 'TSURU',
        // prettier-ignore
        map: [
          ['T:r4',      'T:r3',      'T:r2',      'T:r1'     ],
          [null,        'W:c6r3s1',  'W:c6r2s1',  'W:c6r1s1' ],
          [null,        'W:c6r3s2',  'W:c6r2s2',  'W:c6r1s2' ],
          [null,        'W:c6r3s3',  'W:c6r2s3',  'W:c6r1s3' ],
          ['W:c6r4s1',  'W:c6r3s4',  'W:c6r2s4',  'W:c6r1s4' ],
          ['W:c6r4s2',  'W:c6r3s5',  'W:c6r2s5',  'W:c6r1s5' ],
          ['W:c6r4s3',  'W:c6r3s6',  'W:c6r2s6',  'W:c6r1s6' ],
          ['W:c6r4s4',  'W:c6r3s7',  'W:c6r2s7',  'W:c6r1s7' ],
          [null,        'W:c6r3s8',  'W:c6r2s8',  'W:c6r1s8' ],
          [null,        null,        null,        null       ],
          [null,        'W:c6r3s9',  'W:c6r2s9',  'W:c6r1s9' ],
          ['W:c6r4s5',  'W:c6r3s10', 'W:c6r2s10', 'W:c6r1s10'],
          ['W:c6r4s6',  'W:c6r3s11', 'W:c6r2s11', 'W:c6r1s11'],
          [null,        'W:c6r3s12', 'W:c6r2s12', 'W:c6r1s12'],
          [null,        'W:c6r3s13', 'W:c6r2s13', 'W:c6r1s13'],
          [null,        'W:c6r3s14', 'W:c6r2s14', 'W:c6r1s14'],
        ],
      }),
    ];
  }
}
