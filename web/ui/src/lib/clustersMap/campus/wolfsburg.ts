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
          ['T:s17', 'W:c1s15d73', 'W:c1s15d74', 'W:c1s15d75',null, null, null, 'T:s15'],
					['T:s16', 'W:c1s15d70', 'W:c1s15d71', 'W:c1s15d72',null,null, null, 'T:s15'],
          ['T:s15', 'W:c1s14d67', 'W:c1s14d68','W:c1s14d69', null, null, 'T:s14'],
          ['T:s14', 'W:c1s13d65', 'W:c1s13d66', null,null, null, 'T:s13'],
          ['T:s13', 'W:c1s13d60', 'W:c1s13d61', 'W:c1s13d62','W:c1s13d63','W:c1s13d64', 'T:s13'],
          ['T:s12', 'W:c1s12d55', 'W:c1s12d56', 'W:c1s12d57', 'W:c1s12d58', 'W:c1s12d59', 'T:s12'],
          ['T:s11', 'W:c1s11d50', 'W:c1s11d51', 'W:c1s11d52', 'W:c1s11d53', 'W:c1s11d54',  'T:s11'],
          ['T:s10', 'W:c1s10d45', 'W:c1s10d46', 'W:c1s10d47', 'W:c1s10d48', 'W:c1s10d49','T:s10'],
          ['T:s9',  'W:c1s9d40',  'W:c1s9d41','W:c1s9d42', 'W:c1s9d43', 'W:c1s9d44',   'T:s9' ],
          ['T:s8',  'W:c1s8d35',  'W:c1s8d36',  'W:c1s8d37',  'W:c1s8d38',  'W:c1s8d39', null,  'T:s8' ],
          ['T:s7',  'W:c1s7d30',  'W:c1s7d31',  'W:c1s7d32',  'W:c1s7d33',  'W:c1s7d34',  null,  'T:s7' ],
          ['T:s6',  'W:c1s6d25',  'W:c1s6d26',  'W:c1s6d27',  'W:c1s6d28',  'W:c1s6d29',  null,  'T:s6' ],
          ['T:s5',  'W:c1s5d20',  'W:c1s5d21',  'W:c1s5d22',  'W:c1s5d23',  'W:c1s5d24',  null,  'T:s5' ],
          ['T:s4',  'W:c1s4d15',  'W:c1s4d16',  'W:c1s4d17',  'W:c1s4d18',  'W:c1s4d19',  null,  'T:s4' ],
          ['T:s3',  'W:c1s3d9',  'W:c1s3d10',  'W:c1s3d11',  'W:c1s3d12',  'W:c1s3d13',  'W:c1s3d14',  'T:s3' ],
          ['T:s2',  'W:c1s2d3',  'W:c1s2d4',  'W:c1s2d5',  'W:c1s2d6',  'W:c1s2d7',  'W:c1s2d8',  'T:s2' ],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        totalWorkspaces: 129,
        // prettier-ignore
        map: [
          ['T:s19', 'W:c2s10d120', 'W:c2s10d121', 'W:c2s10d122', 'W:c2s10d123', 'W:c2s10d124', 'W:c2s10d125', 'W:c2s10d126', 'W:c2s10d127', 'W:c2s10d128', 'W:c2s10d129','T:s19'],
					['T:s18', 'W:c2s10d110', 'W:c2s10d111', 'W:c2s10d112', 'W:c2s10d113', 'W:c2s10d114', 'W:c2s10d115', 'W:c2s10d116', 'W:c2s10d117','W:c2s10d118','W:c2s10d119','T:s18'],
          ['T:s17', 'W:c2s10d100', 'W:c2s10d101', 'W:c2s10d102', 'W:c2s10d103', 'W:c2s10d104', 'W:c2s10d105', 'W:c2s10d106', 'W:c2s10d107', 'W:c2s10d108', 'W:c2s10d109','T:s17'],
					['T:s16', 'W:c2s10d90', 'W:c2s10d91', 'W:c2s10d92', 'W:c2s10d93', 'W:c2s10d94', 'W:c2s10d95', 'W:c2s10d96', 'W:c2s10d97','W:c2s10d98','W:c2s10d99','T:s16'],
          ['T:s15', 'W:c2s10d81', 'W:c2s10d82', 'W:c2s10d83', 'W:c2s10d84', 'W:c2s10d85', 'W:c2s10d86', 'W:c2s10d87', 'W:c2s10d88','W:c2s10d89','T:s15'],
          ['T:s14', 'W:c2s10d73', 'W:c2s10d74', 'W:c2s10d75', 'W:c2s10d76', 'W:c2s10d77', 'W:c2s10d78', 'W:c2s10d79', 'W:c2s10d80','T:s14'],
          ['T:s13', 'W:c2s10d65', 'W:c2s10d66', 'W:c2s10d67', 'W:c2s10d68', 'W:c2s10d69', 'W:c2s10d70', 'W:c2s10d71', 'W:c2s10d72','T:s13'],
          ['T:s12', 'W:c2s10d57', 'W:c2s10d58', 'W:c2s10d59', 'W:c2s10d60', 'W:c2s10d61', 'W:c2s10d62', 'W:c2s10d63', 'W:c2s10d64','T:s12'],
          ['T:s11', 'W:c2s10d49', 'W:c2s10d50', 'W:c2s10d51', 'W:c2s10d52', 'W:c2s10d53', 'W:c2s10d54', 'W:c2s10d55', 'W:c2s10d56','T:s11'],
					['T:s10', 'W:c2s10d41', 'W:c2s10d42', 'W:c2s10d43', 'W:c2s10d44', 'W:c2s10d45', 'W:c2s10d46', 'W:c2s10d47', 'W:c2s10d48','T:s10'],
          ['T:s9',  'W:c2s9d33',  'W:c2s9d34',  'W:c2s9d35',  'W:c2s9d36',  'W:c2s9d37',  'W:c2s9d38',  'W:c2s9d39' , 'W:c2s10d40','T:s9' ],
          ['T:s8',  'W:c2s8d25',  'W:c2s8d26',  'W:c2s8d27',  'W:c2s8d28',  'W:c2s8d29',  'W:c2s8d30',  'W:c2s8d31' , 'W:c2s8d32','T:s8' ],
          ['T:s7',  'W:c2s7d18', 'W:c2s7d19', 'W:c2s7d20','W:c2s7d21',  'W:c2s7d22', 'W:c2s7d23', 'W:c2s7d24', 'T:s7' ],
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