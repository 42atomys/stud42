import { clusterURL } from '@lib/searchEngine';
import type { GetServerSideProps, NextPage } from 'next';

type PageProps = {};

const Home: NextPage<PageProps> = () => <></>;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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

  return {
    redirect: {
      destination: '/clusters/paris/e1',
      permanent: false,
    },
    props: {},
  };
};

export default Home;
