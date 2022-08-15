import {
  CampusClusterMapData,
  ClusterContainerProps,
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

export const IndexPage: NextPage<
  ClusterContainerProps & { campus: 'paris' }
> = ({ cluster }) => {
  const clusterRows = CampusClusterMapData.paris[cluster];

  return (
    <ClusterContainer campus="paris" cluster={cluster}>
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
      { params: { cluster: 'e1' } },
      { params: { cluster: 'e2' } },
      { params: { cluster: 'e3' } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params = {} }) => {
  const { cluster } = params;

  if (!cluster || ['e1', 'e2', 'e3'].includes(cluster as string) === false) {
    return { notFound: true };
  }

  return {
    props: {
      cluster,
    },
  };
};

export default IndexPage;
