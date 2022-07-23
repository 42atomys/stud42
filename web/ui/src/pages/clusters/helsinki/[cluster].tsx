import {
  ClusterEmpty, ClusterPillar,
  ClusterRow, ClusterTableMap, ClusterWorkspace,
  ClusterWorkspaceWithUser,
  extractNode
} from '@components/ClusterMap';
import { ClusterContainer } from '@components/ClusterMap/ClusterContainer';
import { GetStaticProps, NextPage } from 'next';

type PageProps = {
  cluster: 'c1' | 'c2' | 'c3';
};

type Campus = {
  [key: string]: {
    [key: string]: (number | 'pillar' | null)[];
  };
};

// prettier-ignore
const clusters: Campus = {
  c1: {
    r6: [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    r5: [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    r4: [null, null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, null, null, null, null, null, null, null],
    r3: [null, null, null, null, null, 1, 2, 3, null, 4, null, 5, null, 6, 7, 8, 9, null, null, null, null, null, null, null],
    r2: [null, null, null, null, null, 1, 2, null, null, null, null, null, null, 3, 4, 5, 6, null, null, null, null, null, null, null],
    r1: [null, null, null, null, null, 1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, null, null, null, null, null, null, null],
  },
  c2: {
    r6: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    r5: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    r4: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12],
    r3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    r2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    r1: [1, 2, 3, 4, 5, 6, 7, 8, null, 9, 10, 11, 12],
  },
  c3: {
    r5: [1, 2, 3, 4, 5, 6],
    r4: [1, 2, 3, 4, 5, 6],
    r3: [1, 2, 3, 4, 5, 6],
    r2: [1, 2, 3, 4, 5, 6, 7],
    r1: [1, 2, 3, 4, 5, 6, 7],
  },
}

export const IndexPage: NextPage<PageProps> = ({ cluster }) => {
  const clusterRows = clusters[cluster];

  return (
    <ClusterContainer campus="Helsinki" cluster={cluster}>
      {({ locations, showPopup }) => (
        <ClusterTableMap>
          {Object.keys(clusterRows).map((row) => (
            <ClusterRow key={`cluster-row-${row}`} displayText={row}>
              {clusterRows[row].map((workspace, i) => {
                const key = `cluster-workspace-${row}-${workspace}-${i}`;

                if (workspace === null) return <ClusterEmpty key={key} />;
                if (workspace === 'pillar') return <ClusterPillar key={key} />;

                const identifier = `${cluster}${row}p${workspace}`;
                const loc = extractNode(locations, identifier);

                if (loc) {
                  return (
                    <ClusterWorkspaceWithUser
                      key={key}
                      identifier={identifier}
                      displayText={workspace.toString()}
                      location={loc}
                      onClick={({ currentTarget }, location) => {
                        showPopup({
                          location: location,
                          user: location.user,
                          position: currentTarget.getBoundingClientRect(),
                        });
                      }}
                    />
                  );
                }

                return (
                  <ClusterWorkspace
                    key={key}
                    identifier={identifier}
                    displayText={workspace.toString()}
                  />
                );
              })}
            </ClusterRow>
          ))}
        </ClusterTableMap>
      )}
    </ClusterContainer>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { cluster: 'c1' } },
      { params: { cluster: 'c2' } },
      { params: { cluster: 'c3' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params = {} }) => {
  const { cluster } = params;

  if (!cluster || ['c1', 'c2', 'c3'].includes(cluster as string) === false) {
    return { notFound: true };
  }

  return {
    props: {
      cluster,
    },
  };
};

export default IndexPage;
