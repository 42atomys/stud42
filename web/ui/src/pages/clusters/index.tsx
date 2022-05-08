import type { GetServerSideProps, NextPage } from 'next';

type PageProps = {};

const Home: NextPage<PageProps> = () => <></>;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/clusters/paris/e1',
      permanent: false,
    },
    props: {},
  };
};

export default Home;
