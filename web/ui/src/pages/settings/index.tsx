import type { GetServerSideProps, NextPage } from 'next';

type PageProps = {};

const Home: NextPage<PageProps> = () => <></>;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { category } = query;

  return {
    redirect: {
      destination: `/settings/${category || 'apparence'}`,
      permanent: false,
    },
    props: {},
  };
};

export default Home;
