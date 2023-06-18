import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Paris extends Campus implements ICampus {
  emoji = (): string => '🇫🇷';

  name = (): CampusNames => 'paris'

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
          ['T:r1',  'PW', 'PW', 'PW', 'PW', null, null, 'W:bess-f1r1s1', 'W:bess-f1r1s2', 'W:bess-f1r1s3', 'W:bess-f1r1s4', 'W:bess-f1r1s5', 'W:bess-f1r1s6', 'W:bess-f1r1s7', 'W:bess-f1r1s8', null, null, 'W:bess-f1r1s9', 'W:bess-f1r1s10', 'W:bess-f1r1s11', 'W:bess-f1r1s12', 'W:bess-f1r1s13', 'W:bess-f1r1s14',             null, 'T:r1'],
          ['T:r2',  'PW', 'PW', 'PW', 'PW', null, null,            null, 'W:bess-f1r2s1', 'W:bess-f1r2s2', 'W:bess-f1r2s3', 'W:bess-f1r2s4', 'W:bess-f1r2s5', 'W:bess-f1r2s6',            null, null, null, 'W:bess-f1r2s7',  'W:bess-f1r2s8',  'W:bess-f1r2s9', 'W:bess-f1r2s10', 'W:bess-f1r2s11', 'W:bess-f1r2s12',             null, 'T:r2'],
          ['T:r3',  'PW', 'PW', 'PW', 'PW', null, null, 'W:bess-f1r3s1', 'W:bess-f1r3s2', 'W:bess-f1r3s3', 'W:bess-f1r3s4', 'W:bess-f1r3s5', 'W:bess-f1r3s6', 'W:bess-f1r3s7', 'W:bess-f1r3s8', null, null, 'W:bess-f1r3s9', 'W:bess-f1r3s10', 'W:bess-f1r3s11', 'W:bess-f1r3s12', 'W:bess-f1r3s13', 'W:bess-f1r3s14',             null, 'T:r3'],
          ['T:r4',  null, null, null, null, null, null, 'W:bess-f1r4s1', 'W:bess-f1r4s2', 'W:bess-f1r4s3', 'W:bess-f1r4s4', 'W:bess-f1r4s5', 'W:bess-f1r4s6', 'W:bess-f1r4s7',            null, null, null, 'W:bess-f1r4s8',  'W:bess-f1r4s9', 'W:bess-f1r4s10', 'W:bess-f1r4s11', 'W:bess-f1r4s12', 'W:bess-f1r4s13', 'W:bess-f1r4s14', 'T:r4'],
          ['T:r5',  null, null, null, null, null, null,            null, 'W:bess-f1r5s1', 'W:bess-f1r5s2', 'W:bess-f1r5s3', 'W:bess-f1r5s4', 'W:bess-f1r5s5', 'W:bess-f1r5s6', 'W:bess-f1r5s7', null, null, 'W:bess-f1r5s8',  'W:bess-f1r5s9', 'W:bess-f1r5s10', 'W:bess-f1r5s11', 'W:bess-f1r5s12', 'W:bess-f1r5s13',             null, 'T:r5'],
          ['T:r6',  null, null, null, null, null, null,            null,            null,            null,            null,            null,            null,            null,            null, null, null, 'W:bess-f1r6s1',  'W:bess-f1r6s2',  'W:bess-f1r6s3',  'W:bess-f1r6s4',  'W:bess-f1r6s5',  'W:bess-f1r6s6',             null, 'T:r6'],
        ],
      }),
      new Cluster({
        identifier: 'bess-f2',
        name: 'Hyrule',
        totalWorkspaces: 100,
        // prettier-ignore
        map: [
          ['T:r1',  'W:bess-f2r1s1', 'W:bess-f2r1s2', 'W:bess-f2r1s3', 'W:bess-f2r1s4', 'W:bess-f2r1s5', 'W:bess-f2r1s6', null, null, 'W:bess-f2r1s7', 'W:bess-f2r1s8', 'W:bess-f2r1s9', 'W:bess-f2r1s10', 'W:bess-f2r1s11', 'W:bess-f2r1s12', 'W:bess-f2r1s13', 'W:bess-f2r1s14', null, null, 'W:bess-f2r1s15', 'W:bess-f2r1s16', 'W:bess-f2r1s17', 'W:bess-f2r1s18', 'W:bess-f2r1s19', 'W:bess-f2r1s20', 'W:bess-f2r1s21', 'T:r1'],
          ['T:r2',  'W:bess-f2r2s1', 'W:bess-f2r2s2', 'W:bess-f2r2s3', 'W:bess-f2r2s4', 'W:bess-f2r2s5', 'W:bess-f2r2s6', null, null,            null, 'W:bess-f2r2s7', 'W:bess-f2r2s8',  'W:bess-f2r2s9', 'W:bess-f2r2s10', 'W:bess-f2r2s11', 'W:bess-f2r2s12',             null, null, null, 'W:bess-f2r2s13', 'W:bess-f2r2s14', 'W:bess-f2r2s15', 'W:bess-f2r2s16', 'W:bess-f2r2s17', 'W:bess-f2r2s18',             null, 'T:r2'],
          ['T:r3',  'W:bess-f2r3s1', 'W:bess-f2r3s2', 'W:bess-f2r3s3', 'W:bess-f2r3s4', 'W:bess-f2r3s5', 'W:bess-f2r3s6', null, null, 'W:bess-f2r3s7', 'W:bess-f2r3s8', 'W:bess-f2r3s9', 'W:bess-f2r3s10', 'W:bess-f2r3s11', 'W:bess-f2r3s12', 'W:bess-f2r3s13', 'W:bess-f2r3s14', null, null, 'W:bess-f2r3s15', 'W:bess-f2r3s16', 'W:bess-f2r3s17', 'W:bess-f2r3s18', 'W:bess-f2r3s19', 'W:bess-f2r3s20',             null, 'T:r3'],
          ['T:r4',  'W:bess-f2r4s1', 'W:bess-f2r4s2', 'W:bess-f2r4s3', 'W:bess-f2r4s4', 'W:bess-f2r4s5', 'W:bess-f2r4s6', null, null, 'W:bess-f2r4s7', 'W:bess-f2r4s8', 'W:bess-f2r4s9', 'W:bess-f2r4s10', 'W:bess-f2r4s11', 'W:bess-f2r4s12', 'W:bess-f2r4s13',             null, null, null, 'W:bess-f2r4s14', 'W:bess-f2r4s15', 'W:bess-f2r4s16', 'W:bess-f2r4s17', 'W:bess-f2r4s18', 'W:bess-f2r4s19',             null, 'T:r4'],
          ['T:r5',             null,            null,            null, 'W:bess-f2r5s1', 'W:bess-f2r5s2', 'W:bess-f2r5s3', null, null,            null, 'W:bess-f2r5s4', 'W:bess-f2r5s5',  'W:bess-f2r5s6',  'W:bess-f2r5s7',  'W:bess-f2r5s8',  'W:bess-f2r5s9', 'W:bess-f2r5s10', null, null, 'W:bess-f2r5s11', 'W:bess-f2r5s12', 'W:bess-f2r5s13', 'W:bess-f2r5s14', 'W:bess-f2r5s15', 'W:bess-f2r5s16',             null, 'T:r5'],
          ['T:r6',             null,            null,            null,            null,            null,            null, null, null,            null,            null,            null,             null,             null,             null,             null,             null, null, null,  'W:bess-f2r6s1',  'W:bess-f2r6s2',  'W:bess-f2r6s3',  'W:bess-f2r6s4',  'W:bess-f2r6s5',  'W:bess-f2r6s6',             null, 'T:r6'],
        ],
      }),
      new Cluster({
        identifier: 'bess-f3',
        name: 'Turing',
        totalWorkspaces: 74,
        // prettier-ignore
        map: [
          ['T:r1',  null, null, null, null, null, null, 'W:bess-f3r1s1', 'W:bess-f3r1s2', 'W:bess-f3r1s3', 'W:bess-f3r1s4', 'W:bess-f3r1s5', 'W:bess-f3r1s6', 'W:bess-f3r1s7', 'W:bess-f3r1s8', null, null, 'W:bess-f3r1s9', 'W:bess-f3r1s10', 'W:bess-f3r1s11', 'W:bess-f3r1s12', 'W:bess-f3r1s13', 'W:bess-f3r1s14', 'W:bess-f3r1s15', 'T:r1'],
          ['T:r2',  null, null, null, null, null, null,            null, 'W:bess-f3r2s1', 'W:bess-f3r2s2', 'W:bess-f3r2s3', 'W:bess-f3r2s4', 'W:bess-f3r2s5', 'W:bess-f3r2s6',            null, null, null, 'W:bess-f3r2s7',  'W:bess-f3r2s8',  'W:bess-f3r2s9', 'W:bess-f3r2s10', 'W:bess-f3r2s11', 'W:bess-f3r2s12',            null, 'T:r2'],
          ['T:r3',  null, null, null, null, null, null, 'W:bess-f3r3s1', 'W:bess-f3r3s2', 'W:bess-f3r3s3', 'W:bess-f3r3s4', 'W:bess-f3r3s5', 'W:bess-f3r3s6', 'W:bess-f3r3s7', 'W:bess-f3r3s8', null, null, 'W:bess-f3r3s9', 'W:bess-f3r3s10', 'W:bess-f3r3s11', 'W:bess-f3r3s12', 'W:bess-f3r3s13', 'W:bess-f3r3s14',            null, 'T:r3'],
          ['T:r4',  null, null, null, null, null, null, 'W:bess-f3r4s1', 'W:bess-f3r4s2', 'W:bess-f3r4s3', 'W:bess-f3r4s4', 'W:bess-f3r4s5', 'W:bess-f3r4s6', 'W:bess-f3r4s7',            null, null, null, 'W:bess-f3r4s8',  'W:bess-f3r4s9', 'W:bess-f3r4s10', 'W:bess-f3r4s11', 'W:bess-f3r4s12', 'W:bess-f3r4s13',            null, 'T:r4'],
          ['T:r5',  null, null, null, null, null, null,            null, 'W:bess-f3r5s1', 'W:bess-f3r5s2', 'W:bess-f3r5s3', 'W:bess-f3r5s4', 'W:bess-f3r5s5', 'W:bess-f3r5s6', 'W:bess-f3r5s7', null, null, 'W:bess-f3r5s8',  'W:bess-f3r5s9', 'W:bess-f3r5s10', 'W:bess-f3r5s11', 'W:bess-f3r5s12', 'W:bess-f3r5s13',            null, 'T:r5'],
          ['T:r6',  null, null, null, null, null, null,            null,            null,            null,            null,            null,            null,            null,            null, null, null, 'W:bess-f3r6s1',  'W:bess-f3r6s2',  'W:bess-f3r6s3',  'W:bess-f3r6s4',  'W:bess-f3r6s5',  'W:bess-f3r6s6', 'W:bess-f3r6s7', 'T:r6'],
        ],
      }),
      new Cluster({
        identifier: 'bess-f4',
        name: 'Carthage',
        totalWorkspaces: 70,
        // prettier-ignore
        map: [
          ['T:r1',  null, null, null, null, null, null, 'W:bess-f4r1s1', 'W:bess-f4r1s2', 'W:bess-f4r1s3', 'W:bess-f4r1s4', 'W:bess-f4r1s5', 'W:bess-f4r1s6', 'W:bess-f4r1s7', 'W:bess-f4r1s8', null, null, 'W:bess-f4r1s9',  'W:bess-f4r1s10',  'W:bess-f4r1s11', 'W:bess-f4r1s12', 'W:bess-f4r1s13', 'W:bess-f4r1s14', 'T:r1'],
          ['T:r2',  null, null, null, null, null, null, 'W:bess-f4r2s1', 'W:bess-f4r2s2', 'W:bess-f4r2s3', 'W:bess-f4r2s4', 'W:bess-f4r2s5', 'W:bess-f4r2s6', 'W:bess-f4r2s7',            null, null, null, 'W:bess-f4r2s7',   'W:bess-f4r2s8',   'W:bess-f4r2s9', 'W:bess-f4r2s10', 'W:bess-f4r2s11', 'W:bess-f4r2s12', 'T:r2'],
          ['T:r3',  null, null, null, null, null, null, 'W:bess-f4r3s1', 'W:bess-f4r3s2', 'W:bess-f4r3s3', 'W:bess-f4r3s4', 'W:bess-f4r3s5', 'W:bess-f4r3s6', 'W:bess-f4r3s7', 'W:bess-f4r3s8', null, null, 'W:bess-f4r3s9',  'W:bess-f4r3s10',  'W:bess-f4r3s11', 'W:bess-f4r3s12', 'W:bess-f4r3s13', 'W:bess-f4r3s14', 'T:r3'],
          ['T:r4',  null, null, null, null, null, null, 'W:bess-f4r4s1', 'W:bess-f4r4s2', 'W:bess-f4r4s3', 'W:bess-f4r4s4', 'W:bess-f4r4s5', 'W:bess-f4r4s6', 'W:bess-f4r4s7',            null, null, null, 'W:bess-f4r4s8',   'W:bess-f4r4s9',  'W:bess-f4r4s10', 'W:bess-f4r4s11', 'W:bess-f4r4s12', 'W:bess-f4r4s13', 'T:r4'],
          ['T:r5',  null, null, null, null, null, null,            null,            null,            null, 'W:bess-f4r5s1', 'W:bess-f4r5s2', 'W:bess-f4r5s3', 'W:bess-f4r5s4', 'W:bess-f4r5s5', null, null, 'W:bess-f4r5s6',   'W:bess-f4r5s7',   'W:bess-f4r5s8',  'W:bess-f4r5s9', 'W:bess-f4r5s10', 'W:bess-f4r5s11', 'T:r5'],
          ['T:r6',  null, null, null, null, null, null,            null,            null,            null,            null,            null,            null,            null,            null, null, null, 'W:bess-f4r6s1',   'W:bess-f4r6s2',   'W:bess-f4r6s3',  'W:bess-f4r6s4',  'W:bess-f4r6s5',             null, 'T:r6'],
        ],
      }),
      new Cluster({
        identifier: 'paul-f3A',
        name: 'Pandora',
        totalWorkspaces: 70,
        // prettier-ignore
        map: [
          ['T:r9',             null,             null,             null,             null,             null,             null,             null,             null, null, null,             null,              null,  'W:paul-f3Ar9s1', 'T:r9'],
          ['T:r8',             null,             null,             null,             null,             null,             null,             null,             null, null, null, 'W:paul-f3Ar8s1',  'W:paul-f3Ar8s2',  'W:paul-f3Ar8s3', 'T:r8'],
          ['T:r7',             null,             null,             null,             null,             null,             null, 'W:paul-f3Ar7s1', 'W:paul-f3Ar7s2', null, null, 'W:paul-f3Ar7s3',  'W:paul-f3Ar7s4',  'W:paul-f3Ar7s5', 'T:r7'],
          ['T:r6',             null, 'W:paul-f3Ar6s1', 'W:paul-f3Ar6s2', 'W:paul-f3Ar6s3', 'W:paul-f3Ar6s4', 'W:paul-f3Ar6s5', 'W:paul-f3Ar6s6', 'W:paul-f3Ar6s7', null, null, 'W:paul-f3Ar6s8',  'W:paul-f3Ar6s9', 'W:paul-f3Ar6s10', 'T:r6'],
          ['T:r5', 'W:paul-f3Ar5s1', 'W:paul-f3Ar5s2', 'W:paul-f3Ar5s3', 'W:paul-f3Ar5s4', 'W:paul-f3Ar5s5', 'W:paul-f3Ar5s6', 'W:paul-f3Ar5s7', 'W:paul-f3Ar5s8', null, null, 'W:paul-f3Ar5s9', 'W:paul-f3Ar5s10', 'W:paul-f3Ar5s11', 'T:r5'],
          ['T:r4', 'W:paul-f3Ar4s1', 'W:paul-f3Ar4s2', 'W:paul-f3Ar4s3', 'W:paul-f3Ar4s4', 'W:paul-f3Ar4s5',             null, 'W:paul-f3Ar4s6', 'W:paul-f3Ar4s7', null, null, 'W:paul-f3Ar4s8',  'W:paul-f3Ar4s9', 'W:paul-f3Ar4s10', 'T:r4'],
          ['T:r3', 'W:paul-f3Ar3s1', 'W:paul-f3Ar3s2', 'W:paul-f3Ar3s3', 'W:paul-f3Ar3s4', 'W:paul-f3Ar3s5', 'W:paul-f3Ar3s6', 'W:paul-f3Ar3s7', 'W:paul-f3Ar3s8', null, null, 'W:paul-f3Ar3s9', 'W:paul-f3Ar3s10', 'W:paul-f3Ar3s11', 'T:r3'],
          ['T:r2', 'W:paul-f3Ar2s1', 'W:paul-f3Ar2s2', 'W:paul-f3Ar2s3', 'W:paul-f3Ar2s4', 'W:paul-f3Ar2s5',             null,             null,             null, null, null,             null,              null,              null, 'T:r2'],
          ['T:r1', 'W:paul-f3Ar1s1', 'W:paul-f3Ar1s2',             null,             null,             null,             null,             null,             null, null, null,             null,              null,              null, 'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'paul-f3B',
        name: 'The Citadel',
        totalWorkspaces: 52,
        // prettier-ignore
        map: [
          ['T:r10',  'W:paul-f3Br1s1',  'W:paul-f3Br1s2',             null, null, null,             null,             null,             null,             null,             null, 'T:r10'],
          [ 'T:r9',  'W:paul-f3Br9s1',  'W:paul-f3Br9s2', 'W:paul-f3Br9s3', null, null,             null,             null,             null,             null,             null,  'T:r9'],
          [ 'T:r8',  'W:paul-f3Br8s1',  'W:paul-f3Br8s2', 'W:paul-f3Br8s3', null, null,             null,             null,             null,             null,             null,  'T:r8'],
          [ 'T:r7',  'W:paul-f3Br7s1',  'W:paul-f3Br7s2', 'W:paul-f3Br7s3', null, null, 'W:paul-f3Br7s4', 'W:paul-f3Br7s5',             null, 'W:paul-f3Br7s6', 'W:paul-f3Br7s7',  'T:r7'],
          [ 'T:r6',  'W:paul-f3Br6s1',  'W:paul-f3Br6s2', 'W:paul-f3Br6s3', null, null, 'W:paul-f3Br6s4', 'W:paul-f3Br6s5', 'W:paul-f3Br6s6', 'W:paul-f3Br6s7', 'W:paul-f3Br6s8',  'T:r6'],
          [ 'T:r5',  'W:paul-f3Br5s1',  'W:paul-f3Br5s2', 'W:paul-f3Br5s3', null, null, 'W:paul-f3Br5s4', 'W:paul-f3Br5s5', 'W:paul-f3Br5s6', 'W:paul-f3Br5s7', 'W:paul-f3Br5s8',  'T:r5'],
          [ 'T:r4',  'W:paul-f3Br4s1',  'W:paul-f3Br4s2', 'W:paul-f3Br4s3', null, null, 'W:paul-f3Br4s4', 'W:paul-f3Br4s5', 'W:paul-f3Br4s6', 'W:paul-f3Br4s7', 'W:paul-f3Br4s8',  'T:r4'],
          [ 'T:r3',  'W:paul-f3Br3s1',  'W:paul-f3Br3s2', 'W:paul-f3Br3s3', null, null, 'W:paul-f3Br3s4', 'W:paul-f3Br3s5',             null, 'W:paul-f3Br3s6', 'W:paul-f3Br3s7',  'T:r3'],
          [ 'T:r2',              null,              null,             null, null, null, 'W:paul-f3Br2s1', 'W:paul-f3Br2s2',             null,             null,             null,  'T:r2'],
          [ 'T:r1',              null,              null,             null, null, null, 'W:paul-f3Br1s1', 'W:paul-f3Br1s2',             null,             null,             null,  'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'paul-f4A',
        name: 'The Grid',
        totalWorkspaces: 57,
        // prettier-ignore
        map: [
          ['T:r8', 'W:paul-f4Ar8s1', 'W:paul-f4Ar8s2', 'W:paul-f4Ar8s3', 'W:paul-f4Ar8s4', 'W:paul-f4Ar8s5',             null,             null,             null, null, null, 'W:paul-f4Ar8s8',  'W:paul-f4Ar8s9', 'W:paul-f4Ar8s10', 'T:r8'],
          ['T:r7', 'W:paul-f4Ar7s1', 'W:paul-f4Ar7s2', 'W:paul-f4Ar7s3', 'W:paul-f4Ar7s4', 'W:paul-f4Ar7s5', 'W:paul-f4Ar7s6', 'W:paul-f4Ar7s7', 'W:paul-f4Ar7s8', null, null, 'W:paul-f4Ar7s9', 'W:paul-f4Ar7s10', 'W:paul-f4Ar7s11', 'T:r7'],
          ['T:r6', 'W:paul-f4Ar6s1', 'W:paul-f4Ar6s2', 'W:paul-f4Ar6s3', 'W:paul-f4Ar6s4', 'W:paul-f4Ar6s5',             null, 'W:paul-f4Ar6s6', 'W:paul-f4Ar6s7', null, null, 'W:paul-f4Ar6s8',  'W:paul-f4Ar6s9', 'W:paul-f4Ar6s10', 'T:r6'],
          ['T:r5', 'W:paul-f4Ar5s1', 'W:paul-f4Ar5s2', 'W:paul-f4Ar5s3', 'W:paul-f4Ar5s4', 'W:paul-f4Ar5s5', 'W:paul-f4Ar5s6', 'W:paul-f4Ar5s7', 'W:paul-f4Ar5s8', null, null, 'W:paul-f4Ar5s9', 'W:paul-f4Ar5s10', 'W:paul-f4Ar5s11', 'T:r5'],
          ['T:r4', 'W:paul-f4Ar4s1', 'W:paul-f4Ar4s2', 'W:paul-f4Ar4s3', 'W:paul-f4Ar4s4', 'W:paul-f4Ar4s5',             null,             null,                   null, null,             null,             null,               null, 'T:r4'],
          ['T:r3', 'W:paul-f4Ar3s1', 'W:paul-f4Ar3s2',             null,             null,             null,             null,             null,                   null, null,             null,             null,               null, 'T:r3'],
          ['T:r2', 'W:paul-f4Ar2s1', 'W:paul-f4Ar2s2', 'W:paul-f4Ar2s3', 'W:paul-f4Ar2s4', 'W:paul-f4Ar2s5',             null,             null,                   null, null,             null,             null,               null, 'T:r2'],
          ['T:r1', 'W:paul-f4Ar1s1', 'W:paul-f4Ar1s2', 'W:paul-f4Ar1s3', 'W:paul-f4Ar1s4', 'W:paul-f4Ar1s5',             null,             null,                   null, null,             null,             null,               null, 'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'paul-f4B',
        name: 'The Upside',
        totalWorkspaces: 48,
        // prettier-ignore
        map: [
          ['T:r9', 'W:paul-f4Br9s1', 'W:paul-f4Br9s2', 'W:paul-f4Br9s3', null, null,             null,             null,             null,             null,             null, 'T:r9'],
          ['T:r8', 'W:paul-f4Br8s1', 'W:paul-f4Br8s2', 'W:paul-f4Br8s3', null, null,             null,             null,             null,             null,             null, 'T:r8'],
          ['T:r7', 'W:paul-f4Br7s1', 'W:paul-f4Br7s2', 'W:paul-f4Br7s3', null, null, 'W:paul-f4Br7s4', 'W:paul-f4Br7s5',             null, 'W:paul-f4Br7s6', 'W:paul-f4Br7s7', 'T:r7'],
          ['T:r6', 'W:paul-f4Br6s1', 'W:paul-f4Br6s2', 'W:paul-f4Br6s3', null, null, 'W:paul-f4Br6s4', 'W:paul-f4Br6s5', 'W:paul-f4Br6s6', 'W:paul-f4Br6s7', 'W:paul-f4Br6s8', 'T:r6'],
          ['T:r5', 'W:paul-f4Br5s1', 'W:paul-f4Br5s2', 'W:paul-f4Br5s3', null, null, 'W:paul-f4Br5s4', 'W:paul-f4Br5s5', 'W:paul-f4Br5s6', 'W:paul-f4Br5s7', 'W:paul-f4Br5s8', 'T:r5'],
          ['T:r4', 'W:paul-f4Br4s1', 'W:paul-f4Br4s2', 'W:paul-f4Br4s3', null, null, 'W:paul-f4Br4s4', 'W:paul-f4Br4s5', 'W:paul-f4Br4s6', 'W:paul-f4Br4s7', 'W:paul-f4Br4s8', 'T:r4'],
          ['T:r3', 'W:paul-f4Br3s1', 'W:paul-f4Br3s2', 'W:paul-f4Br3s3', null, null, 'W:paul-f4Br3s4', 'W:paul-f4Br3s5',             null, 'W:paul-f4Br3s7', 'W:paul-f4Br3s8', 'T:r3'],
          ['T:r2',             null,             null,             null, null, null, 'W:paul-f4Br2s1', 'W:paul-f4Br2s2',             null,             null,             null, 'T:r2'],
          ['T:r1',             null,             null,             null, null, null, 'W:paul-f4Br1s1', 'W:paul-f4Br1s2',             null,             null,             null, 'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'paul-f5A',
        name: 'Hogwarts',
        totalWorkspaces: 30,
        // prettier-ignore
        map: [
          ['T:r6',             null,             null,             null,             null,             null,             null,             null,             null,  null, null,             null, 'W:paul-f5Ar6s1',  'W:paul-f5Ar6s2', 'T:r6'],
          ['T:r5',             null,             null,             null,             null,             null,             null,             null,             null,  null, null, 'W:paul-f5Ar5s1', 'W:paul-f5Ar5s2',  'W:paul-f5Ar5s3', 'T:r5'],
          ['T:r4',             null,             null,             null,             null,             null,             null, 'W:paul-f5Ar4s1', 'W:paul-f5Ar4s2',  null, null, 'W:paul-f5Ar4s3', 'W:paul-f5Ar4s4',  'W:paul-f5Ar4s5', 'T:r4'],
          ['T:r3',             null, 'W:paul-f5Ar3s1', 'W:paul-f5Ar3s2', 'W:paul-f5Ar3s3', 'W:paul-f5Ar3s4', 'W:paul-f5Ar3s5', 'W:paul-f5Ar3s6', 'W:paul-f5Ar3s7',  null, null, 'W:paul-f5Ar3s8', 'W:paul-f5Ar3s9', 'W:paul-f5Ar3s10', 'T:r3'],
          ['T:r2', 'W:paul-f5Ar3s1', 'W:paul-f5Ar3s2', 'W:paul-f5Ar3s3', 'W:paul-f5Ar3s4', 'W:paul-f5Ar3s5',             null,             null,             null,  null, null,             null,             null,              null, 'T:r2'],
          ['T:r1', 'W:paul-f5Ar1s1', 'W:paul-f5Ar1s2', 'W:paul-f5Ar1s3', 'W:paul-f5Ar1s4', 'W:paul-f5Ar1s5',             null,             null,             null,  null, null,             null,             null,              null, 'T:r1'],
        ],
      }),
      new Cluster({
        identifier: 'paul-f5B',
        name: 'Cyberdyne',
        totalWorkspaces: 32,
        // prettier-ignore
        map: [
          ['T:r6', 'W:paul-f5Br6s1', 'W:paul-f5Br6s2', 'W:paul-f5Br6s3', null, null, 'W:paul-f5Br6s4', 'W:paul-f5Br6s5', 'W:paul-f5Br6s6', 'W:paul-f5Br6s7', 'T:r6'],
          ['T:r5', 'W:paul-f5Br5s1', 'W:paul-f5Br5s2', 'W:paul-f5Br5s3', null, null, 'W:paul-f5Br5s4', 'W:paul-f5Br5s5', 'W:paul-f5Br5s6', 'W:paul-f5Br5s7', 'T:r5'],
          ['T:r4', 'W:paul-f5Br4s1', 'W:paul-f5Br4s2', 'W:paul-f5Br4s3', null, null, 'W:paul-f5Br4s4', 'W:paul-f5Br4s5', 'W:paul-f5Br4s6', 'W:paul-f5Br4s7', 'T:r4'],
          ['T:r3', 'W:paul-f5Br3s1', 'W:paul-f5Br3s2', 'W:paul-f5Br3s3', null, null, 'W:paul-f5Br3s4', 'W:paul-f5Br3s5',             null, 'W:paul-f5Br3s6', 'T:r3'],
          ['T:r2',             null,             null,             null, null, null,             null, 'W:paul-f5Br2s1',             null, 'W:paul-f5Br2s2', 'T:r2'],
          ['T:r1',             null,             null,             null, null, null,             null, 'W:paul-f5Br1s1', 'W:paul-f5Br1s2', 'W:paul-f5Br1s3', 'T:r1'],
        ],
      }),
    ];
  }
}
