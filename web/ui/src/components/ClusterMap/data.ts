import { ClusterMap } from './types';

// prettier-ignore
export const CampusClusterMapData = {
  paris: {
    _data: {
      emoji: '🇫🇷',
      /**
       * clusterNames allow you to override the name of the cluster.
       */
      clusterNames: {
        e1: 'Metropolis',
        e2: 'Westeros',
        e3: 'Tatooine',
      },
      /**
       * clusterIdentifierValidator is a regex that validates
       * the cluster identifier. The regex is used to extract the cluster
       * from the identifier.
       */
      identifierValidator: /(e(?:1|2|3)).{4,5}/i,
      /** 
       * totalWorkspaces is the total number of workspaces in the cluster.
       */
      totalWorkspaces: {
        e1: 271,
        e2: 270,
        e3: 270,
      },
    },
    e1: {
      r13: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
      r12: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r11: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r10: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r9: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 'pillar', null, 14, 15, 16, 17, 18, 19, 20],
      r8: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 14, null, 15, 16, 17, 18, 19, 20, 21],
      r7: [1, 2, 3, 4, 5, 6, null, null, 7, 8, 9, 10, 11, 12, 13, 14, 15, null, 16, 17, 18, 19, 20, 21, 22],
      r6: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, 15, 16, 17, 18, 19, 20, 21],
      r5: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r4: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r3: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, 15, 16, 17, 18, 19, 20, 21],
      r2: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r1: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
    } as ClusterMap,
    e2: {
      r13: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
      r12: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r11: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r10: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r9: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 'pillar', null, 14, 15, 16, 17, 18, 19, 20],
      r8: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 14, null, 15, 16, 17, 18, 19, 20, 21],
      r7: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r6: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, null, 15, 16, 17, 18, 19, 20],
      r5: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, null, 17, 18, 19, 20, 21, 22],
      r4: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r3: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, 15, 16, 17, 18, 19, 20, 21],
      r2: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r1: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
    } as ClusterMap,
    e3: {
      r13: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
      r12: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r11: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r10: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r9: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 'pillar', null, 14, 15, 16, 17, 18, 19, 20],
      r8: [1, 2, 3, 4, 5, 6, null, null, 'pillar', 7, 8, 9, 10, 11, 12, 13, 14, null, 15, 16, 17, 18, 19, 20, 21],
      r7: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r6: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, null, 15, 16, 17, 18, 19, 20],
      r5: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, null, 17, 18, 19, 20, 21, 22],
      r4: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r3: [1, 2, 3, 4, 5, 6, 7, null, 'pillar', 8, 9, 10, 11, 12, 13, 14, 'pillar', null, 15, 16, 17, 18, 19, 20, 21],
      r2: [1, 2, 3, 4, 5, 6, 7, null, 8, 9, 10, 11, 12, 13, 14, 15, 16, null, 17, 18, 19, 20, 21, 22, 23],
      r1: [1, 2, 3, 4, 5, 6, 7, null, null, null, null, null, null, null, null, null, null, null, 8, 9, 10, 11, 12, 13, 14],
    } as ClusterMap,
  },
  helsinki: {
    _data: {
      emoji: '🇫🇮',
      /**
       * clusterNames allow you to override the name of the cluster.
       */
      clusterNames: {
        c1: 'Cluster 1',
        c2: 'Cluster 2',
        c3: 'Cluster 3',
      },
      /**
       * clusterIdentifierValidator is a regex that validates
       * the cluster identifier. The regex is used to extract the cluster
       * from the identifier.
       */
      identifierValidator: /(c(?:1|2|3)).{4,5}/i,
      /** 
       * totalWorkspaces is the total number of workspaces in the cluster.
       */
      totalWorkspaces: {
        c1: 79,
        c2: 76,
        c3: 32,
      },
    },
    c1: {
      r6: [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      r5: [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      r4: [null, null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, null, null, null, null, null, null, null],
      r3: [null, null, null, null, null, 1, 2, 3, null, 4, null, 5, null, 6, 7, 8, 9, null, null, null, null, null, null, null],
      r2: [null, null, null, null, null, 1, 2, null, null, null, null, null, null, 3, 4, 5, 6, null, null, null, null, null, null, null],
      r1: [null, null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, null, null, null, null, null, null, null],
    } as ClusterMap,
    c2: {
      r6: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      r5: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      r4: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12],
      r3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      r2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      r1: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12],
    } as ClusterMap,
    c3: {
      r5: [null, null, 1, 2, 3, 4, 5, 6, null, null],
      r4: [null, null, 1, 2, 3, 4, 5, 6, null, null],
      r3: [null, null, 1, 2, 3, 4, 5, 6, null, null],
      r2: [null, 1, 2, 3, 4, 5, 6, 7, null],
      r1: [null, 1, 2, 3, 4, 5, 6, 7, null],
    } as ClusterMap,
  },
  malaga: {
    _data: {
      emoji: '🇪🇸',
      /**
       * clusterNames allow you to override the name of the cluster.
       */
      clusterNames: {
        c1: 'Cluster 1',
        c2: 'Cluster 2',
        c3: 'Cluster 3',
      },
      /**
       * clusterIdentifierValidator is a regex that validates
       * the cluster identifier. The regex is used to extract the cluster
       * from the identifier.
       */
      identifierValidator: /(c(?:1|2|3)).{4,5}/i,
      /** 
       * totalWorkspaces is the total number of workspaces in the cluster.
       */
       totalWorkspaces: {
        c1: 90,
        c2: 60,
        c3: 60,
      },
    },
    c1: {
      r15: [null, 1, 2, 3, 4, 5, 6, null],
      r14: [null, 1, 2, 3, 4, 5, 6, null],
      r13: [null, 1, 2, 3, 4, 5, 6, null],
      r12: [null, 1, 2, 3, 4, 5, 6, null],
      r11: [null, 1, 2, 3, 4, 5, 6, null],
      r10: [null, 1, 2, 3, 4, 5, 6, null],
      r9: [null, 1, 2, 3, 4, 5, 6, null],
      r8: [null, 1, 2, 3, 4, 5, 6, null],
      r7: [null, 1, 2, 3, 4, 5, 6, null],
      r6: [null, 1, 2, 3, 4, 5, 6, null],
      r5: [null, 1, 2, 3, 4, 5, 6, null],
      r4: [null, 1, 2, 3, 4, 5, 6, null],
      r3: [null, 1, 2, 3, 4, 5, 6, null],
      r2: [null, 1, 2, 3, 4, 5, 6, null],
      r1: [null, 1, 2, 3, 4, 5, 6, null],
    } as ClusterMap,
    c2: {
      r10: [null, 1, 2, 3, 4, 5, 6, null],
      r9: [null, 1, 2, 3, 4, 5, 6, null],
      r8: [null, 1, 2, 3, 4, 5, 6, null],
      r7: [null, 1, 2, 3, 4, 5, 6, null],
      r6: [null, 1, 2, 3, 4, 5, 6, null],
      r5: [null, 1, 2, 3, 4, 5, 6, null],
      r4: [null, 1, 2, 3, 4, 5, 6, null],
      r3: [null, 1, 2, 3, 4, 5, 6, null],
      r2: [null, 1, 2, 3, 4, 5, 6, null],
      r1: [null, 1, 2, 3, 4, 5, 6, null],
    } as ClusterMap,
    c3: {
      r10: [null, 6, 5, 4, 3, 2, 1, null],
      r9: [null, 6, 5, 4, 3, 2, 1, null],
      r8: [null, 6, 5, 4, 3, 2, 1, null],
      r7: [null, 6, 5, 4, 3, 2, 1, null],
      r6: [null, 6, 5, 4, 3, 2, 1, null],
      r5: [null, 6, 5, 4, 3, 2, 1, null],
      r4: [null, 6, 5, 4, 3, 2, 1, null],
      r3: [null, 6, 5, 4, 3, 2, 1, null],
      r2: [null, 6, 5, 4, 3, 2, 1, null],
      r1: [null, 6, 5, 4, 3, 2, 1, null],
    } as ClusterMap,
  },
} as const;
