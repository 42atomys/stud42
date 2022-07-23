import type { GetServerSideProps, NextPage } from 'next';

type PageProps = {};

const Home: NextPage<PageProps> = () => <></>;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { campus: campusQuery, identifier: identifierQuery } = query;
  const campus = campusQuery?.toString().toLowerCase();
  const identifier = identifierQuery?.toString().toLowerCase();

  if (campus && identifier) {
    const [_, cluster] = identifier.match(identifierValidator[campus]) || [];

    if (Object.keys(identifierValidator).includes(campus) && cluster) {
      return {
        redirect: {
          destination: `/clusters/${campus}/${cluster}?identifier=${identifier}`,
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

const identifierValidator: { [key: string]: RegExp } = {
  paris: /(e(?:1|2|3)).{4,5}/i,
  helsinki: /(c(?:1|2|3)).{4,5}/i,
};
