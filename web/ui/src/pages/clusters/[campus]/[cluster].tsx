import React from 'react';
import { useSidebar } from '@components/Sidebar';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { ClusterSidebar } from '@containers/clusters/ClusterSidebar';

type PageProps = {};

export const IndexPage: NextPage<PageProps> = () => {
  const { SidebarProvider, PageContainer, PageContent } = useSidebar();

  return (
    <SidebarProvider>
      <PageContainer>
        <ClusterSidebar />
        <PageContent className="p-2 flex-1">
          <h1>{JSON.stringify(useRouter().query)}</h1>
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { campus: 'paris', cluster: 'e1' } }],
    fallback: false,
  };
};

export const getStaticProps = () => ({
  props: {},
});

export default IndexPage;
