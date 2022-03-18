import { ComponentWithAuthGuard } from '@components/AuthGuard'
import React from 'react'
import { useSidebar } from '@components/Sidebar'

type PageProps = {
}

const IndexPage: ComponentWithAuthGuard<PageProps> = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar()

  return <SidebarProvider>
    <PageContainer>
      <Sidebar>
        <a>Sidebar</a>
      </Sidebar>
      <PageContent className='p-2 flex-1'>
        <h1>Clusters</h1>
      </PageContent>
    </PageContainer>
  </SidebarProvider>
}

export const getStaticProps = () => ({
  props: {},
})

IndexPage.auth = {
  loading: <></>,
  required: false
}

export default IndexPage
