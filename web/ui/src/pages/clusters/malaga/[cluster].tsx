import {
  ClusterEmpty,
  ClusterPillar,
  ClusterRow,
  ClusterTableMap,
  ClusterWorkspace,
  ClusterWorkspaceWithUser,
  extractNode,
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
  },
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
  },
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
  },
}

export const IndexPage: NextPage<PageProps> = ({ cluster }) => {
  const clusterRows = clusters[cluster];

  return (
    <ClusterContainer campus="Malaga" cluster={cluster}>
      {({ locations, showPopup }) => (
        <ClusterTableMap>
          {Object.keys(clusterRows).map((row) => (
            <ClusterRow key={`cluster-row-${row}`} displayText={row}>
              {clusterRows[row].map((workspace, i) => {
                const key = `cluster-workspace-${row}-${workspace}-${i}`;

                if (workspace === null) return <ClusterEmpty key={key} />;
                if (workspace === 'pillar') return <ClusterPillar key={key} />;

                const identifier = `${cluster}${row}s${workspace}`;
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
