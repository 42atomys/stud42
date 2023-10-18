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
import {
  CampusIdentifier,
  Campuses,
  findCampusPerSafeLink,
} from '@lib/clustersMap';
import '@lib/prototypes/string';
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from 'next';
import Error from 'next/error';
import Head from 'next/head';

type PageProps = {
  campusIdentifier: CampusIdentifier;
  clusterIdentifier: string;
};

export const IndexPage: NextPage<PageProps> = ({
  campusIdentifier,
  clusterIdentifier,
}) => {
  const campus = findCampusPerSafeLink(campusIdentifier);
  const cluster = campus?.cluster(clusterIdentifier);

  if (!campus || !cluster) return <Error statusCode={404} />;

  return (
    <>
      <Head>
        <title>
          {cluster.hasName()
            ? cluster.name()
            : cluster.identifier().toUpperCase()}{' '}
          @ {campus.name().toTitleCase()} - Clusters - S42
        </title>
      </Head>
      <ClusterContainer campus={campus} cluster={cluster}>
        {({ locations, showPopup }) => (
          <ClusterTableMap>
            {cluster.map().map((row, i) => (
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
                        displayText={campus.extractor(identifier).workspace}
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
                          ? campus.extractor(identifier).workspace
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
          campusSlug: campus.identifier().toSafeLink(),
          clusterSlug: cluster.identifier(),
        },
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = ({ params = {} }) => {
  const { campusSlug, clusterSlug } = params;

  const campus = findCampusPerSafeLink(campusSlug as string);
  const cluster = campus?.cluster(clusterSlug as string);

  if (!campus || !cluster) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      campusIdentifier: campus.identifier(),
      clusterIdentifier: cluster.identifier(),
    },
  };
};

export default IndexPage;
