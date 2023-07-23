import { useSidebar } from '@components/Sidebar';
import Soon from '@components/Soon';

type PageProps = {};

const IndexPage: PageProps = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();

  return (
    <SidebarProvider>
      <PageContainer>
        <Sidebar></Sidebar>
        <PageContent className="flex-1 flex h-100vh justify-center items-center">
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
