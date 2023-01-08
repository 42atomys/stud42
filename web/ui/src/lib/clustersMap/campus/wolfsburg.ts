import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { CampusNames, ICampus } from '../types';

//
export class Malaga extends Campus implements ICampus {
  emoji = (): string => '🇩🇪';

  name = (): CampusNames => 'wolfsburg';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        totalWorkspaces: 75,
        // prettier-ignore
        map: [
          ['T:s17', 'W:c1s15d1', 'W:c1s15d2', 'W:c1s15d3', 'W:c1s15d4', 'W:c1s15d5', 'W:c1s15d6', 'T:s15'],
          ['T:s16', 'W:c1s15d1', 'W:c1s15d2', 'W:c1s15d3', 'W:c1s15d4', 'W:c1s15d5', 'W:c1s15d6', 'T:s15'],
					['T:s15', 'W:c1s15d1', 'W:c1s15d2', 'W:c1s15d3', 'W:c1s15d4', 'W:c1s15d5', 'W:c1s15d6', 'T:s15'],
          ['T:s14', 'W:c1s14d1', 'W:c1s14d2', 'W:c1s14d3', 'W:c1s14d4', 'W:c1s14d5', 'W:c1s14d6', 'T:s14'],
          ['T:s13', 'W:c1s13d1', 'W:c1s13d2', 'W:c1s13d3', 'W:c1s13d4', 'W:c1s13d5', 'W:c1s13d6', 'T:s13'],
          ['T:s12', 'W:c1s12d1', 'W:c1s12d2', 'W:c1s12d3', 'W:c1s12d4', 'W:c1s12d5', 'W:c1s12d6', 'T:s12'],
          ['T:s11', 'W:c1s11d1', 'W:c1s11d2', 'W:c1s11d3', 'W:c1s11d4', 'W:c1s11d5', 'W:c1s11d6', 'T:s11'],
          ['T:s10', 'W:c1s10d1', 'W:c1s10d2', 'W:c1s10d3', 'W:c1s10d4', 'W:c1s10d5', 'W:c1s10d6', 'T:s10'],
          ['T:s9',  'W:c1s9d1',  'W:c1s9d2',  'W:c1s9d3',  'W:c1s9d4',  'W:c1s9d5',  'W:c1s9d6',  'T:s9' ],
          ['T:s8',  'W:c1s8d1',  'W:c1s8d2',  'W:c1s8d3',  'W:c1s8d4',  'W:c1s8d5',  'W:c1s8d6',  'T:s8' ],
          ['T:s7',  'W:c1s7d1',  'W:c1s7d2',  'W:c1s7d3',  'W:c1s7d4',  'W:c1s7d5',  'W:c1s7d6',  'T:s7' ],
          ['T:s6',  'W:c1s6d1',  'W:c1s6d2',  'W:c1s6d3',  'W:c1s6d4',  'W:c1s6d5',  'W:c1s6d6',  'T:s6' ],
          ['T:s5',  'W:c1s5d1',  'W:c1s5d2',  'W:c1s5d3',  'W:c1s5d4',  'W:c1s5d5',  'W:c1s5d6',  'T:s5' ],
          ['T:s4',  'W:c1s4d1',  'W:c1s4d2',  'W:c1s4d3',  'W:c1s4d4',  'W:c1s4d5',  'W:c1s4d6',  'T:s4' ],
          ['T:s3',  'W:c1s3d1',  'W:c1s3d2',  'W:c1s3d3',  'W:c1s3d4',  'W:c1s3d5',  'W:c1s3d6',  'T:s3' ],
          ['T:s2',  'W:c1s2d1',  'W:c1s2d2',  'W:c1s2d3',  'W:c1s2d4',  'W:c1s2d5',  'W:c1s2d6',  'T:s2' ],
          ['T:s1',  'W:c1s1d1',  'W:c1s1d2',  'W:c1s1d3',  'W:c1s1d4',  'W:c1s1d5',  'W:c1s1d6',  'T:s1' ],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        totalWorkspaces: 129,
        // prettier-ignore
        map: [
          ['T:s19', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
					['T:s18', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
          ['T:s17', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
					['T:s16', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
          ['T:s15', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
          ['T:s14', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
          ['T:s13', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
          ['T:s12', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
          ['T:s11', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
					['T:s10', 'W:c2s10d1', 'W:c2s10d2', 'W:c2s10d3', 'W:c2s10d4', 'W:c2s10d5', 'W:c2s10d6', 'T:s10'],
          ['T:s9',  'W:c2s9d1',  'W:c2s9d2',  'W:c2s9d3',  'W:c2s9d4',  'W:c2s9d5',  'W:c2s9d6',  'T:s9' ],
          ['T:s8',  'W:c2s8d1',  'W:c2s8d2',  'W:c2s8d3',  'W:c2s8d4',  'W:c2s8d5',  'W:c2s8d6',  'T:s8' ],
          ['T:s7',  'W:c2s7d18', 'W:c2s7d19', 'W:c2s7d20','W:c2s7d21',  'W:c2s7d22', 'W:c2s7d23', 'T:s7' ],
          ['T:s6',  'W:c2s6d15',  'W:c2s6d16', 'W:c2s6d17',  null, 				 null,  			null,		  'T:s6'],
          ['T:s5',  'W:c2s5d12',  'W:c2s5d13', 'W:c2s5d14',  null, 				null, 			 null, 		  'T:s5' ],
          ['T:s4',  'W:c2s4d9',  'W:c2s4d10',  'W:c2s4d11',  'W:c2s4d4',  'W:c2s4d5',  'W:c2s4d6', 'T:s4' ],
          ['T:s3',  'W:c2s3d6',  'W:c2s3d7',  'W:c2s3d8',  		null,  			 null,  			null, 		'T:s3' ],
          ['T:s2',  'W:c2s2d3',  'W:c2s2d4',  'W:c2s2d5',  		null,  			 null, 			  null, 		'T:s2' ],
					['T:s1',  'W:c2s1d1',  'W:c2s1d2',     null, 				null,        null,        null, 		'T:s1' ],
        ],
      })
   ];
  }
}