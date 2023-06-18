import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Paris extends Campus implements ICampus {
  emoji = (): string => '🇫🇷';

  name = (): CampusNames => 'paris';

  extractorRegexp = (): RegExp =>
    /(?<building>bess|paul)-(?<clusterWithLetter>f(?<cluster>\d+(?:A|B)?))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>s(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      // bess-f1 ready to use
      new Cluster({
        identifier: 'bess-f1',
        name: 'Ada',
        totalWorkspaces: 73,
        // prettier-ignore
        map: [
          ['T:r1',   'P',  'P',  'P',  'P', null, null, 'W:bess-f1r1s1', 'W:bess-f1r1s2', 'W:bess-f1r1s3', 'W:bess-f1r1s4', 'W:bess-f1r1s5', 'W:bess-f1r1s6', 'W:bess-f1r1s7', 'W:bess-f1r1s8', null, null, 'W:bess-f1r1s9', 'W:bess-f1r1s10', 'W:bess-f1r1s11', 'W:bess-f1r1s12', 'W:bess-f1r1s13', 'W:bess-f1r1s14',             null, 'T:r1'],
          ['T:r2',   'P',  'P',  'P',  'P', null, null,            null, 'W:bess-f1r2s1', 'W:bess-f1r2s2', 'W:bess-f1r2s3', 'W:bess-f1r2s4', 'W:bess-f1r2s5', 'W:bess-f1r2s6',            null, null, null, 'W:bess-f1r2s7',  'W:bess-f1r2s8',  'W:bess-f1r2s9', 'W:bess-f1r2s10', 'W:bess-f1r2s11', 'W:bess-f1r2s12',             null, 'T:r2'],
          ['T:r3',   'P',  'P',  'P',  'P', null, null, 'W:bess-f1r3s1', 'W:bess-f1r3s2', 'W:bess-f1r3s3', 'W:bess-f1r3s4', 'W:bess-f1r3s5', 'W:bess-f1r3s6', 'W:bess-f1r3s7', 'W:bess-f1r3s8', null, null, 'W:bess-f1r3s9', 'W:bess-f1r3s10', 'W:bess-f1r3s11', 'W:bess-f1r3s12', 'W:bess-f1r3s13', 'W:bess-f1r3s14',             null, 'T:r3'],
          ['T:r4',  null, null, null, null, null, null, 'W:bess-f1r4s1', 'W:bess-f1r4s2', 'W:bess-f1r4s3', 'W:bess-f1r4s4', 'W:bess-f1r4s5', 'W:bess-f1r4s6', 'W:bess-f1r4s7',            null, null, null, 'W:bess-f1r4s8',  'W:bess-f1r4s9', 'W:bess-f1r4s10', 'W:bess-f1r4s11', 'W:bess-f1r4s12', 'W:bess-f1r4s13', 'W:bess-f1r4s14', 'T:r4'],
          ['T:r5',  null, null, null, null, null, null,            null, 'W:bess-f1r5s1', 'W:bess-f1r5s2', 'W:bess-f1r5s3', 'W:bess-f1r5s4', 'W:bess-f1r5s5', 'W:bess-f1r5s6', 'W:bess-f1r5s7', null, null, 'W:bess-f1r5s8',  'W:bess-f1r5s9', 'W:bess-f1r5s10', 'W:bess-f1r5s11', 'W:bess-f1r5s12', 'W:bess-f1r5s13',             null, 'T:r5'],
          ['T:r6',  null, null, null, null, null, null,            null,            null,            null,            null,            null,            null,            null,            null, null, null, 'W:bess-f1r6s1',  'W:bess-f1r6s2',  'W:bess-f1r6s3',  'W:bess-f1r6s4',  'W:bess-f1r6s5',  'W:bess-f1r6s6',             null, 'T:r6'],
        ],
      }),
      // bess- f1 for viewing only
      // new Cluster({
      //   identifier: 'e4',
      //   name: 'Ada (bess-f1)',
      //   totalWorkspaces: 73,
      //   // prettier-ignore
      //   map: [
      //     // the P areas are the desk with no computers (for personal computer usage)
      //     ['T:r1',   'P',  'P',  'P',  'P', null, null, 'W:e4r1p1', 'W:e4r1p2', 'W:e4r1p3', 'W:e4r1p4', 'W:e4r1p5', 'W:e4r1p6', 'W:e4r1p7', 'W:e4r1p8', null, null, 'W:e4r1p9',  'W:e4r1p10',  'W:e4r1p11', 'W:e4r1p12', 'W:e4r1p13', 'W:e4r1p14',        null, 'T:r1'],
      //     ['T:r2',   'P',  'P',  'P',  'P', null, null,       null, 'W:e4r2p1', 'W:e4r2p2', 'W:e4r2p3', 'W:e4r2p4', 'W:e4r2p5', 'W:e4r2p6',       null, null, null, 'W:e4r2p7',   'W:e4r2p8',   'W:e4r2p9', 'W:e4r2p10', 'W:e4r2p11', 'W:e4r2p12',        null, 'T:r2'],
      //     ['T:r3',   'P',  'P',  'P',  'P', null, null, 'W:e4r3p1', 'W:e4r3p2', 'W:e4r3p3', 'W:e4r3p4', 'W:e4r3p5', 'W:e4r3p6', 'W:e4r3p7', 'W:e4r3p8', null, null, 'W:e4r3p9',  'W:e4r3p10',  'W:e4r3p11', 'W:e4r3p12', 'W:e4r3p13', 'W:e4r3p14',        null, 'T:r3'],
      //     ['T:r4',  null, null, null, null, null, null, 'W:e4r4p1', 'W:e4r4p2', 'W:e4r4p3', 'W:e4r4p4', 'W:e4r4p5', 'W:e4r4p6', 'W:e4r4p7',       null, null, null, 'W:e4r4p8',   'W:e4r4p9',  'W:e4r4p10', 'W:e4r4p11', 'W:e4r4p12', 'W:e4r4p13', 'W:e4r4p14', 'T:r4'],
      //     ['T:r5',  null, null, null, null, null, null,       null, 'W:e4r5p1', 'W:e4r5p2', 'W:e4r5p3', 'W:e4r5p4', 'W:e4r5p5', 'W:e4r5p6', 'W:e4r5p7', null, null, 'W:e4r5p8',   'W:e4r5p9',  'W:e4r5p10', 'W:e4r5p11', 'W:e4r5p12', 'W:e4r5p13',        null, 'T:r5'],
      //     ['T:r6',  null, null, null, null, null, null,       null,       null,       null,       null,       null,       null,       null,       null, null, null, 'W:e4r6p1',   'W:e4r6p2',   'W:e4r6p3',  'W:e4r6p4',  'W:e4r6p5',  'W:e4r6p6',        null, 'T:r6'],
      //   ],
      // }),
      // bess-f2 ready to use
      new Cluster({
        identifier: 'bess-f2',
        name: 'Hyrule',
        totalWorkspaces: 100,
        // prettier-ignore
        map: [
          ['T:r1',  'W:bess-f2r1p1', 'W:bess-f2r1p2', 'W:bess-f2r1p3', 'W:bess-f2r1p4', 'W:bess-f2r1p5', 'W:bess-f2r1p6', null, null, 'W:bess-f2r1p7', 'W:bess-f2r1p8', 'W:bess-f2r1p9', 'W:bess-f2r1p10', 'W:bess-f2r1p11', 'W:bess-f2r1p12', 'W:bess-f2r1p13', 'W:bess-f2r1p14', null, null, 'W:bess-f2r1p15', 'W:bess-f2r1p16', 'W:bess-f2r1p17', 'W:bess-f2r1p18', 'W:bess-f2r1p19', 'W:bess-f2r1p20', 'W:bess-f2r1p21', 'T:r1'],
          ['T:r2',  'W:bess-f2r2p1', 'W:bess-f2r2p2', 'W:bess-f2r2p3', 'W:bess-f2r2p4', 'W:bess-f2r2p5', 'W:bess-f2r2p6', null, null,            null, 'W:bess-f2r2p7', 'W:bess-f2r2p8',  'W:bess-f2r2p9', 'W:bess-f2r2p10', 'W:bess-f2r2p11', 'W:bess-f2r2p12',             null, null, null, 'W:bess-f2r2p13', 'W:bess-f2r2p14', 'W:bess-f2r2p15', 'W:bess-f2r2p16', 'W:bess-f2r2p17', 'W:bess-f2r2p18',             null, 'T:r2'],
          ['T:r3',  'W:bess-f2r3p1', 'W:bess-f2r3p2', 'W:bess-f2r3p3', 'W:bess-f2r3p4', 'W:bess-f2r3p5', 'W:bess-f2r3p6', null, null, 'W:bess-f2r3p7', 'W:bess-f2r3p8', 'W:bess-f2r3p9', 'W:bess-f2r3p10', 'W:bess-f2r3p11', 'W:bess-f2r3p12', 'W:bess-f2r3p13', 'W:bess-f2r3p14', null, null, 'W:bess-f2r3p15', 'W:bess-f2r3p16', 'W:bess-f2r3p17', 'W:bess-f2r3p18', 'W:bess-f2r3p19', 'W:bess-f2r3p20',             null, 'T:r3'],
          ['T:r4',  'W:bess-f2r4p1', 'W:bess-f2r4p2', 'W:bess-f2r4p3', 'W:bess-f2r4p4', 'W:bess-f2r4p5', 'W:bess-f2r4p6', null, null, 'W:bess-f2r4p7', 'W:bess-f2r4p8', 'W:bess-f2r4p9', 'W:bess-f2r4p10', 'W:bess-f2r4p11', 'W:bess-f2r4p12', 'W:bess-f2r4p13',             null, null, null, 'W:bess-f2r4p14', 'W:bess-f2r4p15', 'W:bess-f2r4p16', 'W:bess-f2r4p17', 'W:bess-f2r4p18', 'W:bess-f2r4p19',             null, 'T:r4'],
          ['T:r5',             null,            null,            null, 'W:bess-f2r5p1', 'W:bess-f2r5p2', 'W:bess-f2r5p3', null, null,            null, 'W:bess-f2r5p4', 'W:bess-f2r5p5',  'W:bess-f2r5p6',  'W:bess-f2r5p7',  'W:bess-f2r5p8',  'W:bess-f2r5p9', 'W:bess-f2r5p10', null, null, 'W:bess-f2r5p11', 'W:bess-f2r5p12', 'W:bess-f2r5p13', 'W:bess-f2r5p14', 'W:bess-f2r5p15', 'W:bess-f2r5p16',             null, 'T:r5'],
          ['T:r6',             null,            null,            null,            null,            null,            null, null, null,            null,            null,            null,             null,             null,             null,             null,             null, null, null,  'W:bess-f2r6p1',  'W:bess-f2r6p2',  'W:bess-f2r6p3',  'W:bess-f2r6p4',  'W:bess-f2r6p5',  'W:bess-f2r6p6',             null, 'T:r6'],
        ],
      }),
      //bess-f2 viewing only
      // new Cluster({
      //   identifier: 'e5',
      //   name: 'Hyrule (bess-f2)',
      //   totalWorkspaces: 100,
      //   // prettier-ignore
      //   map: [
      //     ['T:r1',  'W:e5r1p1',  'W:e5r1p2',  'W:e5r1p3',  'W:e5r1p4',  'W:e5r1p5',  'W:e5r1p6', null, null, 'W:e5r1p7', 'W:e5r1p8', 'W:e5r1p9', 'W:e5r1p10', 'W:e5r1p11', 'W:e5r1p12', 'W:e5r1p13', 'W:e5r1p14', null, null, 'W:e5r1p15',  'W:e5r1p16',  'W:e5r1p17', 'W:e5r1p18', 'W:e5r1p19', 'W:e5r1p20', 'W:e5r1p21', 'T:r1'],
      //     ['T:r2',  'W:e5r2p1',  'W:e5r2p2',  'W:e5r2p3',  'W:e5r2p4',  'W:e5r2p5',  'W:e5r2p6', null, null,       null, 'W:e5r2p7', 'W:e5r2p8',  'W:e5r2p9', 'W:e5r2p10', 'W:e5r2p11', 'W:e5r2p12',        null, null, null, 'W:e5r2p13',  'W:e5r2p14',  'W:e5r2p15', 'W:e5r2p16', 'W:e5r2p17', 'W:e5r2p18',        null, 'T:r2'],
      //     ['T:r3',  'W:e5r3p1',  'W:e5r3p2',  'W:e5r3p3',  'W:e5r3p4',  'W:e5r3p5',  'W:e5r3p6', null, null, 'W:e5r3p7', 'W:e5r3p8', 'W:e5r3p9', 'W:e5r3p10', 'W:e5r3p11', 'W:e5r3p12', 'W:e5r3p13', 'W:e5r3p14', null, null, 'W:e5r3p15',  'W:e5r3p16',  'W:e5r3p17', 'W:e5r3p18', 'W:e5r3p19', 'W:e5r3p20',        null, 'T:r3'],
      //     ['T:r4',  'W:e5r4p1',  'W:e5r4p2',  'W:e5r4p3',  'W:e5r4p4',  'W:e5r4p5',  'W:e5r4p6', null, null, 'W:e5r4p7', 'W:e5r4p8', 'W:e5r4p9', 'W:e5r4p10', 'W:e5r4p11', 'W:e5r4p12', 'W:e5r4p13',        null, null, null, 'W:e5r4p14',  'W:e5r4p15',  'W:e5r4p16', 'W:e5r4p17', 'W:e5r4p18', 'W:e5r4p19',        null, 'T:r4'],
      //     ['T:r5',        null,        null,        null,  'W:e5r5p1',  'W:e5r5p2',  'W:e5r5p3', null, null,       null, 'W:e5r5p4', 'W:e5r5p5',  'W:e5r5p6',  'W:e5r5p7',  'W:e5r5p8',  'W:e5r5p9', 'W:e5r5p10', null, null, 'W:e5r5p11',  'W:e5r5p12',  'W:e5r5p13', 'W:e5r5p14', 'W:e5r5p15', 'W:e5r5p16',        null, 'T:r5'],
      //     ['T:r6',        null,        null,        null,        null,        null,        null, null, null,       null,       null,       null,        null,        null,        null,        null,        null, null, null,  'W:e5r6p1',   'W:e5r6p2',   'W:e5r6p3',  'W:e5r6p4',  'W:e5r6p5',  'W:e5r6p6',        null, 'T:r6'],
      //   ],
      // }),
      // bess-f3 ready to use
      new Cluster({
        identifier: 'bess-f3',
        name: 'Turing (bess-f3)',
        totalWorkspaces: 74,
        // prettier-ignore
        map: [
          ['T:r1',  null, null, null, null, null, null, 'W:bess-f3r1p1', 'W:bess-f3r1p2', 'W:bess-f3r1p3', 'W:bess-f3r1p4', 'W:bess-f3r1p5', 'W:bess-f3r1p6', 'W:bess-f3r1p7', 'W:bess-f3r1p8', null, null, 'W:bess-f3r1p9', 'W:bess-f3r1p10', 'W:bess-f3r1p11', 'W:bess-f3r1p12', 'W:bess-f3r1p13', 'W:bess-f3r1p14', 'W:bess-f3r1p15', 'T:r1'],
          ['T:r2',  null, null, null, null, null, null,            null, 'W:bess-f3r2p1', 'W:bess-f3r2p2', 'W:bess-f3r2p3', 'W:bess-f3r2p4', 'W:bess-f3r2p5', 'W:bess-f3r2p6',            null, null, null, 'W:bess-f3r2p7',  'W:bess-f3r2p8',  'W:bess-f3r2p9', 'W:bess-f3r2p10', 'W:bess-f3r2p11', 'W:bess-f3r2p12',            null, 'T:r2'],
          ['T:r3',  null, null, null, null, null, null, 'W:bess-f3r3p1', 'W:bess-f3r3p2', 'W:bess-f3r3p3', 'W:bess-f3r3p4', 'W:bess-f3r3p5', 'W:bess-f3r3p6', 'W:bess-f3r3p7', 'W:bess-f3r3p8', null, null, 'W:bess-f3r3p9', 'W:bess-f3r3p10', 'W:bess-f3r3p11', 'W:bess-f3r3p12', 'W:bess-f3r3p13', 'W:bess-f3r3p14',            null, 'T:r3'],
          ['T:r4',  null, null, null, null, null, null, 'W:bess-f3r4p1', 'W:bess-f3r4p2', 'W:bess-f3r4p3', 'W:bess-f3r4p4', 'W:bess-f3r4p5', 'W:bess-f3r4p6', 'W:bess-f3r4p7',            null, null, null, 'W:bess-f3r4p8',  'W:bess-f3r4p9', 'W:bess-f3r4p10', 'W:bess-f3r4p11', 'W:bess-f3r4p12', 'W:bess-f3r4p13',            null, 'T:r4'],
          ['T:r5',  null, null, null, null, null, null,            null, 'W:bess-f3r5p1', 'W:bess-f3r5p2', 'W:bess-f3r5p3', 'W:bess-f3r5p4', 'W:bess-f3r5p5', 'W:bess-f3r5p6', 'W:bess-f3r5p7', null, null, 'W:bess-f3r5p8',  'W:bess-f3r5p9', 'W:bess-f3r5p10', 'W:bess-f3r5p11', 'W:bess-f3r5p12', 'W:bess-f3r5p13',            null, 'T:r5'],
          ['T:r6',  null, null, null, null, null, null,            null,            null,            null,            null,            null,            null,            null,            null, null, null, 'W:bess-f3r6p1',  'W:bess-f3r6p2',  'W:bess-f3r6p3',  'W:bess-f3r6p4',  'W:bess-f3r6p5',  'W:bess-f3r6p6', 'W:bess-f3r6p7', 'T:r6'],
        ],
      }),

      // bess-f3 viewing only
      // new Cluster({
      //   identifier: 'e6',
      //   name: 'Turing (bess-f3)',
      //   totalWorkspaces: 74,
      //   // prettier-ignore
      //   map: [
      //     ['T:r1',  null, null, null, null, null, null, 'W:e6r1p1', 'W:e6r1p2', 'W:e6r1p3', 'W:e6r1p4', 'W:e6r1p5', 'W:e6r1p6', 'W:e6r1p7', 'W:e6r1p8', null, null, 'W:e6r1p9',  'W:e6r1p10',  'W:e6r1p11', 'W:e6r1p12', 'W:e6r1p13', 'W:e6r1p14', 'W:e6r1p15', 'T:r1'],
      //     ['T:r2',  null, null, null, null, null, null,       null, 'W:e6r2p1', 'W:e6r2p2', 'W:e6r2p3', 'W:e6r2p4', 'W:e6r2p5', 'W:e6r2p6',       null, null, null, 'W:e6r2p7',   'W:e6r2p8',   'W:e6r2p9', 'W:e6r2p10', 'W:e6r2p11', 'W:e6r2p12',        null, 'T:r2'],
      //     ['T:r3',  null, null, null, null, null, null, 'W:e6r3p1', 'W:e6r3p2', 'W:e6r3p3', 'W:e6r3p4', 'W:e6r3p5', 'W:e6r3p6', 'W:e6r3p7', 'W:e6r3p8', null, null, 'W:e6r3p9',  'W:e6r3p10',  'W:e6r3p11', 'W:e6r3p12', 'W:e6r3p13', 'W:e6r3p14',        null, 'T:r3'],
      //     ['T:r4',  null, null, null, null, null, null, 'W:e6r4p1', 'W:e6r4p2', 'W:e6r4p3', 'W:e6r4p4', 'W:e6r4p5', 'W:e6r4p6', 'W:e6r4p7',       null, null, null, 'W:e6r4p8',   'W:e6r4p9',  'W:e6r4p10', 'W:e6r4p11', 'W:e6r4p12', 'W:e6r4p13',        null, 'T:r4'],
      //     ['T:r5',  null, null, null, null, null, null,       null, 'W:e6r5p1', 'W:e6r5p2', 'W:e6r5p3', 'W:e6r5p4', 'W:e6r5p5', 'W:e6r5p6', 'W:e6r5p7', null, null, 'W:e6r5p8',   'W:e6r5p9',  'W:e6r5p10', 'W:e6r5p11', 'W:e6r5p12', 'W:e6r5p13',        null, 'T:r5'],
      //     ['T:r6',  null, null, null, null, null, null,       null,       null,       null,       null,       null,       null,       null,       null, null, null, 'W:e6r6p1',   'W:e6r6p2',   'W:e6r6p3',  'W:e6r6p4',  'W:e6r6p5',  'W:e6r6p6',  'W:e6r6p7', 'T:r6'],
      //   ],
      // }),
      // bess-f4 ready to use
      new Cluster({
        identifier: 'bess-f4',
        name: 'Carthage',
        totalWorkspaces: 70,
        // prettier-ignore
        map: [
          ['T:r1',  null, null, null, null, null, null, 'W:bess-f4r1p1', 'W:bess-f4r1p2', 'W:bess-f4r1p3', 'W:bess-f4r1p4', 'W:bess-f4r1p5', 'W:bess-f4r1p6', 'W:bess-f4r1p7', 'W:bess-f4r1p8', null, null, 'W:bess-f4r1p9',  'W:bess-f4r1p10',  'W:bess-f4r1p11', 'W:bess-f4r1p12', 'W:bess-f4r1p13', 'W:bess-f4r1p14', 'T:r1'],
          ['T:r2',  null, null, null, null, null, null, 'W:bess-f4r2p1', 'W:bess-f4r2p2', 'W:bess-f4r2p3', 'W:bess-f4r2p4', 'W:bess-f4r2p5', 'W:bess-f4r2p6', 'W:bess-f4r2p7',            null, null, null, 'W:bess-f4r2p7',   'W:bess-f4r2p8',   'W:bess-f4r2p9', 'W:bess-f4r2p10', 'W:bess-f4r2p11', 'W:bess-f4r2p12', 'T:r2'],
          ['T:r3',  null, null, null, null, null, null, 'W:bess-f4r3p1', 'W:bess-f4r3p2', 'W:bess-f4r3p3', 'W:bess-f4r3p4', 'W:bess-f4r3p5', 'W:bess-f4r3p6', 'W:bess-f4r3p7', 'W:bess-f4r3p8', null, null, 'W:bess-f4r3p9',  'W:bess-f4r3p10',  'W:bess-f4r3p11', 'W:bess-f4r3p12', 'W:bess-f4r3p13', 'W:bess-f4r3p14', 'T:r3'],
          ['T:r4',  null, null, null, null, null, null, 'W:bess-f4r4p1', 'W:bess-f4r4p2', 'W:bess-f4r4p3', 'W:bess-f4r4p4', 'W:bess-f4r4p5', 'W:bess-f4r4p6', 'W:bess-f4r4p7',            null, null, null, 'W:bess-f4r4p8',   'W:bess-f4r4p9',  'W:bess-f4r4p10', 'W:bess-f4r4p11', 'W:bess-f4r4p12', 'W:bess-f4r4p13', 'T:r4'],
          ['T:r5',  null, null, null, null, null, null,            null,            null,            null, 'W:bess-f4r5p1', 'W:bess-f4r5p2', 'W:bess-f4r5p3', 'W:bess-f4r5p4', 'W:bess-f4r5p5', null, null, 'W:bess-f4r5p6',   'W:bess-f4r5p7',   'W:bess-f4r5p8',  'W:bess-f4r5p9', 'W:bess-f4r5p10', 'W:bess-f4r5p11', 'T:r5'],
          ['T:r6',  null, null, null, null, null, null,            null,            null,            null,            null,            null,            null,            null,            null, null, null, 'W:bess-f4r6p1',   'W:bess-f4r6p2',   'W:bess-f4r6p3',  'W:bess-f4r6p4',  'W:bess-f4r6p5',             null, 'T:r6'],
        ],
      }),

      // bess-f4 viewing only
      // new Cluster({
      //   identifier: 'e7',
      //   name: 'Carthage (bess-f4)',
      //   totalWorkspaces: 70,
      //   // prettier-ignore
      //   map: [
      //     ['T:r1',  null, null, null, null, null, null, 'W:e7r1p1', 'W:e7r1p2', 'W:e7r1p3', 'W:e7r1p4', 'W:e7r1p5', 'W:e7r1p6', 'W:e7r1p7', 'W:e7r1p8', null, null, 'W:e7r1p9',  'W:e7r1p10',  'W:e7r1p11', 'W:e7r1p12', 'W:e7r1p13', 'W:e7r1p14', 'T:r1'],
      //     ['T:r2',  null, null, null, null, null, null, 'W:e7r2p1', 'W:e7r2p2', 'W:e7r2p3', 'W:e7r2p4', 'W:e7r2p5', 'W:e7r2p6', 'W:e7r2p7',       null, null, null, 'W:e7r2p7',   'W:e7r2p8',   'W:e7r2p9', 'W:e7r2p10', 'W:e7r2p11', 'W:e7r2p12', 'T:r2'],
      //     ['T:r3',  null, null, null, null, null, null, 'W:e7r3p1', 'W:e7r3p2', 'W:e7r3p3', 'W:e7r3p4', 'W:e7r3p5', 'W:e7r3p6', 'W:e7r3p7', 'W:e7r3p8', null, null, 'W:e7r3p9',  'W:e7r3p10',  'W:e7r3p11', 'W:e7r3p12', 'W:e7r3p13', 'W:e7r3p14', 'T:r3'],
      //     ['T:r4',  null, null, null, null, null, null, 'W:e7r4p1', 'W:e7r4p2', 'W:e7r4p3', 'W:e7r4p4', 'W:e7r4p5', 'W:e7r4p6', 'W:e7r4p7',       null, null, null, 'W:e7r4p8',   'W:e7r4p9',  'W:e7r4p10', 'W:e7r4p11', 'W:e7r4p12', 'W:e7r4p13', 'T:r4'],
      //     ['T:r5',  null, null, null, null, null, null,       null,       null,       null, 'W:e7r5p1', 'W:e7r5p2', 'W:e7r5p3', 'W:e7r5p4', 'W:e7r5p5', null, null, 'W:e7r5p6',   'W:e7r5p7',   'W:e7r5p8',  'W:e7r5p9', 'W:e7r5p10', 'W:e7r5p11', 'T:r5'],
      //     ['T:r6',  null, null, null, null, null, null,       null,       null,       null,       null,       null,       null,       null,       null, null, null, 'W:e7r6p1',   'W:e7r6p2',   'W:e7r6p3',  'W:e7r6p4',  'W:e7r6p5',        null, 'T:r6'],
      //   ],
      // }),

      //paul-f3A ready to use
      new Cluster({
        identifier: 'paul-f3A',
        name: 'Pandora (paul-f3A)',
        totalWorkspaces: 70,
        // prettier-ignore
        map: [
          ['T:r9',             null,             null,             null,             null,             null,             null,             null,             null, null, null,             null,              null,  'W:paul-f3Ar9p1', 'T:r9'],
          ['T:r8',             null,             null,             null,             null,             null,             null,             null,             null, null, null, 'W:paul-f3Ar8p1',  'W:paul-f3Ar8p2',  'W:paul-f3Ar8p3', 'T:r8'],
          ['T:r7',             null,             null,             null,             null,             null,             null, 'W:paul-f3Ar7p1', 'W:paul-f3Ar7p2', null, null, 'W:paul-f3Ar7p3',  'W:paul-f3Ar7p4',  'W:paul-f3Ar7p5', 'T:r7'],
          ['T:r6',             null, 'W:paul-f3Ar6p1', 'W:paul-f3Ar6p2', 'W:paul-f3Ar6p3', 'W:paul-f3Ar6p4', 'W:paul-f3Ar6p5', 'W:paul-f3Ar6p6', 'W:paul-f3Ar6p7', null, null, 'W:paul-f3Ar6p8',  'W:paul-f3Ar6p9', 'W:paul-f3Ar6p10', 'T:r6'],
          ['T:r5', 'W:paul-f3Ar5p1', 'W:paul-f3Ar5p2', 'W:paul-f3Ar5p3', 'W:paul-f3Ar5p4', 'W:paul-f3Ar5p5', 'W:paul-f3Ar5p6', 'W:paul-f3Ar5p7', 'W:paul-f3Ar5p8', null, null, 'W:paul-f3Ar5p9', 'W:paul-f3Ar5p10', 'W:paul-f3Ar5p11', 'T:r5'],
          ['T:r4', 'W:paul-f3Ar4p1', 'W:paul-f3Ar4p2', 'W:paul-f3Ar4p3', 'W:paul-f3Ar4p4', 'W:paul-f3Ar4p5',             null, 'W:paul-f3Ar4p6', 'W:paul-f3Ar4p7', null, null, 'W:paul-f3Ar4p8',  'W:paul-f3Ar4p9', 'W:paul-f3Ar4p10', 'T:r4'],
          ['T:r3', 'W:paul-f3Ar3p1', 'W:paul-f3Ar3p2', 'W:paul-f3Ar3p3', 'W:paul-f3Ar3p4', 'W:paul-f3Ar3p5', 'W:paul-f3Ar3p6', 'W:paul-f3Ar3p7', 'W:paul-f3Ar3p8', null, null, 'W:paul-f3Ar3p9', 'W:paul-f3Ar3p10', 'W:paul-f3Ar3p11', 'T:r3'],
          ['T:r2', 'W:paul-f3Ar2p1', 'W:paul-f3Ar2p2', 'W:paul-f3Ar2p3', 'W:paul-f3Ar2p4', 'W:paul-f3Ar2p5',             null,             null,             null, null, null,             null,              null,              null, 'T:r2'],
          ['T:r1', 'W:paul-f3Ar1p1', 'W:paul-f3Ar1p2',             null,             null,             null,             null,             null,             null, null, null,             null,              null,              null, 'T:r1'],
        ],
      }),

      //paul-f3B viewing only
      // new Cluster({
      //   identifier: 'e8A',
      //   name: 'Grâce (paul-f3A)',
      //   totalWorkspaces: 58,
      //   // prettier-ignore
      //   map: [
      //     ['T:r9',        null,        null,        null,        null,        null,        null,        null,        null, null, null,        null,         null,  'W:e8r9p1', 'T:r9'],
      //     ['T:r8',        null,        null,        null,        null,        null,        null,        null,        null, null, null, 'W:e8r8p1',  'W:e8r8p2',  'W:e8r8p3', 'T:r8'],
      //     ['T:r7',        null,        null,        null,        null,        null,        null, 'W:e8r7p1', 'W:e8r7p2', null, null, 'W:e8r7p3',  'W:e8r7p4',  'W:e8r7p5', 'T:r7'],
      //     ['T:r6',        null, 'W:e8r6p1', 'W:e8r6p2', 'W:e8r6p3', 'W:e8r6p4', 'W:e8r6p5', 'W:e8r6p6', 'W:e8r6p7', null, null, 'W:e8r6p8',  'W:e8r6p9', 'W:e8r6p10', 'T:r6'],
      //     ['T:r5', 'W:e8r5p1', 'W:e8r5p2', 'W:e8r5p3', 'W:e8r5p4', 'W:e8r5p5', 'W:e8r5p6', 'W:e8r5p7', 'W:e8r5p8', null, null, 'W:e8r5p9', 'W:e8r5p10', 'W:e8r5p11', 'T:r5'],
      //     ['T:r4', 'W:e8r4p1', 'W:e8r4p2', 'W:e8r4p3', 'W:e8r4p4', 'W:e8r4p5',        null, 'W:e8r4p6', 'W:e8r4p7', null, null, 'W:e8r4p8',  'W:e8r4p9', 'W:e8r4p10', 'T:r4'],
      //     ['T:r3', 'W:e8r3p1', 'W:e8r3p2', 'W:e8r3p3', 'W:e8r3p4', 'W:e8r3p5', 'W:e8r3p6', 'W:e8r3p7', 'W:e8r3p8', null, null, 'W:e8r3p9', 'W:e8r3p10', 'W:e8r3p11', 'T:r3'],
      //     ['T:r2', 'W:e8r2p1', 'W:e8r2p2', 'W:e8r2p3', 'W:e8r2p4', 'W:e8r2p5',        null,        null,        null, null, null,        null,         null,         null, 'T:r2'],
      //     ['T:r1', 'W:e8r1p1', 'W:e8r1p2',        null,        null,        null,        null,        null,        null, null, null,        null,         null,         null, 'T:r1'],
      //   ],
      // }),

      // //paul-f3B viewing only
      new Cluster({
        identifier: 'paul-f3B',
        name: 'The Citadel',
        totalWorkspaces: 52,
        // prettier-ignore
        map: [
          ['T:r10', 'W:paul-f3Br10p1', 'W:paul-f3Br10p2',             null, null, null,             null,             null,             null,             null,             null, 'T:r10'],
          [ 'T:r9',  'W:paul-f3Br9p1',  'W:paul-f3Br9p2', 'W:paul-f3Br9p3', null, null,             null,             null,             null,             null,             null,  'T:r9'],
          [ 'T:r8',  'W:paul-f3Br8p1',  'W:paul-f3Br8p2', 'W:paul-f3Br8p3', null, null,             null,             null,             null,             null,             null,  'T:r8'],
          [ 'T:r7',  'W:paul-f3Br7p1',  'W:paul-f3Br7p2', 'W:paul-f3Br7p3', null, null, 'W:paul-f3Br7p4', 'W:paul-f3Br7p5',             null, 'W:paul-f3Br7p6', 'W:paul-f3Br7p7',  'T:r7'],
          [ 'T:r6',  'W:paul-f3Br6p1',  'W:paul-f3Br6p2', 'W:paul-f3Br6p3', null, null, 'W:paul-f3Br6p4', 'W:paul-f3Br6p5', 'W:paul-f3Br6p6', 'W:paul-f3Br6p7', 'W:paul-f3Br6p8',  'T:r6'],
          [ 'T:r5',  'W:paul-f3Br5p1',  'W:paul-f3Br5p2', 'W:paul-f3Br5p3', null, null, 'W:paul-f3Br5p4', 'W:paul-f3Br5p5', 'W:paul-f3Br5p6', 'W:paul-f3Br5p7', 'W:paul-f3Br5p8',  'T:r5'],
          [ 'T:r4',  'W:paul-f3Br4p1',  'W:paul-f3Br4p2', 'W:paul-f3Br4p3', null, null, 'W:paul-f3Br4p4', 'W:paul-f3Br4p5', 'W:paul-f3Br4p6', 'W:paul-f3Br4p7', 'W:paul-f3Br4p8',  'T:r4'],
          [ 'T:r3',  'W:paul-f3Br3p1',  'W:paul-f3Br3p2', 'W:paul-f3Br3p3', null, null, 'W:paul-f3Br3p4', 'W:paul-f3Br3p5',             null, 'W:paul-f3Br3p6', 'W:paul-f3Br3p7',  'T:r3'],
          [ 'T:r2',              null,              null,             null, null, null, 'W:paul-f3Br2p1', 'W:paul-f3Br2p2',             null,             null,             null,  'T:r2'],
          [ 'T:r1',              null,              null,             null, null, null, 'W:paul-f3Br1p1', 'W:paul-f3Br1p2',             null,             null,             null,  'T:r1'],
        ],
      }),

      //paul-f3B viewing only
      // new Cluster({
      //   identifier: 'e8B',
      //   name: 'The Citadel (paul-f3B)',
      //   totalWorkspaces: 52,
      //   // prettier-ignore
      //   map: [
      //     ['T:r10','W:e8r10p1', 'W:e8r10p2',        null, null, null,        null,        null,        null,        null,        null, 'T:r10'],
      //     ['T:r9',  'W:e8r9p1',  'W:e8r9p2', 'W:e8r9p3', null, null,        null,        null,        null,        null,        null, 'T:r9'],
      //     ['T:r8',  'W:e8r8p1',  'W:e8r8p2', 'W:e8r8p3', null, null,        null,        null,        null,        null,        null, 'T:r8'],
      //     ['T:r7',  'W:e8r7p1',  'W:e8r7p2', 'W:e8r7p3', null, null, 'W:e8r7p4', 'W:e8r7p5',        null, 'W:e8r7p6', 'W:e8r7p7', 'T:r7'],
      //     ['T:r6',  'W:e8r6p1',  'W:e8r6p2', 'W:e8r6p3', null, null, 'W:e8r6p4', 'W:e8r6p5', 'W:e8r6p6', 'W:e8r6p7', 'W:e8r6p8', 'T:r6'],
      //     ['T:r5',  'W:e8r5p1',  'W:e8r5p2', 'W:e8r5p3', null, null, 'W:e8r5p4', 'W:e8r5p5', 'W:e8r5p6', 'W:e8r5p7', 'W:e8r5p8', 'T:r5'],
      //     ['T:r4',  'W:e8r4p1',  'W:e8r4p2', 'W:e8r4p3', null, null, 'W:e8r4p4', 'W:e8r4p5', 'W:e8r4p6', 'W:e8r4p7', 'W:e8r4p8', 'T:r4'],
      //     ['T:r3',  'W:e8r3p1',  'W:e8r3p2', 'W:e8r3p3', null, null, 'W:e8r3p4', 'W:e8r3p5',        null, 'W:e8r3p6', 'W:e8r3p7', 'T:r3'],
      //     ['T:r2',         null,         null,        null, null, null, 'W:e8r2p1', 'W:e8r2p2',        null,        null,        null, 'T:r2'],
      //     ['T:r1',         null,         null,        null, null, null, 'W:e8r1p1', 'W:e8r1p2',        null,        null,        null, 'T:r1'],
      //   ],
      // }),
      // // paul-f3A/B together ready to use EXCEPT identifier not set
      new Cluster({
        identifier: 'paul-f3',
        name: 'Grâce / The Citadel',
        totalWorkspaces: 110,
        // prettier-ignore
        map: [
          ['T:r10',            null,              null,             null,             null,             null,             null,             null,             null, null, null,             null,              null,              null,   null, 'P', 'T:r10', 'W:paul-f3Br10p1', 'W:paul-f3Br10p2',             null, null, null,             null,             null,             null,             null,             null, 'T:r10'],
          ['T:r9',             null,              null,             null,             null,             null,             null,             null,             null, null, null,             null,              null,  'W:paul-f3Ar9p1', 'T:r9', 'P',  'T:r9',  'W:paul-f3Br9p1',  'W:paul-f3Br9p2', 'W:paul-f3Br9p3', null, null,             null,             null,             null,             null,             null,  'T:r9'],
          ['T:r8',             null,              null,             null,             null,             null,             null,             null,             null, null, null, 'W:paul-f3Ar8p1',  'W:paul-f3Ar8p2',  'W:paul-f3Ar8p3', 'T:r8', 'P',  'T:r8',  'W:paul-f3Br8p1',  'W:paul-f3Br8p2', 'W:paul-f3Br8p3', null, null,             null,             null,             null,             null,             null,  'T:r8'],
          ['T:r7',             null,              null,             null,             null,             null,             null, 'W:paul-f3Ar7p1', 'W:paul-f3Ar7p2', null, null, 'W:paul-f3Ar7p3',  'W:paul-f3Ar7p4',  'W:paul-f3Ar7p5', 'T:r7', 'P',  'T:r7',  'W:paul-f3Br7p1',  'W:paul-f3Br7p2', 'W:paul-f3Br7p3', null, null, 'W:paul-f3Br7p4', 'W:paul-f3Br7p5',             null, 'W:paul-f3Br7p6', 'W:paul-f3Br7p7',  'T:r7'],
          ['T:r6',             null,  'W:paul-f3Ar6p1', 'W:paul-f3Ar6p2', 'W:paul-f3Ar6p3', 'W:paul-f3Ar6p4', 'W:paul-f3Ar6p5', 'W:paul-f3Ar6p6', 'W:paul-f3Ar6p7', null, null, 'W:paul-f3Ar6p8',  'W:paul-f3Ar6p9', 'W:paul-f3rA6p10', 'T:r6', 'P',  'T:r6',  'W:paul-f3Br6p1',  'W:paul-f3Br6p2', 'W:paul-f3Br6p3', null, null, 'W:paul-f3Br6p4', 'W:paul-f3Br6p5', 'W:paul-f3Br6p6', 'W:paul-f3Br6p7', 'W:paul-f3Br6p8',  'T:r6'],
          ['T:r5',  'W:paul-f3Ar5p1', 'W:paul-f3Ar5p2', 'W:paul-f3Ar5p3', 'W:paul-f3Ar5p4', 'W:paul-f3Ar5p5', 'W:paul-f3Ar5p6', 'W:paul-f3Ar5p7', 'W:paul-f3Ar5p8', null, null, 'W:paul-f3Ar5p9', 'W:paul-f3Ar5p10', 'W:paul-f3rA5p11', 'T:r5', 'P',  'T:r5',  'W:paul-f3Br5p1',  'W:paul-f3Br5p2', 'W:paul-f3Br5p3', null, null, 'W:paul-f3Br5p4', 'W:paul-f3Br5p5', 'W:paul-f3Br5p6', 'W:paul-f3Br5p7', 'W:paul-f3Br5p8',  'T:r5'],
          ['T:r4',  'W:paul-f3Ar4p1', 'W:paul-f3Ar4p2', 'W:paul-f3Ar4p3', 'W:paul-f3Ar4p4', 'W:paul-f3Ar4p5',             null, 'W:paul-f3Ar4p6', 'W:paul-f3Ar4p7', null, null, 'W:paul-f3Ar4p8',  'W:paul-f3Ar4p9', 'W:paul-f3rA4p10', 'T:r4', 'P',  'T:r4',  'W:paul-f3Br4p1',  'W:paul-f3Br4p2', 'W:paul-f3Br4p3', null, null, 'W:paul-f3Br4p4', 'W:paul-f3Br4p5', 'W:paul-f3Br4p6', 'W:paul-f3Br4p7', 'W:paul-f3Br4p8',  'T:r4'],
          ['T:r3',  'W:paul-f3Ar3p1', 'W:paul-f3Ar3p2', 'W:paul-f3Ar3p3', 'W:paul-f3Ar3p4', 'W:paul-f3Ar3p5', 'W:paul-f3Ar3p6', 'W:paul-f3Ar3p7', 'W:paul-f3Ar3p8', null, null, 'W:paul-f3Ar3p9', 'W:paul-f3Ar3p10', 'W:paul-f3rA3p11', 'T:r3', 'P',  'T:r3',  'W:paul-f3Br3p1',  'W:paul-f3Br3p2', 'W:paul-f3Br3p3', null, null, 'W:paul-f3Br3p4', 'W:paul-f3Br3p5',             null, 'W:paul-f3Br3p6', 'W:paul-f3Br3p7',  'T:r3'],
          ['T:r2',  'W:paul-f3Ar2p1', 'W:paul-f3Ar2p2', 'W:paul-f3Ar2p3', 'W:paul-f3Ar2p4', 'W:paul-f3Ar2p5',             null,             null,             null, null, null,             null,              null,              null, 'T:r2', 'P',  'T:r2',              null,              null,             null, null, null, 'W:paul-f3Br2p1', 'W:paul-f3Br2p2',             null,             null,             null,  'T:r2'],
          ['T:r1',  'W:paul-f3Ar1p1', 'W:paul-f3Ar1p2',             null,             null,             null,             null,             null,             null, null, null,             null,              null,              null, 'T:r1', 'P',  'T:r1',              null,              null,             null, null, null, 'W:paul-f3Br1p1', 'W:paul-f3Br1p2',             null,             null,             null,  'T:r1'],
        ],
      }),
      // paul-f3A/B together viewing only
      // new Cluster({
      //   identifier: 'e8',
      //   name: 'Grâce / The Citadel (paul-f3A/B)',
      //   totalWorkspaces: 110,
      //   // prettier-ignore
      //   map: [
      //     ['T:r10',       null,       null,       null,      null,        null,       null,       null,       null, null, null,       null,        null,        null,   null, 'P', 'T:r10', 'W:e8r10p1', 'W:e8r10p2',        null, null, null,        null,        null,        null,        null,        null, 'T:r10'],
      //     ['T:r9',        null,       null,       null,      null,        null,       null,       null,       null, null, null,       null,        null,  'W:e8r9p1', 'T:r9', 'P',  'T:r9',  'W:e8r9p1',  'W:e8r9p2', 'W:e8r9p3', null, null,        null,        null,        null,        null,        null, 'T:r9'],
      //     ['T:r8',        null,       null,       null,      null,        null,       null,       null,       null, null, null, 'W:e8r8p1',  'W:e8r8p2',  'W:e8r8p3', 'T:r8', 'P',  'T:r8',  'W:e8r8p1',  'W:e8r8p2', 'W:e8r8p3', null, null,        null,        null,        null,        null,        null, 'T:r8'],
      //     ['T:r7',        null,       null,       null,      null,        null,       null, 'W:e8r7p1', 'W:e8r7p2', null, null, 'W:e8r7p3',  'W:e8r7p4',  'W:e8r7p5', 'T:r7', 'P',  'T:r7',  'W:e8r7p1',  'W:e8r7p2', 'W:e8r7p3', null, null, 'W:e8r7p4', 'W:e8r7p5',        null, 'W:e8r7p6', 'W:e8r7p7', 'T:r7'],
      //     ['T:r6',        null, 'W:e8r6p1', 'W:e8r6p2', 'W:e8r6p3', 'W:e8r6p4', 'W:e8r6p5', 'W:e8r6p6', 'W:e8r6p7', null, null, 'W:e8r6p8',  'W:e8r6p9', 'W:e8r6p10', 'T:r6', 'P',  'T:r6',  'W:e8r6p1',  'W:e8r6p2', 'W:e8r6p3', null, null, 'W:e8r6p4', 'W:e8r6p5', 'W:e8r6p6', 'W:e8r6p7', 'W:e8r6p8', 'T:r6'],
      //     ['T:r5',  'W:e8r5p1', 'W:e8r5p2', 'W:e8r5p3', 'W:e8r5p4', 'W:e8r5p5', 'W:e8r5p6', 'W:e8r5p7', 'W:e8r5p8', null, null, 'W:e8r5p9', 'W:e8r5p10', 'W:e8r5p11', 'T:r5', 'P',  'T:r5',  'W:e8r5p1',  'W:e8r5p2', 'W:e8r5p3', null, null, 'W:e8r5p4', 'W:e8r5p5', 'W:e8r5p6', 'W:e8r5p7', 'W:e8r5p8', 'T:r5'],
      //     ['T:r4',  'W:e8r4p1', 'W:e8r4p2', 'W:e8r4p3', 'W:e8r4p4', 'W:e8r4p5',       null, 'W:e8r4p6', 'W:e8r4p7', null, null, 'W:e8r4p8',  'W:e8r4p9', 'W:e8r4p10', 'T:r4', 'P',  'T:r4',  'W:e8r4p1',  'W:e8r4p2', 'W:e8r4p3', null, null, 'W:e8r4p4', 'W:e8r4p5', 'W:e8r4p6', 'W:e8r4p7', 'W:e8r4p8', 'T:r4'],
      //     ['T:r3',  'W:e8r3p1', 'W:e8r3p2', 'W:e8r3p3', 'W:e8r3p4', 'W:e8r3p5', 'W:e8r3p6', 'W:e8r3p7', 'W:e8r3p8', null, null, 'W:e8r3p9', 'W:e8r3p10', 'W:e8r3p11', 'T:r3', 'P',  'T:r3',  'W:e8r3p1',  'W:e8r3p2', 'W:e8r3p3', null, null, 'W:e8r3p4', 'W:e8r3p5',        null, 'W:e8r3p6', 'W:e8r3p7', 'T:r3'],
      //     ['T:r2',  'W:e8r2p1', 'W:e8r2p2', 'W:e8r2p3', 'W:e8r2p4', 'W:e8r2p5',       null,       null,       null, null, null,       null,        null,        null, 'T:r2', 'P',  'T:r2',         null,         null,        null, null, null, 'W:e8r2p1', 'W:e8r2p2',        null,        null,        null, 'T:r2'],
      //     ['T:r1',  'W:e8r1p1', 'W:e8r1p2',       null,       null,       null,       null,       null,       null, null, null,       null,        null,        null, 'T:r1', 'P',  'T:r1',         null,         null,        null, null, null, 'W:e8r1p1', 'W:e8r1p2',        null,        null,        null, 'T:r1'],
      //   ],
      // }),
      // paul-f4A/B together viewing only
      // new Cluster({
      //   identifier: 'e9',
      //   name: 'The Grid / The Upside (paul-f4A/B)',
      //   totalWorkspaces: 105,
      //   // prettier-ignore
      //   map: [
      //     [  null,       null,       null,       null,      null,        null,       null,       null,       null, null, null,       null,        null,        null,   null, 'P',  'T:r9', 'W:e9r9p1', 'W:e9r9p2', 'W:e9r9p3', null, null,       null,       null,       null,        null,        null, 'T:r9'],
      //     [  null,       null,       null,       null,      null,        null,       null,       null,       null, null, null,       null,        null,        null,   null, 'P',  'T:r8', 'W:e9r8p1', 'W:e9r8p2', 'W:e9r8p3', null, null,       null,       null,       null,        null,        null, 'T:r8'],
      //     [  null,       null,       null,       null,      null,        null,       null,       null,       null, null, null,       null,        null,        null,   null, 'P',  'T:r7', 'W:e9r7p1', 'W:e9r7p2', 'W:e9r7p3', null, null, 'W:e9r7p4', 'W:e9r7p5',       null,  'W:e9r7p6',  'W:e9r7p7', 'T:r7'],
      //     ['T:r8', 'W:e9r8p1', 'W:e9r8p2', 'W:e9r8p3', 'W:e9r8p4', 'W:e9r8p5',       null,       null,       null, null, null, 'W:e9r8p8',  'W:e9r8p9', 'W:e9r8p10', 'T:r8', 'P',  'T:r6', 'W:e9r6p1', 'W:e9r6p2', 'W:e9r6p3', null, null, 'W:e9r6p4', 'W:e9r6p5',  'W:e9r6p6', 'W:e9r6p7',  'W:e9r6p8', 'T:r6'],
      //     ['T:r7', 'W:e9r7p1', 'W:e9r7p2', 'W:e9r7p3', 'W:e9r7p4', 'W:e9r7p5', 'W:e9r7p6', 'W:e9r7p7', 'W:e9r7p8', null, null, 'W:e9r7p9', 'W:e9r7p10', 'W:e9r7p11', 'T:r7', 'P',  'T:r5', 'W:e9r5p1', 'W:e9r5p2', 'W:e9r5p3', null, null, 'W:e9r5p4', 'W:e9r5p5',  'W:e9r5p6', 'W:e9r5p7',  'W:e9r5p8', 'T:r5'],
      //     ['T:r6', 'W:e9r6p1', 'W:e9r6p2', 'W:e9r6p3', 'W:e9r6p4', 'W:e9r6p5',       null, 'W:e9r6p6', 'W:e9r6p7', null, null, 'W:e9r6p8',  'W:e9r6p9', 'W:e9r6p10', 'T:r6', 'P',  'T:r4', 'W:e9r4p1', 'W:e9r4p2', 'W:e9r4p3', null, null, 'W:e9r4p4', 'W:e9r4p5',  'W:e9r4p6', 'W:e9r4p7',  'W:e9r4p8', 'T:r4'],
      //     ['T:r5', 'W:e9r5p1', 'W:e9r5p2', 'W:e9r5p3', 'W:e9r5p4', 'W:e9r5p5', 'W:e9r5p6', 'W:e9r5p7', 'W:e9r5p8', null, null, 'W:e9r5p9', 'W:e9r5p10', 'W:e9r5p11', 'T:r5', 'P',  'T:r3', 'W:e9r3p1', 'W:e9r3p2', 'W:e9r3p3', null, null, 'W:e9r3p4', 'W:e9r3p5',        null, 'W:e9r3p7',  'W:e9r3p8', 'T:r3'],
      //     ['T:r4', 'W:e9r4p1', 'W:e9r4p2', 'W:e9r4p3', 'W:e9r4p4', 'W:e9r4p5',       null,       null,       null, null, null,       null,        null,        null, 'T:r4', 'P',  'T:r2',       null,       null,       null, null, null, 'W:e9r2p1', 'W:e9r2p2',        null,       null,        null, 'T:r2'],
      //     ['T:r3', 'W:e9r3p1', 'W:e9r3p2',       null,       null,       null,       null,       null,       null, null, null,       null,        null,        null, 'T:r3', 'P',  'T:r1',       null,       null,       null, null, null, 'W:e9r1p1', 'W:e9r1p2',        null,       null,        null, 'T:r1'],
      //     ['T:r2', 'W:e9r2p1', 'W:e9r2p2', 'W:e9r2p3', 'W:e9r2p4', 'W:e9r2p5',       null,       null,       null, null, null,       null,        null,        null, 'T:r2', 'P',    null,       null,       null,       null, null, null,       null,       null,        null,       null,        null,   null],
      //     ['T:r1', 'W:e9r1p1', 'W:e9r1p2', 'W:e9r1p3', 'W:e9r1p4', 'W:e9r1p5',       null,       null,       null, null, null,       null,        null,        null, 'T:r1', 'P',    null,       null,       null,       null, null, null,       null,       null,        null,       null,        null,   null],
      //   ],
      // }),
    ];
  }
}
