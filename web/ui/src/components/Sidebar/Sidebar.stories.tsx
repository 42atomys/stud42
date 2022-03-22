import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useSidebar } from './hooks';

const Demo = () => {
  const { SidebarProvider, Sidebar, PageContainer, PageContent } = useSidebar();

  return (
    <SidebarProvider>
      <PageContainer>
        <Sidebar />
        <PageContent className="p-2 flex-1">
          <h1>Page</h1>
        </PageContent>
      </PageContainer>
    </SidebarProvider>
  );
};

const meta: Meta = {
  title: 'Hooks/useSidebar',
  component: Demo,
  parameters: {
    nextRouter: {
      path: '/feed',
      asPath: '/feed',
    },
  },
};

export default meta;

const Template: Story = (args) => <Demo {...args} />;
export const Default = Template.bind({});
Default.args = {};
