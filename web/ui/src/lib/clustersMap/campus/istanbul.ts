import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus, ICluster } from '../types';

export class Istanbul extends Campus implements ICampus {
    emoji = (): string => '🇹🇷';

    name = (): CampusNames => 'istanbul';

    extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>e(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

    clusters(): ICluster[] {
        return [

            new Cluster({
                identifier: 'k1',
                name: 'Front End',
                totalWorkspaces: 44,
                map: [
                    ['T:r1',  'W:k1m01s01', 'W:k1m01s02', 'W:k1m01s03', 'W:k1m01s04', 'W:k1m01s05', 'W:k1m01s06', 'W:k1m01s07', 'W:k1m01s08',  'W:k1m01s09',  'W:k1m01s10', 'W:k1m01s11', 'T:r1'],
                    ['T:r2',  'W:k1m02s02', 'W:k1m02s02', 'W:k1m02s03', 'W:k1m02s04', 'W:k1m02s05', 'W:k1m02s06', 'W:k1m02s07', 'W:k1m02s08',  'W:k1m02s09',  'W:k1m02s10', 'W:k1m02s11', 'T:r2'],
                    ['T:r3',  'W:k1m03s03', 'W:k1m03s02', 'W:k1m03s03', 'W:k1m03s04', 'W:k1m03s05', 'W:k1m03s06', 'W:k1m03s07', 'W:k1m03s08',  'W:k1m03s09',  'W:k1m03s10', 'W:k1m03s11', 'T:r3'],
                    ['T:r4',  'W:k1m04s04', 'W:k1m04s02', 'W:k1m04s03', 'W:k1m04s04', 'W:k1m04s05', 'W:k1m04s06', 'W:k1m04s07', 'W:k1m04s08',  'W:k1m04s09',  'W:k1m04s10', 'W:k1m04s11', 'T:r4'],
                ]
            }),
            new Cluster({
                identifier: 'k1',
                name: 'Full Stack',
                totalWorkspaces: 241,
                map: [
                    ['T:r28', 'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r28'],
                    ['T:r27', 'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r27'],
                    ['T:r26',  null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r26'],
                    ['T:r25',  null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r25'],
                    ['T:r24', 'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r24'],
                    ['T:r23', 'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r23'],
                    ['T:r22', 'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r22'],
                    ['T:r21',  null,         null,        'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r21'],
                    ['T:r20',  null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r20'],
                    ['T:r19',  null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r19'],
                    ['T:r18',  null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r18'],
                    ['T:r17',  null,         null,        'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r17'],
                    ['T:r16',  null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r16'],
                    ['T:r15',  null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r15'],
                    ['T:r14',  null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r14'],
                    ['T:r13',  null,         null,        'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r13'],
                    ['T:r12',  null,         null,         null,        null,       'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r12'],
                    ['T:r11',  null,         null,         null,        null,       'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r11'],
                    ['T:r10', 'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r10'],
                    ['T:r9',  'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r9'],
                    ['T:r8',   null,        'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r8'],
                    ['T:r7',  'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r7'],
                    ['T:r6',  'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r6'],
                    ['T:r5',  'W:k2m28s11', 'W:k2m28s10', 'W:k2m28s9', 'W:k2m28s8', 'W:k2m28s7', 'W:k2m28s6', 'W:k2m28s5', 'W:k2m28s4',  'W:k2m28s3',  'W:k2m28s2', 'W:k2m28s1', 'T:r5'],
                ],
            }),
            new Cluster({
                identifier: 'k2',
                name: "Back End",
                totalWorkspaces: 115,
                map: [
                    ['T:r29',  'W:k2m29s01', 'W:k2m29s02', 'W:k2m29s03', 'W:k2m29s02', 'W:k2m29s05', 'W:k2m29s06',  null,         null,          null,          null,         null,        'T:r29'],
                    ['T:r30',  'W:k2m30s01', 'W:k2m30s02', 'W:k2m30s03', 'W:k2m30s02', 'W:k2m30s05', 'W:k2m30s06', 'W:k2m30s07', 'W:k2m30s08',  'W:k2m30s09',  'W:k2m30s10', 'W:k2m30s11', 'T:r30'],
                    ['T:r31',  'W:k2m31s01', 'W:k2m31s02', 'W:k2m31s03', 'W:k2m31s02', 'W:k2m31s05', 'W:k2m31s06', 'W:k2m31s07', 'W:k2m31s08',  'W:k2m31s09',   null,         null,        'T:r31'],
                    ['T:r32',  'W:k2m32s01', 'W:k2m32s02', 'W:k2m32s03', 'W:k2m32s02', 'W:k2m32s05', 'W:k2m32s06', 'W:k2m32s07', 'W:k2m32s08',  'W:k2m32s09',  'W:k2m32s10', 'W:k2m32s11', 'T:r32'],
                    ['T:r33',  'W:k2m33s01', 'W:k2m33s02', 'W:k2m33s03', 'W:k2m33s02', 'W:k2m33s05', 'W:k2m33s06', 'W:k2m33s07', 'W:k2m33s08',  'W:k2m33s09',  'W:k2m33s10', 'W:k2m33s11', 'T:r33'],
                    ['T:r34',  'W:k2m34s01', 'W:k2m34s02', 'W:k2m34s03', 'W:k2m34s02', 'W:k2m34s05', 'W:k2m34s06', 'W:k2m34s07', 'W:k2m34s08',  'W:k2m34s09',  'W:k2m34s10', 'W:k2m34s11', 'T:r34'],
                    ['T:r35',  'W:k2m35s01', 'W:k2m35s02', 'W:k2m35s03', 'W:k2m35s02', 'W:k2m35s05', 'W:k2m35s06', 'W:k2m35s07', 'W:k2m35s08',  'W:k2m35s09',  'W:k2m35s10', 'W:k2m35s11', 'T:r35'],
                    ['T:r36',  'W:k2m36s01', 'W:k2m36s02', 'W:k2m36s03', 'W:k2m36s02',  null,         null,         null,         null,          null,          null,         null,        'T:r36'],
                    ['T:r37',  'W:k2m37s01', 'W:k2m37s02', 'W:k2m37s03', 'W:k2m37s02', 'W:k2m37s05', 'W:k2m37s06',  null,         null,          null,          null,         null,        'T:r37'],
                    ['T:r38',  'W:k2m38s01', 'W:k2m38s02', 'W:k2m38s03', 'W:k2m38s02', 'W:k2m38s05', 'W:k2m38s06',  null,         null,          null,          null,         null,        'T:r38'],
                    ['T:r39',  'W:k2m39s01', 'W:k2m39s02', 'W:k2m39s03', 'W:k2m39s02', 'W:k2m39s05', 'W:k2m39s06',  null,         null,          null,          null,         null,        'T:r39'],
                    ['T:r40',  'W:k2m40s01', 'W:k2m40s02', 'W:k2m40s03', 'W:k2m40s02', 'W:k2m40s05',  null,         null,         null,          null,          null,         null,        'T:r40'],
                    ['T:r41',  'W:k2m41s01', 'W:k2m41s02', 'W:k2m41s03', 'W:k2m41s02', 'W:k2m41s05', 'W:k2m41s06',  null,         null,          null,          null,         null,        'T:r41'],
                    ['T:r42',  'W:k2m42s01', 'W:k2m42s02', 'W:k2m42s03', 'W:k2m42s02', 'W:k2m42s05', 'W:k2m42s06',  null,         null,          null,          null,         null,        'T:r42'],
                    ['T:r43',  'W:k2m43s01', 'W:k2m43s02', 'W:k2m43s03', 'W:k2m43s02', 'W:k2m43s05', 'W:k2m43s06',  null,         null,          null,          null,         null,        'T:r43'],
                ],
            }),
        ];
    }
}