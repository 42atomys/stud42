import { PageContainer, PageContent, Sidebar } from './Sidebar';
import { SidebarProvider } from './SidebarProvider';

/**
 * useSidebar hook. This is used to give all context to use the sidebar
 * component correctly.
 */
export const useSidebar = () => {
  return {
    SidebarProvider,
    Sidebar,
    PageContent,
    PageContainer,
  };
};

export default useSidebar;
