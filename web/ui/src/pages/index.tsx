import { Flag, MeWithFlagsDocument, MeWithFlagsQuery } from '@graphql.d';
import { queryAuthenticatedSSR } from '@lib/apollo';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Stud42 UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await queryAuthenticatedSSR<MeWithFlagsQuery>(req, {
    query: MeWithFlagsDocument,
  });

  const { flags = [] } = data?.me || {};
  if (flags?.includes(Flag.STAFF) || flags?.includes(Flag.BETA)) {
    return {
      redirect: {
        destination: '/clusters',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/beta',
      permanent: false,
    },
    props: {},
  };
};

export default Home;
