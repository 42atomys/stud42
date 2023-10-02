import { useSidebar } from '@components/Sidebar';
import Soon from '@components/Soon';
import Head from 'next/head';

type PageProps = {};

const IndexPage: PageProps = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();

  return (
    <SidebarProvider>
      <PageContainer>
        <Sidebar></Sidebar>
        <PageContent className="flex-1 flex h-100vh justify-center items-center">
          <Head>
            <title>Statistics - S42</title>
          </Head>
          <Soon />
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

export const getStaticProps = () => ({
  props: {},
});

export default IndexPage;
