import {
  ClusterContainerProps,
  ClusterEmpty,
  ClusterPersonalWorkspace,
  ClusterPillar,
  ClusterRow,
  ClusterTableMap,
  ClusterWorkspace,
  ClusterWorkspaceWithUser,
  extractNode,
} from '@components/ClusterMap';
import { ClusterContainer } from '@components/ClusterMap/ClusterContainer';
import { CampusNames, Campuses } from '@lib/clustersMap';
import '@lib/prototypes/string';
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from 'next';
import Error from 'next/error';
import Head from 'next/head';

export const IndexPage: NextPage<
  ClusterContainerProps & { campusName: CampusNames }
> = ({ campusName = 'vienna', cluster }) => {
  const campusData = Campuses[campusName];
  const clusterData = campusData?.cluster(cluster);

  if (!campusData || !clusterData) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>
          {cluster.toUpperCase()} @ {campusData.name().toTitleCase()} - Clusters
          - S42
        </title>
      </Head>
      <ClusterContainer campus={campusData.name()} cluster={cluster}>
        {({ locations, showPopup }) => (
          <ClusterTableMap>
            {clusterData.map().map((row, i) => (
              <ClusterRow key={`cluster-row-${i}`}>
                {row.map((entity, j) => {
                  const key = `cluster-workspace-${i}-${entity}-${j}`;

                  if (entity === null) return <ClusterEmpty key={key} />;
                  if (entity === 'P') return <ClusterPillar key={key} />;
                  if (entity.startsWith('PW')) {
                    return (
                      <ClusterPersonalWorkspace
                        key={key}
                        displayText={entity.slice(3)}
                      />
                    );
                  }
                  if (entity.startsWith('T:')) {
                    return (
                      <ClusterEmpty key={key} displayText={entity.slice(2)} />
                    );
                  }

                  const identifier = entity.slice(2);
                  const loc = extractNode(locations, identifier);

                  if (loc) {
                    return (
                      <ClusterWorkspaceWithUser
                        key={key}
                        identifier={identifier}
                        displayText={campusData.extractor(identifier).workspace}
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
                      displayText={campusData.extractor(identifier).workspace}
                    />
                  );
                })}
              </ClusterRow>
            ))}
          </ClusterTableMap>
        )}
      </ClusterContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [] as GetStaticPathsResult['paths'];

  Object.keys(Campuses).map((campusName) => {
    const campus = Campuses[campusName as CampusNames];

    campus.clusters().map((cluster) => {
      paths.push({
        params: { campusName: campusName, cluster: cluster.identifier() },
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params = {} }) => {
  const { campusName, cluster } = params;

  return {
    props: {
      campusName,
      cluster,
    },
  };
};

export default IndexPage;
