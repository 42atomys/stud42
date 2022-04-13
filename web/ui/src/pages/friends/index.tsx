import React from 'react';
import { useSidebar } from '@components/Sidebar';
import { useSession } from 'next-auth/react';
import { NextPage } from 'next';

type PageProps = {};

const IndexPage: NextPage<PageProps> = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();
  const { data: session } = useSession();

  return (
    <SidebarProvider>
      <PageContainer>
        <Sidebar>
          <a>Sidebar</a>
        </Sidebar>
        <PageContent className="p-2 flex-1">
          <h1>Friends Page</h1>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

export default IndexPage;
