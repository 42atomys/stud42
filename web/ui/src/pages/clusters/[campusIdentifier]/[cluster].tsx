import {
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
import { CampusIdentifier, Campuses } from '@lib/clustersMap';
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
  ClusterContainerProps & { campusIdentifier: CampusIdentifier }
> = ({ campusIdentifier, cluster }) => {
  const campusData = Campuses[campusIdentifier];
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
      <ClusterContainer campus={campusData.identifier()} cluster={cluster}>
        {({ locations, showPopup }) => (
          <ClusterTableMap>
            {clusterData.map().map((row, i) => (
              <ClusterRow key={`cluster-row-${i}`}>
                {row.map((entity, j) => {
                  const key = `cluster-workspace-${i}-${entity}-${j}`;

                  if (entity === null) return <ClusterEmpty key={key} />;
                  if (entity === 'P') return <ClusterPillar key={key} />;
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
                      displayText={
                        entity.startsWith('W:')
                          ? campusData.extractor(identifier).workspace
                          : undefined
                      }
                      kind={
                        entity.startsWith('PW')
                          ? 'PERSONAL_WORKSPACE'
                          : 'WORKSPACE'
                      }
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

  Object.keys(Campuses).map((key) => {
    const campus = Campuses[key as CampusIdentifier];

    campus.clusters().map((cluster) => {
      paths.push({
        params: {
          campusIdentifier: campus.link(),
          cluster: cluster.identifier(),
        },
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = ({ params = {} }) => {
  const { campusIdentifier, cluster } = params;

  const campus = Object.values(Campuses).find(
    (v) => v.name().toSafeLink() === campusIdentifier,
  );

  if (!campus) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      campusIdentifier: campus?.identifier(),
      cluster,
    },
  };
};

export default IndexPage;
