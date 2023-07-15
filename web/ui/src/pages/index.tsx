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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/clusters',
      permanent: true,
    },
  };
};

export default Home;
