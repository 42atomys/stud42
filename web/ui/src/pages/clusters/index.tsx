import { CampusClusterMapData } from '@components/ClusterMap';
import { MeWithFlagsDocument, MeWithFlagsQuery } from '@graphql.d';
import { queryAuthenticatedSSR } from '@lib/apollo';
import { clusterURL } from '@lib/searchEngine';
import type { GetServerSideProps, NextPage } from 'next';

type PageProps = {};

const Home: NextPage<PageProps> = () => <></>;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { campus, identifier } = query;

  if (campus && identifier) {
    const url = clusterURL(campus.toString(), identifier.toString());

    if (url) {
      return {
        redirect: {
          destination: url,
          permanent: false,
        },
        props: {},
      };
    }
  }

  const { data: { me } = {} } = await queryAuthenticatedSSR<MeWithFlagsQuery>(
    req,
    { query: MeWithFlagsDocument }
  );
  const myCampusNameLowerFromAPI = me?.currentCampus?.name?.toLowerCase() || '';

  if (Object.keys(CampusClusterMapData).includes(myCampusNameLowerFromAPI)) {
    return {
      redirect: {
        destination: `/clusters/${me?.currentCampus?.name.toLowerCase()}/e1`,
        permanent: false,
      },
      props: {},
    };
  }

  return {
    redirect: {
      destination: `/clusters/paris/e1`,
      permanent: false,
    },
    props: {},
  };
};

export default Home;
