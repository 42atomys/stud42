import { GetServerSideProps, NextPage } from 'next';

const NullPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/friends/all',
      permanent: false,
    },
    props: {},
  };
};

export default NullPage;
