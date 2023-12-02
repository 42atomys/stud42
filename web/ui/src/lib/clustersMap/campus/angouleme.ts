import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { ICampus } from '../types';

//
export class Angouleme extends Campus implements ICampus {
  emoji = (): string => '🇫🇷';

  name = (): string => 'Angouleme';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>c(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'c1',
        name : "The silent one",
        map: [
          ['T:A', 'W:1A1', 'W:1A2', 'W:1A3', 'W:1A4', 'W:1A5', 'W:1A6', 'W:1A7', 'T:A'],
          ['T:B', 'W:1B1', 'W:1B2', 'W:1B3',  null,   'W:1B4', 'W:1B5', 'W:1B6', 'T:B'],
          ['T:C', 'W:1C1', 'W:1C2', 'W:1C3', 'W:1C4', 'W:1C5', 'W:1C6', 'W:1C7', 'T:C'],
          ['T:D', 'W:1D1', 'W:1D2', 'W:1D3',  null,   'W:1D4', 'W:1D5', 'W:1D6', 'T:D'],
          ['T:E', 'W:1E1', 'W:1E2', 'W:1E3', 'W:1E4', 'W:1E5', 'W:1E6', 'W:1E7', 'T:E'],
          ['T:F', 'W:1F1', 'W:1F2', 'W:1F3',  null,   'W:1F4', 'W:1F5', 'W:1F6', 'T:F'],
          ['T:G', 'W:1G1', 'W:1G2', 'W:1G3', 'W:1G4', 'W:1G5', 'W:1G6', 'W:1G7', 'T:G'],
          ['T:H', 'W:1H1', 'W:1H2', 'W:1H3', 'W:1H4', 'W:1H5', 'W:1H6', 'W:1H7', 'T:H'],
        ],
      }),
      new Cluster({
        identifier: 'c2',
        name : "The very cool one",
        map: [
          ['T:A', 'W:2A1', 'W:2A2', 'W:2A3','W:2A4', null, null, 'W:2A5', 'W:2A6', 'W:2A7' ,'T:A'],
          ['T:B', 'W:2B1', 'W:2B2', 'W:2B3','W:2B4', null, null, 'W:2B5', 'W:2B6', 'W:2B7' ,'T:B'],
          ['T:C', 'W:2C1', 'W:2C2', 'W:2C3','W:2C4', null, null, 'W:2C5', 'W:2C6', 'W:2C7' ,'T:C'],
          [null,   null,    null,    null,   null,   null, null,  null,    null,    null,    null],
          [null,   null,    null,    null,   null,   null, null,  null,    null,    null,    null],
          ['T:D', 'W:2D1', 'W:2D2', 'W:2D3','W:2D4', null, null, 'W:2D5', 'W:2D6', 'W:2D7' ,'T:D'],
          ['T:E', 'W:2E1', 'W:2E2', 'W:2E3','W:2E4', null, null, 'W:2E5', 'W:2E6', 'W:2E7' ,'T:E'],
          ['T:F', 'W:2F1', 'W:2F2', 'W:2F3','W:2F4', null, null, 'W:2F5', 'W:2F6', 'W:2F7' ,'T:F'],
          ['T:G', 'W:2G1', 'W:2G2', 'W:2G3','W:2G4', null, null, 'W:2G5', 'W:2G6', 'W:2G7' ,'T:G'],
        ],
      }),
      new Cluster({
        identifier: 'c3',
        name : "The best, when it's cold",
        // prettier-ignore
        map: [
          ['T:A', 'W:3A1', 'W:3A2', 'W:3A3', 'W:3A4', null, null, 'W:3A5', 'W:3A6' ,'W:3A7' , 'T:A'],
          ['T:B', 'W:3B1', 'W:3B2', 'W:3B3', 'W:3B4', null, null, 'W:3B5', 'W:3B6' ,'W:3B7' , 'T:B'],
          [null,   null,    null,    null,    null,   null, null,  null,    null,    null,     null],
          ['T:C', 'W:3C1', 'W:3C2', 'W:3C3', 'W:3C4', null, null, 'W:3C5', 'W:3C6' ,'W:3C7' , 'T:C'],
          ['T:D', 'W:3D1', 'W:3D2', 'W:3D3', 'W:3D4', null, null, 'W:3D5', 'W:3D6' ,'W:3D7' , 'T:D'],
          [null,   null,    null,    null,    null,   null, null,  null,    null,    null,     null],
          ['T:E', 'W:3E1', 'W:3E2', 'W:3E3', 'W:3E4', null, null, 'W:3E5', 'W:3E6' ,'W:3E7' , 'T:E'],
          ['T:F', 'W:3F1', 'W:3F2', 'W:3F3', 'W:3F4', null, null, 'W:3F5', 'W:3F6' ,'W:3F7' , 'T:F'],
          ['T:G', 'W:3G1', 'W:3G2', 'W:3G3', 'W:3G4', null, null, 'W:3G5', 'W:3G6' ,'W:3G7' , 'T:G'],
        ],
      }),
    ];
  }
}
